import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home/Home';
import ShopDetails from '../ShopDetails/ShopDetails';
import UserProfileInput from '../Authentication/UserProfileInput';
import NotificationScreen from '../Home/NotificationBell/NotificationScreen';
import StoreList from '../Home/StoreList';
import ConfirmationTick from '../ShopDetails/ConfirmationTick';
import CameraScreen from '../Home/CameraScreen';
import ProfileScreen from '../Home/ProfileScreen';
import { getDatabase, ref, get } from 'firebase/database'; // assuming Firebase
import { useAuth } from '../Authentication/AuthContext'; // assuming you're using an Auth context
import { encodeEmail } from '../../utils/encodeEmail';

const MainStack = createNativeStackNavigator();

const MainStackScreen = () => {
  const { user } = useAuth(); // Use your AuthContext to get user data
  const [initialRoute, setInitialRoute] = useState(null); // state to manage initial route

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
        const db = getDatabase();
        const encodedEmail = encodeEmail(user.email); // Function to encode email if needed
        const userRef = ref(db, `users/${encodedEmail}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();
          if (userData.phoneNumber) {
            setInitialRoute('Home'); // If phone number exists, navigate to Home
          } else {
            setInitialRoute('UserProfileInput'); // If phone number doesn't exist, navigate to UserProfileInput
          }
        } else {
          console.error('No user data found!');
          setInitialRoute('UserProfileInput'); // Fallback
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setInitialRoute('UserProfileInput'); // Fallback in case of error
      }
    };

    fetchPhoneNumber();
  }, [user]);

  // Show nothing until we know which route to navigate to
  if (!initialRoute) {
    return null; // or a loading spinner if you want to show something in the meantime
  }

  return (
    <MainStack.Navigator initialRouteName={initialRoute}>
      <MainStack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false }} 
      />
      <MainStack.Screen 
        name="ShopDetails" 
        component={ShopDetails} 
        options={{ headerShown: false }} 
      />
      <MainStack.Screen 
        name="UserProfileInput" 
        component={UserProfileInput} 
        options={{ headerShown: false }} 
      />
      <MainStack.Screen 
        name="NotificationScreen" 
        component={NotificationScreen} 
        options={{ headerShown: false }} 
      />
      <MainStack.Screen 
        name="StoreList" 
        component={StoreList} 
        options={{ headerShown: false }} 
      />
      <MainStack.Screen 
        name="ConfirmationTick" 
        component={ConfirmationTick} 
        options={{ headerShown: false }} 
      />
      <MainStack.Screen 
        name="CameraScreen" 
        component={CameraScreen} 
        options={{ headerShown: false }} 
      />
      <MainStack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ headerShown: false }} 
      />
    </MainStack.Navigator>
  );
};

export default MainStackScreen;
