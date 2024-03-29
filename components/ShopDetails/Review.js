import React, {useState, useRef, useEffect, useCallback} from 'react';
//import { StatusBar } from 'expo-status-bar';
import {Animated, StyleSheet, Text, View, Image,TextInput, FlatList, TouchableOpacity, StatusBar, Pressable, useColorScheme,  ToastAndroid, Platform,Button} from 'react-native';
import colors from '../../assets/colors/colors.js';
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import{
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
}from "react-native-responsive-dimensions";
const Review =({})=>{
    const [fontsLoaded]= useFonts({
        'Oswald-Medium' : require('../../assets/fonts/Oswald-Medium.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'NotoSerif-Regular' : require('../../assets/fonts/NotoSerif-Regular.ttf'),
        'Inconsolata-Regular':require('../../assets/fonts/Inconsolata-Regular.ttf'),
        'Inconsolata-Bold':require('../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-ExtraBold':require('../../assets/fonts/Inconsolata-ExtraBold.ttf'),
        'Inconsolata-Medium':require('../../assets/fonts/Inconsolata-Medium.ttf'),
    });    

    return(
        <SafeAreaView>
                    <View style={styles.ReviewContainer}>
                        <Text style={styles.reviewText}>Reviews</Text>
                    <View style={styles.ReviewListContainer}>
                        <Text style={[{color:'gray'}]}>no reviews</Text>
                    </View> 
                    </View> 
{/*                         <View style={styles.cameraContainer}>
                        <Camera style={styles.camera} type={type}
                            faceDetectorSettings={{
                                mode: FaceDetector.FaceDetectorMode.fast,
                                detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                                runClassifications: FaceDetector.FaceDetectorClassifications.none,
                                tracking: true,
                            }}
                            onMountError={mountCameraError}
                            onFacesDetected={handleFacesDetected}
                            //onFacesDetected={onFacesDetected}
                        >    
                            {faces.length > 0 && (
                                faces.map((face) => (
                                    <Mask key={face.faceID} face={face} />
                                ))
                            )}
                        
                            <View style = {styles.buttonflip}>
                            <TouchableOpacity onPress={toggleCameraType}>
                                <MaterialCommunityIcons name = "camera-flip-outline" size = {responsiveWidth(10)} color={colors.textwhite}/>
                            </TouchableOpacity>
                            </View>
                            <View style={styles.buttonContainer}>
                                <Ionicons name = "radio-button-on" size = {responsiveWidth(26)} color={colors.textwhite}/>
                            </View>
                        </Camera>
                        </View>*/}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    ReviewContainer:{
        //top:responsiveHeight(2.45),
        justifyContent:'space-between',
        height: '100%',
        //marginHorizontal:20,
        //marginHorizontal:responsiveWidth(4.68),
    },
    ReviewListContainer:{
        marginTop:responsiveHeight(2),
        padding:responsiveHeight(2),
        flexDirection: 'row',
        //justifyContent: 'space-around',
        width: responsiveWidth(100),
        height: responsiveHeight(50),
        backgroundColor:colors.textblack,
        borderRadius: responsiveWidth(2.48),
    },
    reviewText:{
        marginHorizontal:responsiveWidth(4.68),
        fontFamily:'Inconsolata-Bold',
        color:colors.textwhite,
        //fontSize:20,
        fontSize:responsiveFontSize(2.5),
    },

});
export default Review;