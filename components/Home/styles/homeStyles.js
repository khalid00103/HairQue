import { StyleSheet } from 'react-native';
import colors from '../../../assets/colors/colors';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.textblack,
  },

  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(5.2),
    paddingVertical: responsiveHeight(1.25),
    alignItems: 'center',
  },

  menuwrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  textStyle: {
    fontSize: responsiveFontSize(2.7),
    fontFamily: 'Oswald-Medium',
    color: colors.textwhite,
  },

  titleswrapper: {
    flexDirection: 'row',
    marginTop: responsiveHeight(3.5),
    paddingHorizontal: responsiveWidth(5.2),
    alignItems: 'center',
  },

  titleTitle: {
    fontFamily: 'NotoSerif-Regular',
    fontSize: responsiveFontSize(3),
    color: colors.textwhite,
    paddingHorizontal: responsiveWidth(2.5),
  },

  titlesSubtitle: {
    fontFamily: 'Roboto-Regular',
    color: colors.textwhite,
    fontSize: responsiveFontSize(3),
  },

  currentdaymonth: {
    flexDirection: 'row',
    marginTop: responsiveHeight(1.25),
    paddingHorizontal: responsiveWidth(5.2),
    alignItems: 'center',
  },

  datetitle: {
    fontFamily: 'Inconsolata-Regular',
    color: colors.textwhite,
    fontSize: responsiveFontSize(1.79),
  },

  searchBox: {
    flexDirection: 'row',
    marginTop: responsiveHeight(6.25),
    paddingHorizontal: responsiveWidth(5.2),
    marginHorizontal: responsiveWidth(5.2),
    height: responsiveHeight(6.25),
    alignItems: 'center',
    borderRadius: responsiveWidth(3.5),
    backgroundColor: colors.cardbackground,
    borderColor: colors.border,
    borderWidth: responsiveWidth(0.25),
  },

  input: {
    flex: 1,
    fontSize: responsiveFontSize(2.1),
    marginLeft: responsiveWidth(2.5),
    color: colors.textwhite,
  },

  nearbySearchwrapper: {
    marginTop: responsiveHeight(6.25),
  },

  nearbytitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: responsiveFontSize(2.25),
    marginStart: responsiveWidth(5.2),
    color: colors.textgray,
  },
});
