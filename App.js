import  React,{useState, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import colors from './assets/colors/colors';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from "./components/Authentication/AuthContext";
import { getAuth } from 'firebase/auth';

//import AppDrawer from "./components/AppDrawer";
import EmailAuthScreen from "./components/Authentication/EmailAuthScreen";
import UserProfileInput from "./components/Authentication/UserProfileInput";
import Home from './components/Home/Home'
import ShopDetails from "./components/ShopDetails/ShopDetails";
import ConfirmationTick from "./components/ShopDetails/ConfirmationTick";
import CameraScreen from "./components/Home/CameraScreen";
import ProfileScreen from "./components/Home/ProfileScreen";
import NotificationScreen from "./components/Home/NotificationBell/NotificationScreen";
import StoreList from "./components/Home/StoreList";
import { GlobalStateProvider } from './components/GlobalState';
//import * as Notifications from 'expo-notifications';
//import * as Permissions from 'expo-permissions';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <AuthProvider>
      <AppContent/>
    </AuthProvider>
  );
} 
function AppContent (){
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

//  const requestNotificationPermissions = async () => {
//    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//    if (status === 'granted') {
//      // Permissions granted
//      configureNotifications(); // Configure notifications
//    } else {
//      // Permissions denied
//    }
//  };

  useEffect(() => {
   // requestNotificationPermissions();

    // Listen for changes in the user state
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        setLoading(false);
      } else {
        // User is not logged in
        setLoading(false);
      }
    });

    // Create a notification channel (Android only)
   // PushNotification.createChannel(
   //   {
   //     channelId: 'booking-channel', // Use a unique channel ID
   //     channelName: 'Booking Notifications',
   //   },
   //   (created) => console.log(`Notification channel created: ${created}`)
   // );

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Display a loading indicator while Firebase authentication initializes
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.textblack}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }  

   // Configure notifications
  // const configureNotifications = () => {
  //  Notifications.setNotificationHandler({
  //    handleNotification: async () => ({
  //      shouldShowAlert: true,
  //      shouldPlaySound: false,
  //      shouldSetBadge: false,
  //    }),
  //  });
   // Notifications.addNotificationReceivedListener((notification) => {
      // Handle the received notification
  //    console.log('Received Notification:', notification);
  //  });

  //  Notifications.addNotificationResponseReceivedListener((response) => {
      // Handle the user's response to the notification
  //    console.log('Notification Response:', response);
  //  });
  //};

  //console.log(user);
  return(
    <GlobalStateProvider>
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // User is logged in, navigate to Home.js
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          ) : (
          // User is not logged in, navigate to Login.js
          <Stack.Screen name="EmailAuthScreen" component={EmailAuthScreen} options = {{
            headerShown:false,
          }}
          />
        )
        }
        {//<Stack.Screen name="PhoneAuthScreen" component={PhoneAuthScreen} options = {{
        //  headerShown:false,
        //}}/>
        //<Stack.Screen name="Home" component={Home} options = {{
        //  headerShown:false,
        //}}/>
        }
        <Stack.Screen name = "NotificationScreen" component={NotificationScreen} options = {{
          headerShown:false,
        }}
        />
        <Stack.Screen name="UserProfileInput" component={UserProfileInput} options = {{
          headerShown:false,
        }}
        />
        
          <Stack.Screen name="StoreList" component={StoreList} options = {{
            headerShown:false,
          }}
          />
          <Stack.Screen name="ShopDetails" component={ShopDetails} options = {{
            headerShown:false,
          }}
          />
        <Stack.Screen name="ConfirmationTick" component={ConfirmationTick} options = {{
          headerShown:false,
        }}
        />
        <Stack.Screen name="CameraScreen" component={CameraScreen} options = {{
          headerShown:false,
        }}
        />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options = {{
          headerShown:false,
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </GlobalStateProvider>
  );
}