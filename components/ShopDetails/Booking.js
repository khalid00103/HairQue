import React, {useState, useRef, useEffect, useCallback} from 'react';
import {Animated, StyleSheet, Text, View, Image,TextInput, FlatList, TouchableOpacity, StatusBar, Pressable, useColorScheme,  ToastAndroid, Platform, ActivityIndicator} from 'react-native';
import { useFonts } from "expo-font";
import colors from '../../assets/colors/colors.js';
import {Entypo} from '@expo/vector-icons';
//import DatesData from "../../assets/data/DatesData.js";
import TimeData from "../../assets/data/TimeData.js";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import{
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
}from "react-native-responsive-dimensions";
import { useAuth } from '../Authentication/AuthContext';
import { getAuth} from "firebase/auth";
import { getDatabase, ref, get, set} from 'firebase/database';
import Modal from 'react-native-modal';
import {Snackbar } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import { encodeEmail } from '../../utils/encodeEmail';

// comt: Date and Day box render for list
const DateItem = ({item, onDatePress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onDatePress} style={[styles.Datelist, {backgroundColor}]}>
      <Text style={[styles.date, {color: textColor}]}>{item.date}</Text>
      <Text style={[styles.day, {color: textColor}]}>{item.day}</Text>
    </TouchableOpacity>
    
);

// comt: Time box render for list
const TimeItem = ({ item, onTimePress, backgroundColor, textColor, disabled }) => (
    <TouchableOpacity
      onPress={() => {
        if (!disabled) {
          onTimePress(); // Only call onTimePress if the time slot is not disabled
        }
      }}
      style={[styles.Timelist, { backgroundColor }]}
      disabled={disabled}
    >
      <Text style={[styles.time, { color: textColor }]}>{item.time}</Text>
    </TouchableOpacity>
  );

