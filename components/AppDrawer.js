import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Home/Home';
import ProfileScreen from './Home/ProfileScreen';

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
