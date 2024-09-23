// shopDetailsStyles.js
import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import colors from '../../../assets/colors/colors';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        backgroundColor: colors.textblack,
    },
    shopdetailWrapper: {
        width: responsiveWidth(100),
        height: responsiveHeight(31.5),
        justifyContent: 'flex-end',
    },
    shopdetailimage: {
        width: '100%',
        height: '100%',
    },
    iconWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        margin: responsiveWidth(5.5),
        width: responsiveWidth(8),
        height: responsiveHeight(4),
        backgroundColor: 'rgba(9,9,9,0.5)',
        borderRadius: responsiveWidth(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailshop: {
        flexDirection: 'column',
        position: 'absolute',
        paddingHorizontal: responsiveWidth(4.68),
        width: '100%',
        height: responsiveHeight(9.8),
        backgroundColor: 'rgba(9,9,9,0.5)',
        borderTopLeftRadius: responsiveWidth(3.5),
        borderTopRightRadius: responsiveWidth(3.5),
    },
    shopNameHeart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailShopName: {
        fontFamily: 'Inconsolata-Regular',
        color: colors.textwhite,
        fontSize: responsiveFontSize(3.1),
    },
    detailrating: {
        position: 'absolute',
        flexDirection: 'row',
        top: responsiveWidth(9.3),
        marginHorizontal: responsiveWidth(4.68),
        alignItems: 'center',
    },
    rating: {
        color: colors.textwhite,
        fontSize: responsiveFontSize(1.6),
        marginLeft: responsiveWidth(0.5),
    },
    ratedcustomer: {
        color: colors.textwhite,
        fontSize: responsiveFontSize(1.6),
        marginLeft: responsiveWidth(0.5),
    },
    customerreview: {
        fontFamily: 'Inconsolata-Bold',
        fontSize: responsiveFontSize(2.2),
        color: colors.textdarkgold,
        marginLeft: responsiveWidth(0.5),
    },
    blackcontainer: {
        marginTop: responsiveWidth(-3.15),
        width: '100%',
        height: responsiveHeight(69.65),
        justifyContent: 'space-between',
        borderTopLeftRadius: responsiveWidth(4.5),
        borderTopRightRadius: responsiveWidth(4.5),
        backgroundColor: colors.textblack,
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: responsiveWidth(6),
        marginHorizontal: responsiveWidth(4.68),
    },
    Optionsetting: {
        backgroundColor: colors.cardbackground,
        borderColor: colors.border,
        borderWidth: responsiveWidth(0.25),
        width: responsiveWidth(27),
        height: responsiveHeight(4.7),
        borderRadius: responsiveWidth(2.4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookingText: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: responsiveFontSize(2),
        color: colors.textwhite,
    },
    bookingTextSelected: {
        fontFamily: 'Inconsolata-Medium',
        fontSize: responsiveFontSize(2),
        color: colors.textblack,
    },
    OptionSelected: {
        backgroundColor: colors.textwhite,
        borderColor: colors.border,
        borderWidth: responsiveWidth(0.25),
        width: responsiveWidth(27),
        height: responsiveHeight(4.7),
        borderRadius: responsiveWidth(2.4),
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionChangestoBooking: {
        height: responsiveHeight(58.90),
        justifyContent: 'space-between',
        paddingTop: responsiveHeight(2.45),
        backgroundColor: colors.cardbackground,
        borderTopLeftRadius: responsiveWidth(3.5),
        borderTopRightRadius: responsiveWidth(3.5),
    },
});

export default styles;
