import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image,TextInput, TouchableOpacity, StatusBar, Pressable} from 'react-native';
import { useFonts } from "expo-font";
import colors from '../../assets/colors/colors.js';
import {Feather, Octicons} from '@expo/vector-icons';
//import {Octicons} from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import{
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
}from "react-native-responsive-dimensions";

import { useAuth } from '../Authentication/AuthContext';
import StoreList from "./StoreList.js";

export default Home =({navigation}) => {
    //const { username } = route.params;
    const { user } = useAuth();
    //console.log(user);
    const [BellClicked, setBellClicked] = useState(false);

    // comt: render flatlist item for shop details
/*    const RenderCategoryItem = ({item, onPress, liked}) =>{
        return (
            
            <View style={styles.categoryItemWrapper}>
                <TouchableOpacity key = {item.id} onPress={() => navigation.navigate('ShopDetails', {item:item, option:1})}>
                    <Image source = {item.image} style ={styles.categoryItemImage}/>
                </TouchableOpacity>

                <TouchableOpacity key = {item.id} onPress={() => navigation.navigate('ShopDetails', {item:item, option:2})} style={styles.categoryrating}>
                    <FontAwesome name="star-half-full" size ={responsiveWidth(2.75)} color = {colors.textlightgold}/>
                    <Text style={styles.rating}>{item.rating}</Text>
                    <Text style={styles.rating}>({item.ratedcustomers})</Text>
                </TouchableOpacity>
               

                <View position= {'absolute'} top={20} right= {20}>
                    <TouchableOpacity onPress={() => onPress(item.id)}>
                        <MaterialCommunityIcons
                            name = {liked ? "heart" : "heart-outline"}
                            size = {responsiveWidth(6)}
                            color = {liked ? "red": "white"}     
                        />
                    </TouchableOpacity>
                </View>                
                <View style={styles.categoryshopStatus}>
                    <Text style={styles.categorystatus}>{item.status}</Text>
                    <Text style={styles.categorytime}>{item.timing}</Text>
                </View>
                <TouchableOpacity key = {item.id} onPress={() => navigation.navigate('ShopDetails', {item:item, option:1})}>
                    <Text style={styles.categoryItemName}>{item.shopName}</Text>
                </TouchableOpacity>
                <View style = {styles.lineStyle} />
                <TouchableOpacity key = {item.id} onPress={() => navigation.navigate('ShopDetails', {item:item, option:0})}>
                    <View style = {styles.categorybookview}>
                        <Text style={styles.categorybook}>Book Now</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }; */
    
    const [searchText, setSearchText] = useState('');
    // comt: for font library path
    const [fontsLoaded]= useFonts({
        'Oswald-Medium' : require('../../assets/fonts/Oswald-Medium.ttf'),
        'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
        'NotoSerif-Regular' : require('../../assets/fonts/NotoSerif-Regular.ttf'),
        'Inconsolata-Regular':require('../../assets/fonts/Inconsolata-Regular.ttf'),
        'Inconsolata-Bold':require('../../assets/fonts/Inconsolata-Bold.ttf'),
        'Inconsolata-ExtraBold':require('../../assets/fonts/Inconsolata-ExtraBold.ttf'),
        'Inconsolata-Medium':require('../../assets/fonts/Inconsolata-Medium.ttf'),
    }); 
    const [currentDate, setCurrentDate] = React.useState(moment());
    useEffect(() => {
        const updateDate = () => {
          setCurrentDate(moment());
        };
    
        const timer = setInterval(updateDate, 1000); // Update every second
        return () => clearInterval(timer); // Cleanup on component unmount
    }, []);
    
    if(!fontsLoaded){
        return null
    }
    const openCamera= () => {
        navigation.navigate('CameraScreen');
    };

    const openProfileScreen = () => {
        navigation.navigate('ProfileScreen');
      };


      
    return (
        <SafeAreaView>
        <StatusBar
            backgroundColor="#000000"
            barStyle={'default'}
        />
        <View style={styles.container}>
            {/*App Name & bell icon and menu icon*/}
            
            <View style={styles.headerWrapper}>
                <Text style = {styles.textStyle}>HairQue</Text>
                <View style={styles.menuwrapper}>
                <Pressable onPress={() => openCamera()}>
                    <Feather name="camera" size ={responsiveWidth(6.5)} color={colors.textwhite}/>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('NotificationScreen')}>
                <Octicons paddingHorizontal={responsiveWidth(6.5)}
                name = {"bell"} size = {responsiveWidth(6.5)} color = {BellClicked ? "white": "white"}/>
                </Pressable>
                <Pressable onPress={openProfileScreen}>
                    <Feather name ="menu" size ={responsiveWidth(6.5)} color={colors.textwhite}/>
                </Pressable>
                </View>     
            </View>
            

            {/*Hey username */}
            <View style={styles.titleswrapper}>
                <Text style={styles.titlesSubtitle}>hey,</Text>     
                <Text style={styles.titleTitle}>{user ? user.displayName : 'Guest'}</Text>
                <Image 
                    source={require('../../assets/images/waving-hand.png')}
                    //style={styles.handimage}
                    style = {{width: responsiveWidth(8.2), height:responsiveWidth(8.75),}}
                />
            </View>

            {/*today day month and date with search box*/}
            <View style={styles.currentdaymonth}>
                <Text style={styles.datetitle}>{currentDate.format("dddd, MMMM D")}</Text>
            </View>

            {/*Search box*/}
            <View style={styles.searchBox}>
                <Feather name = "search" size={responsiveWidth(6)} color = {colors.textwhite}/>
                <TextInput
                    style={styles.input}
                    onChangeText={(newText) => setSearchText(newText)}
                    placeholder="Search"
                    placeholderTextColor={colors.border}
                    value={searchText}
                />

            </View>

            {/* Nearby Barbershop and shop details*/}
            <View style={styles.nearbySearchwrapper}>
                <Text style={styles.nearbytitle} >Nearby BarberShop</Text>
                {/*Shop List
                <View style={styles.nearbylistwrapper}>
                    <FlatList  
                       // data = {categoriesData}
                        //keyExtractor= {(item) =>item.id}
                        //renderItem = {({item}) => (
                        //    <RenderCategoryItem
                        //        item={item}
                        //        onPress = {handleLikePress}
                        //        liked = {likedItems.includes(item.id)}
                        //    />
                        //)} 
                        //data={storeData}
                        //renderItem={renderStoreItem}
                        //keyExtractor={(item) => item.storeName}
                        //horizontal={true}
                    /> 
                </View>*/}
                <StoreList navigation={navigation} searchText={searchText}/>
            </View>
           
        </View>  
        </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: colors.textblack,
    },
    headerWrapper: {
        flexDirection:'row',
        justifyContent:'space-between',
        //paddingHorizontal:20,
        paddingHorizontal:responsiveWidth(5.2),
        //paddingVertical:10,
        paddingVertical:responsiveHeight(1.25),
        alignItems: 'center',

    },
    menuwrapper:{
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    textStyle:{
      //fontSize : 24,
      fontSize:responsiveFontSize(2.7),
      fontFamily: 'Oswald-Medium',
      color: colors.textwhite,
    },
    titleswrapper:{
        flexDirection:'row',
        //marginTop: 27,
        marginTop:responsiveHeight(3.5),
        //paddingHorizontal:20,
        paddingHorizontal:responsiveWidth(5.2),
        alignItems: 'center',
    },
    titleTitle:{
        fontFamily: 'NotoSerif-Regular',
        //fontSize: 32,
        fontSize:responsiveFontSize(3),
        color:colors.textwhite,
        //paddingHorizontal:10,
        paddingHorizontal:responsiveWidth(2.5),
    },
    titlesSubtitle:{
        fontFamily: 'Roboto-Regular',
        color:colors.textwhite,
        //fontSize: 32,
        fontSize:responsiveFontSize(3),
    },
    currentdaymonth:{
        flexDirection:'row',
        //marginTop: 10,
        marginTop: responsiveHeight(1.25),
        //paddingHorizontal:20,
        paddingHorizontal:responsiveWidth(5.2),
        alignItems: 'center',
    },
    datetitle:{
        fontFamily:'Inconsolata-Regular',
        color:colors.textwhite,
        //fontSize:16,
        fontSize:responsiveFontSize(1.79),
    },
    searchBox:{
        flexDirection:'row',
        //marginTop: 50,
        marginTop:responsiveHeight(6.25),
        //paddingHorizontal:20,
        paddingHorizontal:responsiveWidth(5.2),
        marginHorizontal:responsiveWidth(5.2),
        //height:50,
        height:responsiveHeight(6.25),
        alignItems: 'center',
        //borderRadius:15,
        borderRadius:responsiveWidth(3.5), 
        backgroundColor:colors.cardbackground,
        borderColor:colors.border,
        //borderWidth :1,
        borderWidth:responsiveWidth(0.25),
    },
    input: {
        flex: 1,
        //fontSize:18,
        fontSize:responsiveFontSize(2.1),
        //marginLeft:10,
        marginLeft:responsiveWidth(2.5),
        color:colors.textwhite,
      },

    nearbySearchwrapper:{
        //marginTop:50,
        marginTop:responsiveHeight(6.25),
    },
    nearbytitle:{
        fontFamily:'Roboto-Regular',
        //fontSize:20,
        fontSize:responsiveFontSize(2.25),
        marginStart:responsiveWidth(5.2),
        color: colors.textgray,
    },
});