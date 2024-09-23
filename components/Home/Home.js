import React, { useState, useEffect } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, StatusBar, Pressable } from 'react-native';
import { useFonts } from "expo-font";
import colors from '../../assets/colors/colors.js';
import { Feather, Octicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import { useAuth } from '../Authentication/AuthContext';
import StoreList from "./StoreList.js";
import styles from './styles/homeStyles';// Import styles
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

export default Home = ({ navigation }) => {
    const { user } = useAuth();
    const [BellClicked, setBellClicked] = useState(false);
    const [searchText, setSearchText] = useState('');

    const [fontsLoaded] = useFonts({
        'Oswald-Medium': require('../../assets/fonts/Oswald-Medium.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'NotoSerif-Regular': require('../../assets/fonts/NotoSerif-Regular.ttf'),
        'Inconsolata-Regular': require('../../assets/fonts/Inconsolata-Regular.ttf'),
        'Inconsolata-Bold': require('../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-ExtraBold': require('../../assets/fonts/Inconsolata-ExtraBold.ttf'),
        'Inconsolata-Medium': require('../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const [currentDate, setCurrentDate] = React.useState(moment());
    useEffect(() => {
        const updateDate = () => setCurrentDate(moment());
        const timer = setInterval(updateDate, 1000); 
        return () => clearInterval(timer); 
    }, []);

    if (!fontsLoaded) return null;

    const openCamera = () => navigation.navigate('CameraScreen');
    const openProfileScreen = () => navigation.navigate('ProfileScreen');

    return (
        <SafeAreaView>
            <StatusBar backgroundColor="#000000" barStyle={'default'} />
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.textStyle}>HairQue</Text>
                    <View style={styles.menuwrapper}>
                        <Pressable onPress={() => openCamera()}>
                            <Feather name="camera" size={responsiveWidth(6.5)} color={colors.textwhite} />
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('NotificationScreen')}>
                            <Octicons paddingHorizontal={responsiveWidth(6.5)} name="bell" size={responsiveWidth(6.5)} color="white" />
                        </Pressable>
                        <Pressable onPress={openProfileScreen}>
                            <Feather name="menu" size={responsiveWidth(6.5)} color={colors.textwhite} />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.titleswrapper}>
                    <Text style={styles.titlesSubtitle}>hey,</Text>
                    <Text style={styles.titleTitle}>{user ? user.displayName : 'Guest'}</Text>
                    <Image source={require('../../assets/images/waving-hand.png')} style={{ width: responsiveWidth(8.2), height: responsiveWidth(8.75) }} />
                </View>

                <View style={styles.currentdaymonth}>
                    <Text style={styles.datetitle}>{currentDate.format("dddd, MMMM D")}</Text>
                </View>

                <View style={styles.searchBox}>
                    <Feather name="search" size={responsiveWidth(6)} color={colors.textwhite} />
                    <TextInput
                        style={styles.input}
                        onChangeText={(newText) => setSearchText(newText)}
                        placeholder="Search"
                        placeholderTextColor={colors.border}
                        value={searchText}
                    />
                </View>

                <View style={styles.nearbySearchwrapper}>
                    <Text style={styles.nearbytitle}>Nearby BarberShop</Text>
                    <StoreList navigation={navigation} searchText={searchText} />
                </View>
            </View>
        </SafeAreaView>
    );
};
