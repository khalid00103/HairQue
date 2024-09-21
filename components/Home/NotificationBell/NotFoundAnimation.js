import React, {useEffect, useRef} from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../../../assets/colors/colors';

const NotFoundAnimation = () => {

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
          //navigation.navigate('Home');
      }, 3000);
    
      return () => {
          clearTimeout(timer); // Clear the timeout if the component unmounts before the timeout finishes
      };
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        progress={progress}
        source={require('../../../assets/notFoundAnimation.json')}
        autoPlay
        loop={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '40%',
    width: '100%',
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor:colors.TextBlood,
  },
});

export default NotFoundAnimation;
