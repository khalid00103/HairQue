import React, {useState} from 'react';
//import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors/colors.js';
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import{responsiveHeight,responsiveWidth,responsiveFontSize}from "react-native-responsive-dimensions";
//import categoriesData from '../../assets/data/categoriesData.js';

const Portfolio= React.memo(({ shop })=>{
    //const item = categoriesData.find(item => item.id === shop.storeId);
    //console.log(shop);
    const [fontsLoaded]= useFonts({
        'Oswald-Medium' : require('../../assets/fonts/Oswald-Medium.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'NotoSerif-Regular' : require('../../assets/fonts/NotoSerif-Regular.ttf'),
        'Inconsolata-Regular':require('../../assets/fonts/Inconsolata-Regular.ttf'),
        'Inconsolata-Bold':require('../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-ExtraBold':require('../../assets/fonts/Inconsolata-ExtraBold.ttf'),
        'Inconsolata-Medium':require('../../assets/fonts/Inconsolata-Medium.ttf'),
    }); 

    const profileImageKeys = Array.from({ length: 6 }, (_, index) => `profilePic${index + 1}`);

    // Chunk the keys into groups of 2 for each row
    const profileImageRows = profileImageKeys.reduce((acc, key, index) => {
        if (index % 2 === 0) {
            acc.push([key]);
        } else {
            acc[acc.length - 1].push(key);
        }
        return acc;
    }, []);   

    return (
        <SafeAreaView>
            {/*portfolio screen*/}
            <View style={styles.PortfolioContainer}>
                <Text style ={styles.portfolioText}>Portfolio</Text>

                {/*portfolio image list with 3 row and 2 column*/}
                <View style={styles.portfolioImageList}>
                            
                    {profileImageRows.map((rowKeys, rowIndex) => (
                        <View key={rowIndex} style={styles.portfolioImageRow}>
                            {rowKeys.map((key) => (
                                <View key={key} style={{backgroundColor: colors.textwhite,
                                    width: '35%',
                                    height: responsiveHeight(13),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                    borderRadius: responsiveWidth(2.48),}}>
                                    <Image
                                        source={{ uri: shop[key] }}
                                        style={{
                                            width: responsiveWidth(20),
                                            height: responsiveWidth(20), // You can adjust the height as needed
                                            resizeMode: 'contain',
                                            backgroundColor: colors.textwhite,
                                        }}
                                        onError={(error) => console.error(`Error loading image: ${error}`)}
                                    />
                                </View>
                            ))}
                        </View>
                    ))}

                    {/*portfolio image list ends*/}    
                </View>
            </View>
        </SafeAreaView>
    );
});
const styles = StyleSheet.create({
    PortfolioContainer:{
        justifyContent:'space-between',
        height: '100%',
        //top:responsiveHeight(2.45),
        //marginHorizontal:20,
        //marginHorizontal:responsiveWidth(4.68),
    },
    portfolioText:{
        marginHorizontal:responsiveWidth(4.68),
        fontFamily:'Inconsolata-Bold',
        color:colors.textwhite,
        //fontSize:20,
        fontSize:responsiveFontSize(2.5),
    },
    portfolioImageList:{
        marginTop:responsiveHeight(0),
        flexDirection: 'column',
        justifyContent: 'space-around',
        width: responsiveWidth(100),
        height: responsiveHeight(50),
        backgroundColor:colors.textblack,
        borderRadius: responsiveWidth(2.48),
    },
    portfolioImageRow:{
        paddingHorizontal: responsiveWidth(10),
        flexDirection: 'row',
        justifyContent: 'space-around',
        //backgroundColor: colors.textgray,
        width: responsiveWidth(100),
        height: responsiveHeight(13),
        alignItems: 'center',
        
    },
    portfolioImage:{
        backgroundColor: colors.textwhite,
        width: '35%',
        height: responsiveHeight(13),
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: responsiveWidth(2.48),
        //backgroundColor: colors.textblack,
    },
    ImageWidthHeight:{
        width:responsiveWidth(15),
        resizeMode: 'center',
        backgroundColor:colors.textwhite,
    },
});
export default Portfolio;