import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../../assets/colors/colors';
import LottieView from 'lottie-react-native';
import NotFoundAnimation from './NotFoundAnimation';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { useAuth } from '../Authentication/AuthContext';
//import firebase from 'firebase'; // Import Firebase
//import { AuthContext } from './AuthProvider'; // Import your AuthContext
import { getDatabase, ref, get, remove } from 'firebase/database';
import moment from 'moment'; // Import moment library

const BookedScreen = ({ firstItem, setFirstItem,data}) => {
  const { user } = useAuth();
  const onCancel = () => {
    if (firstItem) {
      // Get a reference to the Firebase Realtime Database
      const dataId = data.length;
      const db = getDatabase();
      console.log(dataId);
      // Construct a reference to the user's bookings
      const userBookingsRef = ref(db, `bookings/${user.phoneNumber}/${dataId}`);

      // Remove the firstItem from the user's bookings
      remove(userBookingsRef)
        .then(() => {
          console.log('Booking canceled successfully.');
          setFirstItem(null);          
        })
        .catch((error) => {
          console.error('Error canceling booking:', error);
        });
    }
  };
  if (firstItem === null) {
    //firstItem = null;
    return <NotFoundAnimation />;
  }
  //console.log(data.length);
  return (
    <View style={styles.Bookedcontainer}>
      {/* Display firstItem data here */}
      <View style={styles.BookBox}>
        <Text style={styles.text}>Store : {firstItem.storeName}</Text>
        <Text style={styles.text}>Date  : {firstItem.date}</Text>
        <Text style={styles.text}>Time : {firstItem.time}</Text>
        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
          <Text style={[styles.text, {color:colors.textwhite, fontSize:responsiveFontSize(2.45)}]}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Text style={[{color:'gray'}, {marginTop:responsiveHeight(2)},{fontSize:responsiveFontSize(1.65)}, {width:responsiveWidth(90)}]}>Please Note* you can only book one appointment in a week, to change or reschedule an appointment you can cancel the booking and then you are able to book a new appointment</Text>
    </View>
  );
};

const HistoryScreen = ({ remainingItems}) => {
  if(remainingItems.length === 0) {
    return <NotFoundAnimation/>;
  }
  return (
    <View style={styles.Historycontainer}>
      {/* Display remainingItems data here */}
      <FlatList
        style={[{marginTop:responsiveHeight(2)}]}
        data={remainingItems}
        keyExtractor={(item, index) => index.toString()} // You can use a better key if available
        renderItem={({ item }) => (
          <View style={styles.HistoryBox}>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2) }]}>Store : {item.storeName}</Text>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2) }]}>Date  : {item.date}</Text>
            <Text style={[styles.text, { fontSize: responsiveFontSize(2) }]}>Time : {item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

const initialLayout = { width: 300, height: 100 };

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.textwhite }}
    style={{ backgroundColor: colors.textblack }}
  />
);

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'booked', title: 'Booked' },
    { key: 'history', title: 'History' },
  ]);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [firstItem, setFirstItem] = useState(null);
  const { user } = useAuth();
  const [remainingItems, setRemainingItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const moment = require('moment');
        const bookedRef = ref(db, `bookings/${user.phoneNumber}`);
        const snapshot = await get(bookedRef);
        if (snapshot.exists()) {
          const dataObj = snapshot.val();
          const reversedData = Object.keys(dataObj).reverse().map((key) => dataObj[key]);
          setData(reversedData);
          setRemainingItems(data.slice(startIndex));
          setLoading(false);
          // Check if the first item's date and time have not passed
          const currentDate = moment().format('YYYY-MM-DD');
          const currentTime = moment().format('HH:mm');

          const parsedDate = moment(reversedData[0].date, 'MMMM Do YYYY');
          const isoDateStr = parsedDate.format('YYYY-MM-DD');

          function SameOrAfterDate(date1, date2) {
            return moment(date1).isSameOrAfter(date2); 
          }
          function SameOrAfterTime(time1, time2) {
            return moment(time1, 'HH:mm').isSameOrAfter(moment(time2, 'HH:mm'));
          }
          const dateIsAhead = SameOrAfterDate(isoDateStr, currentDate);
          const timeIsAhead = SameOrAfterTime(reversedData[0].time, currentTime);
          if ( dateIsAhead ) {
            // The first item's date and time are in the future or the same as the current date and time
            if((moment(isoDateStr).isSame(currentDate) && !timeIsAhead)){
              //console.log(moment(isoDateStr).isSame(currentDate));
              setStartIndex(0);
              return;
            }
            setFirstItem(reversedData[0]);  
          }
          else{
            setStartIndex(0);
            return;
          }   
          //console.log(reversedData[0]);
          setStartIndex(1);
          //console.log(startIndex);
          //setRemainingItems(data.slice(1));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      //setRemainingItems(data.slice(startindex));
    };
    fetchData();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    //console.log("data: ",data);
    //setRemainingItems(data.slice(startindex));
  }, []);
  useEffect(() => {
    //console.log("daataa:", data);
    //console.log(startIndex);
    //console.log('Remaining Items:', remainingItems);
  }, [remainingItems]);

  useEffect(() => {
    setRemainingItems(data.slice(startIndex));
  }, [data, startIndex]);

  const renderScene = SceneMap({
    booked: () => {
      if (loading) {
        return <ActivityIndicator size="large"/>;
      }
      return <BookedScreen firstItem={firstItem} setFirstItem={setFirstItem} data={data} />;
    },
    history: () => {
      if (loading) {
        return <ActivityIndicator size="large"/>;
      }
      return <HistoryScreen remainingItems={remainingItems} />;
    },
  });
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={responsiveWidth(6.5)} color={colors.textwhite} />
        </TouchableOpacity>
      </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.textblack,
  },
  iconWrapper: {
    margin: responsiveWidth(3.5),
    marginTop: responsiveWidth(8.5),
    width: responsiveWidth(8),
    height: responsiveHeight(4),
    backgroundColor: 'rgba(9,9,9,0.5)',
    borderRadius: responsiveWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  Bookedcontainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:colors.textblack,
  },
  BookBox:{
    height:"30%",
    width:"90%",
    justifyContent:'space-between',
    marginTop:responsiveHeight(2),
    padding:responsiveHeight(2),
    //marginHorizontal:responsiveWidth(0),
    backgroundColor:colors.calenderbackground,
    borderRadius:responsiveWidth(3),
  },
  text: {
    color: colors.textblack,
    fontSize: responsiveFontSize(2.2),
  },
  cancelBtn:{
    height:"25%",
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.cardbackground,
    borderRadius:responsiveWidth(3),
  },
  Historycontainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:colors.textblack,
  },
  HistoryBox:{
    height:responsiveHeight(12),
    width:responsiveWidth(90),
    justifyContent:'space-evenly',
    marginBottom:responsiveHeight(2),
    paddingHorizontal:responsiveHeight(2),
    //marginHorizontal:responsiveWidth(0),
    backgroundColor:colors.calenderbackground,
    borderRadius:responsiveWidth(3),
  },
});

export default NotificationScreen;
