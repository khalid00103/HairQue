import React, {useState, useRef, useEffect, useCallback} from 'react';
//import { StatusBar } from 'expo-status-bar';
import {Animated, StyleSheet, Text, View, Image,TextInput, FlatList, TouchableOpacity, StatusBar, Pressable, useColorScheme,  ToastAndroid, Platform,Button} from 'react-native';
import { useFonts } from "expo-font";
import colors from '../../assets/colors/colors.js';
import {Feather, Entypo, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
//import Entypo from 'react-native-vector-icons/Entypo';
//import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAuth } from '../Authentication/AuthContext';
import { getAuth} from "firebase/auth";
import { getDatabase, ref, get,onValue, set} from 'firebase/database';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import{
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
}from "react-native-responsive-dimensions";
//import Mask from "../../Mask.js";
//import { Camera, CameraType } from 'expo-camera';
//import * as FaceDetector from 'expo-face-detector';
import Booking from './Booking';
import Portfolio from './Portfolio.js';
import Review from './Review.js';
import { useGlobalState } from '../GlobalState';
export default  ShopDetails = ({route})=>{
    
    const {item, option} = route.params;
    //console.log(item);
    const { likedItems, toggleLikeStatus } = useGlobalState();
    const isLiked = likedItems.includes(item.storeId);

    const [fontsLoaded]= useFonts({
        'Oswald-Medium' : require('../../assets/fonts/Oswald-Medium.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'NotoSerif-Regular' : require('../../assets/fonts/NotoSerif-Regular.ttf'),
        'Inconsolata-Regular':require('../../assets/fonts/Inconsolata-Regular.ttf'),
        'Inconsolata-Bold':require('../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-ExtraBold':require('../../assets/fonts/Inconsolata-ExtraBold.ttf'),
        'Inconsolata-Medium':require('../../assets/fonts/Inconsolata-Medium.ttf'),
    });
    
    // comt: for heart
    const [liked, setLiked] = useState(false);
    const { user } = useAuth();
    useEffect(() => {
        // Fetch liked status of this store from the user's data when the component mounts
        //const userId = 'user123'; // Replace with the actual user ID
        const db = getDatabase();
        const likedStoresRef = ref(db, `users/${user.phoneNumber}/likedStores`);
    
        get(likedStoresRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const likedStoresData = snapshot.val();
              // Check if the current store is liked
              const isLiked = likedStoresData.includes(item.storeId);
              setLiked(isLiked);
            }
          })
          .catch((error) => {
            console.error('Error fetching liked stores:', error);
          });
    
        // Your existing code for this component goes here
    
      }, []); // Only run this effect once when the component mounts
    
    const handleLikePress = (storeId) => {
        toggleLikeStatus(storeId); // Call the toggleLikeStatus function
    };
    // comt: for side Animation for options {bookin, Portfolio, Reviews}
    const slideAnim = useRef(new Animated.Value(300)).current;

    // comt: Animation function for options 
    const startAnimation = () => {
        slideAnim.setValue(300);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
    };

    // comt: Animation function for options used for initial opening animation
    useEffect(() => {
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    
    // comt: button items for map for options
    const Buttons= [
        {id:0, name:'Booking'},
        {id:1, name:'Portfolio'},
        {id:2, name:'Reviews'},
    ];
    
    // comt: set variable for option button selected
    const [selectedButton, setSelectedButton] = useState(option);
    
    // comt: function to handle option button press
    const handleButtonPress = (buttonId,button) =>{
        console.log(button);
        setSelectedButton(buttonId);
        startAnimation();
    }
    
    // comt: funtion to switch to option button text white to black after press
    const getButtonTextStyle = (buttonId) => {
        if (selectedButton === buttonId) {
          return styles.bookingTextSelected;
        } else {
          return styles.bookingText;
        }
    };
    // comt: declare navigation function to use navigation
    const navigation = useNavigation();

    // comt: go to home page after pressing left arrow
    const handleBackPress = () => {
        navigation.goBack();
    };

    const mapRatingToTag = (rating) => {
        if (rating >= 4.5) {
            return { tag: "Prime", color:"rgba(0, 150, 255, 0.8)" }; // blue in prime
          } else if (rating >= 4.0) {
            return { tag: "Top-notch", color: "rgba(10, 240, 80, 0.8)" }; // green
          } else if (rating >= 3.5) {
            return { tag: "Excellent", color: "rgba(255, 255, 0, 0.8)" }; // Yellow
          } else if (rating >= 3.0) {
            return { tag: "Good", color: "rgba(255, 165, 0, 0.8)" }; // Orange
          } else if (rating >= 2.5) {
            return { tag: "Ok", color: "rgba(128, 0, 128, 0.8)" }; // Purple
          } else {
            return { tag: "Bad", color: "rgba(255, 0, 0, 0.8)" }; // Red
          }
      };
      const { tag, color } = mapRatingToTag(item.rating);
    
    //this.state = {
        //hasCameraPermission: null,
    //    faces: [],
    //}
    //const [type, setType] = useState(CameraType.front);
    //const [permission, requestPermission] = Camera.useCameraPermissions();
    //const [faces, setFaces] = useState([]);
//    const onFacesDetected = ({ faces }) => {
        
  //    };
    
    return(
        <SafeAreaView>
        <View style={styles.container}>
                {/* shop image, left arrow, shop name and rating with heart*/}
                <View style={styles.shopdetailWrapper}>
                    {/*shop image and left arrow*/}
                    <View style={styles.shopdetailimage}>
                        <Image
                            source={{ uri: item.profilePictureUri }}
                            style = {styles.shopdetailimage}
                        />
                        {/*left arrow*/}
                        <View style={styles.iconWrapper}>
                            <TouchableOpacity onPress={handleBackPress}>
                                <Feather name = "arrow-left" size = {responsiveWidth(6.5)} color={colors.textwhite}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/*shop name rating and heart*/}
                    <View style={styles.detailshop}>
                        <View style={styles.shopNameHeart}>
                            <Text style={styles.detailShopName}>{item.storeName}</Text>
                            <Pressable onPress={() => handleLikePress(item.storeId)}>
                                <MaterialCommunityIcons
                                    name = {isLiked ? "heart" : "heart-outline"}
                                    size = {responsiveWidth(6)}
                                    color = {isLiked ? "red": "white"}
                                />
                            </Pressable>
                        </View>
                        <View style={styles.detailrating}>
                            <FontAwesome
                                name = "star-half-full" size ={responsiveWidth(3.5)} color = {colors.textlightgold}/>
                         
                            <Text style={styles.rating }marginLeft={5}>{item.rating}</Text>
                            <Text style={styles.ratedcustomer} marginLeft={5}>({item.customerReview})</Text>
                            <Text style={[styles.customerreview, { marginLeft: 5, color: color }]}>{tag}</Text>
                        </View>
                    </View>

                </View>

            {/* option buttons and option changes screen*/}    
            <View style={styles.blackcontainer}>
                {/*option button mapping*/}
                <View style={styles.options}>
                    {Buttons.map((btn) => (
                        <TouchableOpacity
                            key = {btn.id}
                            style={selectedButton===btn.id?styles.OptionSelected:styles.Optionsetting}
                            onPress={() =>handleButtonPress(btn.id,btn)}
                            >
                            <Text style={getButtonTextStyle(btn.id)}>{btn.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                
                {/*condition for option button selected to change screen*/} 
                {selectedButton === 0 ? <Animated.View style={[styles.optionChangestoBooking, , { transform: [{ translateX: slideAnim }] }]}><Booking shop={item} navigation={navigation}/></Animated.View>: 
                selectedButton === 1 ? <Animated.View style={[styles.optionChangestoBooking, , { transform: [{ translateX: slideAnim }] }]}><Portfolio shop={item}/></Animated.View> :<Animated.View style={[styles.optionChangestoBooking, , { transform: [{ translateX: slideAnim }] }]}><Review/></Animated.View>
                }

                
            {/* black container ends*/}      
            </View>

        {/* main screen container ends*/}     
        </View>
        </SafeAreaView>
         
    );
};

const styles = StyleSheet.create({
    container:{
        //flex : 1,
        height:'100%',
        width:'100%',
        justifyContent:'space-between',
        backgroundColor:colors.textblack,
        //flexWrap:'wrap',
    },
    shopdetailWrapper:{
        //width:'100%',
        width:responsiveWidth(100),
        //height:'32.5%',
        height:responsiveHeight(31.5),
        justifyContent:'flex-end',    
    },
    shopdetailimage:{
        width:'100%',
        //width:responsiveWidth(100),
        height:'100%',
    },
    iconWrapper:{
        flexDirection: 'row',
        position: 'absolute',
        //margin:25,
        margin:responsiveWidth(5.5),
        width:responsiveWidth(8),
        height:responsiveHeight(4),
        backgroundColor:'rgba(9,9,9,0.5)',
        borderRadius:responsiveWidth(50),
        justifyContent:'center',
        alignItems: 'center',
    },
    detailshop:{
        flexDirection:'column',
        position:'absolute',
        //paddingHorizontal:20,
        paddingHorizontal:responsiveWidth(4.68),
        width:'100%',
        //height:80,
        height:responsiveHeight(9.8),
        backgroundColor:'rgba(9,9,9,0.5)',
        //borderRadius:20,
        //borderRadius:responsiveWidth(3.5),
        borderTopLeftRadius:responsiveWidth(3.5),
        borderTopRightRadius:responsiveWidth(3.5),
    },
    shopNameHeart:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    detailShopName:{
        fontFamily:'Inconsolata-Regular',
        color:colors.textwhite,
        //fontSize:28,
        fontSize:responsiveFontSize(3.1),
    },
    detailrating:{
        position: 'absolute',
        flexDirection:'row',
        //top:40,
        top:responsiveWidth(9.3),
        //width:395,
        //marginHorizontal:20,
        marginHorizontal:responsiveWidth(4.68),
        alignItems: 'center',
    },
    rating:{
        color:colors.textwhite,
        fontSize:responsiveFontSize(1.6),
    },
    ratedcustomer:{
        color:colors.textwhite,
        fontSize:responsiveFontSize(1.6),
    },
    customerreview:{
        fontFamily:'Inconsolata-Bold',
        //fontSize:20,
        fontSize:responsiveFontSize(2.2),
        color:colors.textdarkgold,
    },
    blackcontainer:{
        //top:-10,
        marginTop:responsiveWidth(-3.15),
        width:'100%',
        //position:'absolute',
        //height:'100%',
        height:responsiveHeight(69.65),
        justifyContent:'space-between',
        //borderRadius:20,
        //borderRadius:responsiveWidth(4.5),
        borderTopLeftRadius:responsiveWidth(4.5),
        borderTopRightRadius:responsiveWidth(4.5),
        backgroundColor:colors.textblack,
    },
    options:{
        flexDirection:'row',
        justifyContent:'space-between',
        //marginTop:30,
        marginVertical:responsiveWidth(6),
        //marginHorizontal:20,
        marginHorizontal:responsiveWidth(4.68),
    },
    Optionsetting:{
        backgroundColor:colors.cardbackground,
        borderColor:colors.border,
        //borderWidth:1,
        borderWidth:responsiveWidth(0.25),
        //width:115,
        width:responsiveWidth(27),
        //height:35,
        height:responsiveHeight(4.7),
        //borderRadius:10,
        borderRadius:responsiveWidth(2.4),
        justifyContent:'center',
        alignItems: 'center',
    },
    bookingText:{
        fontFamily:'Inconsolata-Medium',
        //fontSize:16,
        fontSize:responsiveFontSize(2),
        color:colors.textwhite,
    },
    bookingTextSelected:{
        fontFamily:'Inconsolata-Medium',
        //fontSize:16,
        fontSize:responsiveFontSize(2),
        color:colors.textblack,
    },
    OptionSelected:{
        backgroundColor:colors.textwhite,
        borderColor:colors.border,
        //borderWidth:1,
        borderWidth:responsiveWidth(0.25),
        //width:115,
        width:responsiveWidth(27),
        //height:35,
        height:responsiveHeight(4.7),
        //borderRadius:10,
        borderRadius:responsiveWidth(2.4),
        justifyContent:'center',
        alignItems: 'center',
    },
    optionChangestoBooking:{
        //height:'55%',
        height:responsiveHeight(58.90),
        //flexDirection:'column',
        justifyContent:'space-between',
        //flexWrap:'wrap',
        paddingTop:responsiveHeight(2.45),
        backgroundColor:colors.cardbackground,
        //borderRadius:15,
        //borderRadius:responsiveWidth(3.5),       
        borderTopLeftRadius:responsiveWidth(3.5),
        borderTopRightRadius:responsiveWidth(3.5),
    },
});