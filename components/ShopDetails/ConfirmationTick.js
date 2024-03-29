import React, {useEffect, useRef} from 'react';
import {StyleSheet, View,Animated} from 'react-native';
import colors from '../../assets/colors/colors.js';
import LottieView from 'lottie-react-native';
export default ConfirmationTick =({navigation}) => {

    const progress = useRef(new Animated.Value(0)).current;

    const handleLikeAnimation = () => {
        Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
        }).start();
        
    };
    useEffect(() => {
        handleLikeAnimation();
        const timer = setTimeout(() => {
            //console.log('Function executed after 5 seconds');
            navigation.navigate('Home');
        }, 3000);
      
        return () => {
            clearTimeout(timer); // Clear the timeout if the component unmounts before the timeout finishes
        };
    }, []);
      

    return(
        <View style={styles.container}>
            <LottieView
                progress={progress}
                source = {require('../../assets/confirmationAnimation.json')}
                //autoPlay
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      //flex: 1, 
      width: '100%',
      height: '100%',
      backgroundColor: colors.textblack,
    },
});