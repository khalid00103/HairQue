import { StyleSheet } from 'react-native';
import colors from '../../../assets/colors/colors';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const styles = StyleSheet.create({
  nearbylistwrapper: {
    marginTop: responsiveHeight(5),
    marginStart: responsiveWidth(5.2),
    //paddingStart: responsiveWidth(5.2),
    //backgroundColor:colors.textdarkgold,
  },
  categoryItemWrapper: {
    backgroundColor: colors.cardbackground,
    marginEnd: responsiveWidth(5.2),
    width: responsiveWidth(48.25),
    height: responsiveHeight(38.75),
    borderRadius: responsiveWidth(3.5),
    borderColor: colors.border,
    borderWidth: responsiveWidth(0.25),
  },
  categoryItemImage: {
    width: responsiveWidth(41.7),
    height: responsiveHeight(20.25),
    marginTop: responsiveHeight(1.25),
    marginLeft: responsiveWidth(3),
    borderRadius: responsiveWidth(3.5),
    borderColor: colors.border,
    borderWidth: responsiveWidth(0.25),
  },
  categoryItemName: {
    fontFamily: 'Inconsolata-Bold',
    color: colors.textwhite,
    fontSize: responsiveFontSize(1.78),
    marginTop: responsiveHeight(1.25),
    marginLeft: responsiveWidth(4.1),
  },
  lineStyle: {
    borderColor: colors.border,
    borderWidth: responsiveWidth(0.1),
    marginHorizontal: responsiveWidth(3),
    marginTop: responsiveHeight(2.6),
  },
  categorybookview: {
    alignItems: 'center',
    height: '41%',
    justifyContent: 'center',
  },
  categorybook: {
    fontFamily: 'Inconsolata-Bold',
    fontSize: responsiveFontSize(2.25),
    color: colors.textwhite,
  },
  categoryshopStatus: {
    flexDirection: 'row',
    marginTop: responsiveHeight(1.25),
    marginLeft: responsiveWidth(4.1),
  },
  categorystatus: {
    fontFamily: 'Inconsolata-ExtraBold',
    fontSize: responsiveFontSize(1.37),
    marginRight: responsiveWidth(3),
  },
  categorytime: {
    fontFamily: 'Inconsolata-ExtraBold',
    fontSize: responsiveFontSize(1.37),
    color: colors.textgray,
  },
  categoryrating: {
    flexDirection: 'row',
    position: 'absolute',
    top: responsiveHeight(2.55),
    marginLeft: responsiveWidth(5.2),
    width: responsiveWidth(19.4),
    height: responsiveHeight(3.25),
    backgroundColor: 'rgba(9,9,9,0.5)',
    borderRadius: responsiveWidth(1.65),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    fontFamily: 'Inconsolata-Regular',
    fontSize: responsiveFontSize(1.37),
    color: colors.textwhite,
  },
});

export default styles;
