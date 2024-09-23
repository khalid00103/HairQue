import React, {useState, useEffect,useRef} from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useFonts } from "expo-font";
import colors from '../../assets/colors/colors.js';
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import { useAuth } from '../Authentication/AuthContext';
import { getAuth} from "firebase/auth";
import { getDatabase, ref, get,onValue, set} from 'firebase/database';
import { SafeAreaView } from "react-native-safe-area-context";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { useGlobalState } from '../Important_files/GlobalState';
import styles from './styles/storeListStyles';
function useInterval(callback, delay) {
  const savedCallback = useRef();
  
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const StoreList = ({ navigation, searchText}) => {
  const { likedItems, toggleLikeStatus} = useGlobalState();
  const [storeData, setStoreData] = useState([]);
  //const [isMounted, setIsMounted] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    // Fetch your store data from the database and update storeData state
    const db = getDatabase();
    const dbRef = ref(db, 'stores');
    
    const handleData = (snapshot) => {
      const data = snapshot.val();
      const storeArray = Object.entries(data).map(([storeId, store]) => ({
        storeId,
        ...store,
        status: calculateStoreStatus(store.timings),
      }));
      setStoreData(storeArray);
      //console.log(storeData);
    };
    
    const dbRefListener = onValue(dbRef, handleData);
    
    return () => {
      // Cleanup by removing the listener when component unmounts
      //off(dbRef, 'value', dbRefListener);
    };
  }, []);
  
  const calculateStoreStatus = (timings) => {
    const [openTimeStr, closeTimeStr] = timings.split('-');
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
          
    const [openHours, openMinutes] = openTimeStr.split(':').map(Number);
    const [closeHours, closeMinutes] = closeTimeStr.split(':').map(Number);
          
    if (
      (currentHours > openHours || (currentHours === openHours && currentMinutes >= openMinutes)) &&
      (currentHours < closeHours || (currentHours === closeHours && currentMinutes <= closeMinutes))
    ) {
      return 'OPEN NOW';
    } else {
      return 'CLOSED';
    }
  };
          
  const renderStoreItem = ({ item, onPress, liked }) => {
    //console.log('Profile Picture URL:', item.profilePictureUri);
    //console.log('store:',item.storeId);
    const isLiked = likedItems.includes(item.storeId);
    const storeStatusColor = item.status === 'OPEN NOW' ? colors.textdarkgold : 'orangered';
    return(
      <View style={styles.categoryItemWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate('ShopDetails', {item:item, option:1})}>
          <Image source={{ uri: item.profilePictureUri }} style={styles.categoryItemImage} />
        </TouchableOpacity>

        <TouchableOpacity key = {item.id} onPress={() => navigation.navigate('ShopDetails', {item:item, option:2})} style={styles.categoryrating}>
          <FontAwesome name="star-half-full" size ={responsiveWidth(2.75)} color = {colors.textlightgold}/>
          <Text style={styles.rating}>{item.rating}</Text>
          <Text style={styles.rating}>({item.customerReview})</Text>
        </TouchableOpacity>

        <View position= {'absolute'} top={20} right= {20}>
          <TouchableOpacity onPress={() => handleLikePress(item.storeId)}>
            <MaterialCommunityIcons
              name={isLiked ? "heart" : "heart-outline"}
              size={responsiveWidth(6)}
              color={isLiked ? "red" : "white"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.categoryshopStatus}>
          <Text style={[styles.categorystatus, { color: storeStatusColor }]}>{item.status}</Text>
          <Text style={styles.categorytime}>{item.timings}</Text>
        </View>  

        <Text style={styles.categoryItemName}>{item.storeName}</Text>
        <View style = {styles.lineStyle} />

        <TouchableOpacity key = {item.id} onPress={() => navigation.navigate('ShopDetails', {item:item, option:0})}>
          <View style = {styles.categorybookview}>
            <Text style={styles.categorybook}>Book Now</Text>
          </View>
          </TouchableOpacity>

      </View>
    );
  };

  useInterval(() => {
    const updatedStoreData = storeData.map(store => ({
      ...store,
      status: calculateStoreStatus(store.timings),
    }));
    setStoreData(updatedStoreData);
  }, 20000); // Update every minute (adjust the interval as needed)

  // comt: function for heart like after press heart
  useEffect(() => {
    setStoreData((prevStoreData) => {
    // Update the liked status for each store in the local state
      return prevStoreData.map((store) => {
        const isLiked = likedItems.includes(store.storeId);
        return { ...store, isLiked };
      });
    });
  }, [likedItems]);
    
  // Define your handleLikePress function  
  const handleLikePress = (storeId) => {
    //console.log(storeId);
    toggleLikeStatus(storeId);
  };
            
  const [fontsLoaded]= useFonts({
    'Oswald-Medium' : require('../../assets/fonts/Oswald-Medium.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'NotoSerif-Regular' : require('../../assets/fonts/NotoSerif-Regular.ttf'),
    'Inconsolata-Regular':require('../../assets/fonts/Inconsolata-Regular.ttf'),
    'Inconsolata-Bold':require('../../assets/fonts/Inconsolata-Bold.ttf'),
    'Inconsolata-ExtraBold':require('../../assets/fonts/Inconsolata-ExtraBold.ttf'),
    'Inconsolata-Medium':require('../../assets/fonts/Inconsolata-Medium.ttf'),
  }); 

  if(!fontsLoaded){
    return null
  }

  const filteredStoreData = storeData.filter((store) => {
    if (store && store.storeName) {
      const storeName = store.storeName.toLowerCase();
      const searchTextLower = searchText.toLowerCase();
      return searchTextLower === '' || storeName.includes(searchTextLower);
    }
    return false; // Ignore undefined stores or store names
  });
      
  //console.log(filteredStoreData);

  return (
    <SafeAreaView>
      <View style={styles.nearbylistwrapper}>
        <FlatList  
          data={filteredStoreData}
          renderItem={renderStoreItem}
          keyExtractor={(item) => item.storeName}
          horizontal={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default StoreList;