const Booking =({shop, navigation}) =>{
    //console.log(shop.storeId);
    const [fontsLoaded]= useFonts({
        'Oswald-Medium' : require('../../assets/fonts/Oswald-Medium.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'NotoSerif-Regular' : require('../../assets/fonts/NotoSerif-Regular.ttf'),
        'Inconsolata-Regular':require('../../assets/fonts/Inconsolata-Regular.ttf'),
        'Inconsolata-Bold':require('../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-ExtraBold':require('../../assets/fonts/Inconsolata-ExtraBold.ttf'),
        'Inconsolata-Medium':require('../../assets/fonts/Inconsolata-Medium.ttf'),
        //'Entopy': require('react-native-vector-icons/Entopy.ttf'),
    });    

    // comt: set variable for date selected from list  
    const [selectedDateId, setSelectedDateId] = useState();
     // comt: set variable for time selected from list
     const [selectedTimeId, setSelectedTimeId] = useState();
     const [currentDate, setCurrentDate] = useState(moment());
 
     useEffect(() => {
        const storeOpeningTime = shop.timings.split('-')[0]; // Opening time as string "9.00"
        const storeClosingTime = shop.timings.split('-')[1]; // Closing time as string "22.00"
      
        // Check if selectedDateId is the current date
        const isCurrentDay = selectedDateId === undefined ? false : getDateItemById(selectedDateId).date === currentDate.format('D');
      
        const currentDayTimeSlots = generateTimeSlots(
          storeOpeningTime,
          storeClosingTime,
          selectedDateId,
          currentDate,
          isCurrentDay // Pass the isCurrentDay flag to generateTimeSlots
        );
      
        setTimeSlots(currentDayTimeSlots);
      }, [shop, selectedDateId, currentDate]);
      
 
     // Generate date data dynamically for the next 7 days
     const generateDatesData = (startDate, days) => {
        const datesData = [];
        for (let i = 0; i < days; i++) {
          const date = startDate.clone().add(i, 'days');
          const dateItem = {
            id: i + 1,
            date: date.format('D'),
            day: date.format('ddd'),
            month: date.format('MMMM'),
          };
          datesData.push(dateItem);
        }
        return datesData;
      };
      
    const datesData = generateDatesData(currentDate, 7);
      
   
     // Update current date every minute
     useEffect(() => {
       const timer = setInterval(() => {
         setCurrentDate(moment());
       }, 2000);
   
       return () => {
         clearInterval(timer);
       };
     }, []);
 
     const [timeSlots, setTimeSlots] = useState([]);
 
 
     const getItemById = (id) => {
         return timeSlots.find((item) => item.id === id);
     };
 
     // comt: function to get Dateitem from selectedId state of list
     const getDateItemById =(id) =>{
         return datesData.find((item) => item.id === id);
     };
 
     const onDatePress = (item) => {
        setSelectedDateId(item.id);
        setSelectedTimeId(undefined); // This will clear the selected time slot when a new date is selected
      };
      
 
     // comt: render date items from flatlist and pass to <DateItem>
     const renderDateItem = ({ item }) => {
        const backgroundColor = item.id === selectedDateId ? colors.textwhite : colors.cardbackground;
        const color = item.id === selectedDateId ? colors.textblack : colors.textwhite;
        
        // Check if the selected date is the current date
        const isCurrentDay = selectedDateId === undefined ? false : item.id === moment().format('D');
      
        return (
          <DateItem
            item={item}
            onDatePress={() => onDatePress(item)}
            backgroundColor={backgroundColor}
            textColor={color}
            isCurrentDay={isCurrentDay} // Pass the isCurrentDay flag
          />
        );
      };
      
 
     const generateTimeSlots = (startTime, endTime, selectedDateId, currentDate, isCurrentDay) => {
         const startHour = parseInt(startTime.split('.')[0]);
         const endHour = parseInt(endTime.split('.')[0]);
         const timeSlots = [];
 
         for (let hour = startHour + 1; hour < endHour; hour++) {
             for (let minute = 0; minute < 60; minute += 60) {
                 const formattedTime = moment({ hour, minute }).format('HH:mm');
                 const timeHasPassed = isCurrentDay && moment().isAfter(moment(formattedTime, 'HH:mm'), 'minute');
                 timeSlots.push({ id: formattedTime, time: formattedTime, disabled: isCurrentDay && timeHasPassed });
             }
         }
         return timeSlots;
     };
                 
     // comt: render Time item from flatlist and pass to <TimeItem>
    // comt: render Time item from flatlist and pass to <TimeItem>
const renderTimeItem = ({ item }) => {
  const backgroundColor = item.id === selectedTimeId ? colors.textwhite : colors.textblack;
  let textColor = item.id === selectedTimeId ? colors.textblack : colors.textwhite;

  // Check if the time slot is disabled
  if (item.disabled) {
    textColor = 'gray'; // Set the text color to gray for disabled time slots
  }

  return (
    <TimeItem
      item={item}
      onTimePress={() => {
        if (!item.disabled) {
          setSelectedTimeId(item.id);
        }
      }}
      backgroundColor={backgroundColor}
      textColor={textColor}
      disabled={item.disabled}
    />
  );
};

const [isBookButtonDisabled, setIsBookButtonDisabled] = useState(false);
const [loading, setLoading] = useState(true);
const { user } = useAuth();
const [phone, setPhoneNumber] = useState(''); 
const [data, setData]=useState();

useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const db = getDatabase();
        const encodedEmail = encodeEmail(user.email);
        const userRef = ref(db, `users/${encodedEmail}`);
        const snapshot = await get(userRef);
        console.log("Trying to fetch");
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setPhoneNumber(userData.phoneNumber); // Sets the phone number
          console.log("Phone Number is set");
        } else {
          console.error("No user data found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchPhoneNumber();
  }, [user]);
  
  useEffect(() => {
    if (!phone) {
      //console.error("Phone number is not available.");
      return;
    }
    
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const moment = require('moment');
        console.log(phone);
        const bookedRef = ref(db, `bookings/${phone}`);
        const snapshot = await get(bookedRef);
        if (snapshot.exists()) {
          const dataObj = snapshot.val();
          const reversedData = Object.keys(dataObj)
            .reverse()
            .map((key) => dataObj[key])
            .flat();
          console.log(reversedData.length);
          console.log(reversedData);
          setData(reversedData);
          setLoading(false);
          
          // Check if the first item's date and time have not passed
          const currentDate = moment().format('YYYY-MM-DD');
          const currentTime = moment().format('HH:mm');
  
          const parsedDate = moment(reversedData[0].date, 'MMMM Do YYYY');
          const isoDateStr = parsedDate.format('YYYY-MM-DD');
  
          const dateIsAhead = moment(isoDateStr).isSameOrAfter(currentDate);
          const timeIsAhead = moment(reversedData[0].time, 'HH:mm').isSameOrAfter(moment(currentTime, 'HH:mm'));
  
          if (dateIsAhead) {
            if (moment(isoDateStr).isSame(currentDate) && !timeIsAhead) {
              setIsBookButtonDisabled(false);
              return;
            }
            setIsBookButtonDisabled(true);
          } else {
            setIsBookButtonDisabled(false);
            return;
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  
    // Cleanup timeout to avoid memory leaks
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
  
    return () => clearTimeout(timeout);
  }, [phone]); // Add phone as a dependency
  
                    
    const [isModalVisible, setModalVisible] = useState(false);
     //toggle for bottomsheet
     const toggleModal = () => {
         let toast = "Please select";
         if(selectedDateId !== undefined){
             if(selectedTimeId !== undefined){
                 setModalVisible(!isModalVisible);
                 return;
             }
             else{
                 toast += " Time"; 
             }
         }
         else{
             toast = "Please select Date & time";
         }
         
         if (Platform.OS !== 'android') {
             Snackbar.show({
                 text: toast,
                 duration: Snackbar.LENGTH_SHORT,
             });
         } else {
             ToastAndroid.show(toast, ToastAndroid.SHORT);
         }
     }; 
    
         // notification functionality
    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(handleNotification);
        return () => {
            subscription.remove();
        };
    }, []);
    const handleNotification = (notification) => {
        // Handle the received notification here
        const { request: { content: { title, body } } } = notification;

        // Handle the notification data as desired
        console.log('Received notification:');
        // console.log('Title:', title);
        // console.log('Body:', body);
        // You can perform additional actions based on the notification data
        // For example, display the notification in the UI
        console.log(`Received notification:\nTitle: ${title}\nBody: ${body}`);
    };

    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });
    }, []);



    const scheduleNotification = async (date, storeName, time) => {
        try {
            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Appointment Booked.',
                    body: `at ${storeName}\nDate: ${date}\tTime: ${time}`,
                },
                trigger: {
                    seconds: 5, // Set the time delay for the notification in seconds
                },
            });
            console.log('Notification scheduled with ID:', notificationId);
        } catch (error) {
            console.log('Error scheduling notification:', error);
        }
    };
     
    //console.log(reversedData.length);
    const handleConfirmBooking = async () => {
        const selectedDateItem = getDateItemById(selectedDateId);
        const formattedDate = moment()
          .add(selectedDateItem.id - 1, 'days')
          .format('MMMM Do YYYY');

        const date = formattedDate;
        //const date = getDateItemById(selectedDateId).format('MMMM Do YYYY');
        const time = getItemById(selectedTimeId).time;
        //console.log(date);
        //console.log(time);
        //console.log(data.length);
        var dataId = 1;
        if(data !== undefined){
            dataId = (data.length) + 1;
        }
        if (date !== '' && time !== '') {
          try {
            const auth = getAuth();
            const db = getDatabase();
            // Format the selected date into 'MMMM Do YYYY' format
            //const formattedDate = moment(selectedDate, 'YYYY-MM-DD').format('MMMM Do YYYY');
            const userRef = ref(db, `bookings/${phone}/` + dataId);
            // Push the selected date and time to the user's bookings node
            await set(userRef, {
                date: date,
                storeName: shop.storeName,
                time: time,
            });
          //  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          //  if (status === 'granted') {
                // Permissions granted, send local notification
           //     sendLocalNotification(date, shop.storeName, time);
           // }
           scheduleNotification(date, shop.storeName, time);
            navigation.navigate('ConfirmationTick');
          } catch (error) {
            console.error('Error confirming booking:', error);
          }
        }
    };

     return(
         <SafeAreaView style={styles.safe}>
                 <View style={styles.currentMonthYear}>
                     <Text style={styles.datetitle}>{moment().format("MMMM YYYY")}</Text>
                 </View>
 
                 {/*Date and day list*/}
                 <View style={styles.DateWrapper}>
                     <Text style={styles.DateText}>DATE</Text>
                     <View style={styles.DatelistWrapper}>
                     <FlatList  
                         data={datesData}
                         keyExtractor={(item) => item.id.toString()}
                         renderItem={renderDateItem}
                         horizontal={true}
                     />
                     </View>
                 </View>
 
                 {/*Time list*/}
                 <View style={styles.TimeWrapper}>
                     <Text style={styles.timeText}>TIME</Text>
                     <View style={styles.timelistWrapper}>
                         <FlatList
                             data = {timeSlots}
                             renderItem = {renderTimeItem}
                             keyExtractor= {(item) =>item.id}
                             horizontal={true}
                         />
                     </View>
                 </View>
 
                 {/*book view with selected date and time and bookNow button*/}
                <View style={styles.bookingContainer}>
                     {/*show selected date and time in booking  moment().format('MMMM')*/}
                    <View style={styles.showDateNTime}>
                        <View style={styles.calNdate}>
                            <Entypo name="calendar" size ={18} color={colors.textblack}/>
                            {selectedDateId !== undefined ? (
                                <Text style={styles.datebooked}>{moment().add(selectedDateId -1, 'days').format('dddd')}, {getDateItemById(selectedDateId).month} {getDateItemById(selectedDateId).date}</Text>
                            ):(
                                <Text style={styles.datebooked}>Date</Text>
                            )}
                         </View>
                         {selectedTimeId !== undefined ? (
                             <Text style={styles.timebooked}>{getItemById(selectedTimeId).time}</Text> 
                         ):(
                                 <Text style={styles.timebooked}>Time</Text>   
                             
                         )}
                     </View>
 
                     {/*book button view*/}                
                     <View style={styles.bookbox}>
                         {/*button container*/}
                         <TouchableOpacity 
                            disabled={isBookButtonDisabled} 
                            onPress={toggleModal}
                            style={[styles.bookbutton, {backgroundColor: isBookButtonDisabled ? 'gray' : colors.textblack}]}
                            >
                            <Text style={styles.book}>Book Now</Text>
                         </TouchableOpacity>
                     </View>
                     <Modal
                         onBackdropPress={() => setModalVisible(false)}
                         onBackButtonPress={() => setModalVisible(false)}
                         isVisible={isModalVisible}
                         swipeDirection="down"
                         onSwipeComplete={toggleModal}
                         animationIn="bounceInUp"
                         animationOut="bounceOutDown"
                         animationInTiming={900}
                         animationOutTiming={500}
                         backdropTransitionInTiming={1000}
                         backdropTransitionOutTiming={500}
                         style={styles.modal}
                     >
                         <View style={styles.modalContent}>
                             <View style={styles.center}>
                                 <View style={styles.barIcon} />
                             </View>
                             <View style={styles.bookingdetails}>
                                 <Text style={styles.bookingdetailText}>Booking Details</Text>
                             </View>
                                 {selectedDateId == undefined || selectedTimeId == undefined? (
                                     <Text style={styles.datebooked}>Please Select Date & Time</Text>
                                 ):(
                                 <View style={styles.StoreDateTime}>
                                     <View style={styles.storeHead}>
                                         <Text style={styles.StoreDateTimeTitle}>Store</Text>
                                         <Text style={styles.StoreDateTimeSelected}>{shop.storeName}</Text>
                                     </View>
                                     <View style={styles.storeHead}>
                                         <Text style={styles.StoreDateTimeTitle}>Date</Text>
                                         <Text style={styles.StoreDateTimeSelected}>{moment().add(selectedDateId -1, 'days').format('dddd')}, {getDateItemById(selectedDateId).month} {getDateItemById(selectedDateId).date}</Text>
                                     </View>
                                     <View style={styles.storeHead}>
                                         <Text style={styles.StoreDateTimeTitle}>Time</Text>
                                         <Text style={styles.StoreDateTimeSelected}>{getItemById(selectedTimeId).time}</Text>
                                     </View>
                                 </View>
                                 )}
                             <TouchableOpacity style={styles.ConfirmBookingButton} onPress={handleConfirmBooking}>
                                 <Text style ={styles.ConfirmBookingText}>Confirm Booking</Text>
                             </TouchableOpacity>   
                         </View>
                     </Modal>
                 </View>
         </SafeAreaView>        
     );
};
const styles = StyleSheet.create({
    safe:{
        height:'100%',
        justifyContent:'space-between',
        //backgroundColor:colors.calenderbackground,
    },
currentMonthYear:{
    //top:20,
    //top:responsiveHeight(2.45),
    //marginHorizontal:20,
    marginHorizontal:responsiveWidth(4.68),
},
datetitle:{
    fontFamily:'Inconsolata-Bold',
    color:colors.textwhite,
    //fontSize:20,
    fontSize:responsiveFontSize(2.5),
},
DatelistWrapper:{
    //height:93,
    height:responsiveHeight(11.3),
    //backgroundColor:colors.textblack,
},
DateWrapper:{
    //top:25,
    //top:responsiveHeight(2),
    //height:100,
    height:responsiveHeight(11.5),
    marginLeft:responsiveWidth(4.68),
    //backgroundColor:colors.textwhite,
},
Datelist:{
    flexDirection:'column',
    //backgroundColor:colors.TextBlood,
    //top:10,
    top:responsiveWidth(2.28),
    //marginRight:20,
    marginRight:responsiveWidth(4.68),
    //borderRadius:15,
    borderRadius:responsiveWidth(3.5),
    //width:55,
    width:responsiveWidth(12.75),
    //height:70,
    height:responsiveHeight(8.55),
    borderColor:colors.border,
    //borderWidth :1,
    borderWidth:responsiveWidth(0.25),
    alignItems: 'center',
    justifyContent: 'center',
},
DateText:{
    fontFamily:'Inconsolata-Bold',
    color:colors.textgray,
    //fontSize:20,
    fontSize:responsiveFontSize(2.2),
},
date:{
    fontFamily:'Inconsolata-ExtraBold',
    color:colors.textwhite,
    //fontSize:24,
    fontSize:responsiveFontSize(2.7),
},
day:{
    fontFamily:'Inconsolata-ExtraBold',
    color:colors.textwhite,
    //fontSize:14,
    fontSize:responsiveFontSize(1.6),
},
TimeWrapper:{
    //top:30,
    //top:responsiveHeight(2),
    //marginLeft:20,
    marginLeft:responsiveWidth(4.68),
    //backgroundColor:colors.textwhite,
},
timeText:{
    fontFamily:'Inconsolata-Bold',
    color:colors.textgray,
    //fontSize:20,
    fontSize:responsiveFontSize(2.2),
},
Timelist:{
    //backgroundColor:colors.TextBlood,
    //marginRight:20,
    marginRight:responsiveWidth(4.68),
    //top:10,
    top:responsiveWidth(2.28),
    //borderRadius:10,
    borderRadius:responsiveWidth(2.4),
    //width:80,
    width:responsiveWidth(18.58),
    //height:35,
    height:responsiveHeight(4.27),
    borderColor:colors.border,
    //borderWidth:1,
    borderWidth:responsiveWidth(0.25),
    alignItems:'center',
    justifyContent: 'center',
},
timelistWrapper:{
    height:50,
    //backgroundColor:colors.textblack,
},
time:{
    fontFamily:'Inconsolata-Medium',
    color:colors.textwhite,
    //fontSize:16,
    fontSize:responsiveFontSize(2),
},
bookingContainer:{
    //top:-10,
    flexDirection:'column',
    backgroundColor:colors.calenderbackground,
    width:'100%',
    height:'30%',
    //height:responsiveHeight(30),
    //borderRadius:20,
    //borderRadius:responsiveWidth(4.5),
    borderTopLeftRadius:responsiveWidth(4.5),
    borderTopRightRadius:responsiveWidth(4.5),
    justifyContent:'space-between',
    alignItems:'center',
},
bookbox:{
    backgroundColor:colors.textwhite,
    width:'100%',
    height:'75%',
    //borderRadius:20,
    //borderRadius:responsiveWidth(4.5),
    borderTopLeftRadius:responsiveWidth(4.5),
    borderTopRightRadius:responsiveWidth(4.5),
    justifyContent:'center',
    alignItems:"center",
},
bookbutton:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:colors.textblack,
    width:'60%',
    height:'50%',
    //borderRadius:20,
    borderRadius:responsiveWidth(4.5),
},
book:{
    fontFamily: 'Inconsolata-Bold',
    color:colors.textwhite,
    //fontSize:24,
    fontSize:responsiveFontSize(2.7),
},
showDateNTime:{        
    //paddingHorizontal:40,
    paddingHorizontal:responsiveWidth(4.20),
    width:'100%',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
   // backgroundColor:colors.textblack,
},
calNdate:{
    flexDirection:'row',
    alignItems:'center',
},
datebooked:{
    //marginLeft:10,
    marginLeft:responsiveWidth(2),
    fontFamily:'Inconsolata-Bold',
    //fontSize:20,
    fontSize:responsiveFontSize(2.1),
},
timebooked:{
    fontFamily:'Inconsolata-Medium',
    //fontSize:16,
    fontSize:responsiveFontSize(1.8),
},
modal: {
    justifyContent: "flex-end",
    margin: 0,
    //backgroundColor:colors.textdarkgold,
  },
modalContent: {
    backgroundColor: "#161616",
    paddingHorizontal: responsiveWidth(4.68),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: responsiveHeight(40),
    paddingBottom: 20,
    justifyContent:'space-between',
},
center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
},
barIcon: {
    width: 60,
    height: 5,
    backgroundColor: "#bbb",
    borderRadius: 3,
},
bookingdetails:{
    alignItems: "center",
    justifyContent: "center",
},
bookingdetailText:{
    fontFamily:'Inconsolata-Bold',
    fontSize:responsiveFontSize(2.6),
    color:colors.textwhite,
},
StoreDateTime:{
    flexDirection:'column',
    height: responsiveHeight(18),
    justifyContent:'space-around',     
    //backgroundColor:colors.textdarkgold,
},
storeHead:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    //backgroundColor:colors.cardbackground,
},
StoreDateTimeTitle:{
    fontFamily:'Inconsolata-Medium',
    fontSize:responsiveFontSize(2.4),
    color:colors.calenderbackground,
},
StoreDateTimeSelected:{
    fontFamily:'Inconsolata-Bold',
    fontSize:responsiveFontSize(2.4),
    color:colors.border,
},
ConfirmBookingButton:{
    backgroundColor:colors.textwhite,
    height:responsiveHeight(5.5),
    borderRadius:responsiveFontSize(1.5),
    alignItems:'center',
    justifyContent: 'center',
},
ConfirmBookingText:{
    fontFamily: 'Inconsolata-Bold',
    color:colors.textblack,
    fontSize:responsiveFontSize(2.2),
},
});

export default Booking;