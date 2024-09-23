import { StyleSheet } from 'react-native';
import colors from '../../../../assets/colors/colors';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  Bookedcontainer: {
    flex: 1,
    backgroundColor: colors.textblack,
    paddingHorizontal: responsiveHeight(2),
  },
  BookBox: {
    height: "30%",
    width: "100%",
    justifyContent: 'space-between',
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    padding: responsiveHeight(2),
    backgroundColor: colors.calenderbackground,
    borderRadius: responsiveWidth(3),
  },
  text: {
    color: colors.textblack,
    fontSize: responsiveFontSize(2.2),
  },
  noteText:{
    color:colors.textwhite,
    fontSize: responsiveFontSize(1.7),
  },
  cancelBtn: {
    height: "25%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cardbackground,
    borderRadius: responsiveWidth(3),
  },
});

export default styles;
