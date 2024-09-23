import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import colors from '../../../assets/colors/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: colors.textblack,
  },

  ProfileWindow: {
    marginTop: responsiveHeight(2),
    display: 'flex',
    width: '95%',
    backgroundColor: colors.cardbackground,
    borderRadius: responsiveWidth(5),
  },

  iconWrapper: {
    margin: responsiveWidth(3.5),
    width: responsiveWidth(8),
    height: responsiveHeight(4),
    backgroundColor: 'rgba(9,9,9,0.5)',
    borderRadius: responsiveWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

  ProfileDetails: {
    flexDirection: 'row',
    marginLeft: responsiveWidth(3.5),
  },

  userFeather: {
    backgroundColor: colors.textwhite,
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(10),
    width: responsiveWidth(18),
    borderRadius: responsiveWidth(5),
  },

  UserData_sections: {
    marginBottom: responsiveWidth(3),
  },

  MobileNLogout: {
    fontSize: responsiveFontSize(2),
    fontFamily: 'Roboto-Regular',
    marginLeft: responsiveWidth(3),
    color: colors.textwhite,
    marginBottom: responsiveWidth(2),
  },
});

export default styles;
