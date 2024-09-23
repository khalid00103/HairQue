import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Animated, Text, View, Image, TouchableOpacity, Pressable, Easing } from 'react-native';
import { useFonts } from 'expo-font';
import colors from '../../assets/colors/colors.js';
import { Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../Authentication/AuthContext';
import { getDatabase, ref, get } from 'firebase/database';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Booking from './Booking';
import Portfolio from './Portfolio';
import Review from './Review';
import { useGlobalState } from '../Important_files/GlobalState';
import styles from './styles/shopDetailsStyles';

const ShopDetails = ({ route }) => {
    const { item, option } = route.params;
    const { likedItems, toggleLikeStatus } = useGlobalState();
    const isLiked = likedItems.includes(item.storeId);

    const [fontsLoaded] = useFonts({
        'Oswald-Medium': require('../../assets/fonts/Oswald-Medium.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'NotoSerif-Regular': require('../../assets/fonts/NotoSerif-Regular.ttf'),
        'Inconsolata-Regular': require('../../assets/fonts/Inconsolata-Regular.ttf'),
        'Inconsolata-Bold': require('../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-ExtraBold': require('../../assets/fonts/Inconsolata-ExtraBold.ttf'),
        'Inconsolata-Medium': require('../../assets/fonts/Inconsolata-Medium.ttf'),
    });

    const [liked, setLiked] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const db = getDatabase();
        const likedStoresRef = ref(db, `users/${user.phoneNumber}/likedStores`);

        get(likedStoresRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const likedStoresData = snapshot.val();
                    const isLiked = likedStoresData.includes(item.storeId);
                    setLiked(isLiked);
                }
            })
            .catch((error) => {
                console.error('Error fetching liked stores:', error);
            });
    }, [user.phoneNumber, item.storeId]);

    const handleLikePress = useCallback((storeId) => {
        toggleLikeStatus(storeId);
    }, [toggleLikeStatus]);

    const slideAnim = useRef(new Animated.Value(300)).current;

    const startAnimation = useCallback(() => {
        slideAnim.setValue(300);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300, // Reduced duration for smoother animation
            easing: Easing.in(Easing.ease), // Added easing function
            useNativeDriver: true,
        }).start();
    }, [slideAnim]);

    useEffect(() => {
        startAnimation(); // Run animation once on mount
    }, [startAnimation]);

    const Buttons = [
        { id: 0, name: 'Booking' },
        { id: 1, name: 'Portfolio' },
        { id: 2, name: 'Reviews' },
    ];

    const [selectedButton, setSelectedButton] = useState(option);

    const handleButtonPress = useCallback((buttonId) => {
        if (buttonId !== selectedButton) { // Prevent redundant animations
            setSelectedButton(buttonId);
            startAnimation();
        }
    }, [selectedButton, startAnimation]);

    const getButtonTextStyle = useCallback((buttonId) => (
        selectedButton === buttonId ? styles.bookingTextSelected : styles.bookingText
    ), [selectedButton]);

    const navigation = useNavigation();

    const handleBackPress = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const mapRatingToTag = useCallback((rating) => {
        if (rating >= 4.5) return { tag: 'Prime', color: 'rgba(0, 150, 255, 0.8)' };
        if (rating >= 4.0) return { tag: 'Top-notch', color: 'rgba(10, 240, 80, 0.8)' };
        if (rating >= 3.5) return { tag: 'Excellent', color: 'rgba(255, 255, 0, 0.8)' };
        if (rating >= 3.0) return { tag: 'Good', color: 'rgba(255, 165, 0, 0.8)' };
        if (rating >= 2.5) return { tag: 'Ok', color: 'rgba(128, 0, 128, 0.8)' };
        return { tag: 'Bad', color: 'rgba(255, 0, 0, 0.8)' };
    }, []);

    const { tag, color } = mapRatingToTag(item.rating);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* Shop Image, Back Arrow, Shop Name, and Rating */}
                <View style={styles.shopdetailWrapper}>
                    <View style={styles.shopdetailimage}>
                        <Image
                            source={{ uri: item.profilePictureUri }}
                            style={styles.shopdetailimage}
                        />
                        <View style={styles.iconWrapper}>
                            <TouchableOpacity onPress={handleBackPress}>
                                <Feather name="arrow-left" size={responsiveWidth(6.5)} color={colors.textwhite} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.detailshop}>
                        <View style={styles.shopNameHeart}>
                            <Text style={styles.detailShopName}>{item.storeName}</Text>
                            <Pressable onPress={() => handleLikePress(item.storeId)}>
                                <MaterialCommunityIcons
                                    name={isLiked ? 'heart' : 'heart-outline'}
                                    size={responsiveWidth(6)}
                                    color={isLiked ? 'red' : 'white'}
                                />
                            </Pressable>
                        </View>
                        <View style={styles.detailrating}>
                            <FontAwesome
                                name="star-half-full"
                                size={responsiveWidth(3.5)}
                                color={colors.textlightgold}
                            />
                            <Text style={[styles.rating, { marginLeft: 5 }]}>{item.rating}</Text>
                            <Text style={[styles.ratedcustomer, { marginLeft: 5 }]}>({item.customerReview})</Text>
                            <Text style={[styles.customerreview, { marginLeft: 5, color }]}>{tag}</Text>
                        </View>
                    </View>
                </View>

                {/* Option Buttons and Content */}
                <View style={styles.blackcontainer}>
                    <View style={styles.options}>
                        {Buttons.map((btn) => (
                            <TouchableOpacity
                                key={btn.id}
                                style={selectedButton === btn.id ? styles.OptionSelected : styles.Optionsetting}
                                onPress={() => handleButtonPress(btn.id)}
                            >
                                <Text style={getButtonTextStyle(btn.id)}>{btn.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Animated.View style={[styles.optionChangestoBooking, { transform: [{ translateX: slideAnim }] }]}>
                        {selectedButton === 0 && <Booking shop={item} navigation={navigation}/>}
                        {selectedButton === 1 && <Portfolio shop={item} />}
                        {selectedButton === 2 && <Review />}
                    </Animated.View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default React.memo(ShopDetails);
