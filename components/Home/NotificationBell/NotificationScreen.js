import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../assets/colors/colors';
import BookedScreen from './BookedScreen';  // Import the child components
import HistoryScreen from './HistoryScreen';
import { getDatabase, ref, get } from 'firebase/database';
import { useAuth } from '../../Authentication/AuthContext';
import { encodeEmail } from '../../../utils/encodeEmail';
import NotFoundAnimation from './NotFoundAnimation';
import moment from 'moment';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth(); // Get the user from the authentication context
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'booked', title: 'Booked' },
    { key: 'history', title: 'History' },
  ]);
  const [phone, setPhoneNumber] = useState('');  // Track phone number
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [firstItem, setFirstItem] = useState(null);
  const [remainingItems, setRemainingItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const db = getDatabase();
        const encodedEmail = encodeEmail(user.email);
        const userRef = ref(db, `users/${encodedEmail}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();
          setPhoneNumber(userData.phoneNumber); // Sets the phone number
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
    const fetchData = async () => {
      if (!phone) {
        //console.error("Phone number is not available.");
        return;
    }
      console.log(phone);
      try {
        const db = getDatabase();
        const bookedRef = ref(db, `bookings/${phone}`);
        const snapshot = await get(bookedRef);

        if (snapshot.exists()) {
          const dataObj = snapshot.val();
          const reversedData = Object.keys(dataObj)
            .reverse() // reverse the order of the keys
            .map((key) => dataObj[key]) // map to the values (which are arrays)
            .flat()
          setData(reversedData);
          setRemainingItems(reversedData.slice(1)); // Skip the first item
          const firstBooking = reversedData[0];
          console.log("FIRST BOOKING", firstBooking);

          // Get current date and time
          const currentDate = moment().format('YYYY-MM-DD');
          const currentTime = moment(); // Keep as a moment object for accurate comparison

          // Parse the booking date and format it for comparison
          const parsedDate = moment(firstBooking.date, 'MMMM Do YYYY');
          const bookingDate = parsedDate.format('YYYY-MM-DD');

          // Check if the booking date is ahead of or the same as the current date
          const dateIsAhead = moment(bookingDate).isSameOrAfter(currentDate);

          // Parse booking time as a moment object
          const bookingTime = moment(firstBooking.time, 'HH:mm');

          // Now check time if the dates are the same
          let timeIsAhead = false;
          if (moment(bookingDate).isSame(currentDate)) {
            // Compare the booking time to the current time
            timeIsAhead = bookingTime.isAfter(currentTime);
          }

          console.log("DATE AHEAD:", dateIsAhead);
          console.log("TIME AHEAD:", timeIsAhead);

          // Set the first item if the date or time is ahead
          if (dateIsAhead && (!moment(bookingDate).isSame(currentDate) || timeIsAhead)) {
            setFirstItem(firstBooking);
            console.log("SET FIRST BOOK", firstBooking);
          }

          setStartIndex(1);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [phone]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.textwhite }}
      style={{ backgroundColor: colors.textblack }}
    />
  );

  const renderScene = SceneMap({
    booked: () => {
      if (loading) return <ActivityIndicator size="large" />;
      return <BookedScreen firstItem={firstItem} setFirstItem={setFirstItem} data={data} phone={phone} />;
    },
    history: () => {
      if (loading) return <ActivityIndicator size="large" />;
      return <HistoryScreen remainingItems={remainingItems} phone={phone} />;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={colors.textwhite} />
        </TouchableOpacity>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 300 }}
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
    margin: 20,
    marginTop: 40,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(9,9,9,0.5)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationScreen;
