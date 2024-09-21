import { StyleSheet } from 'react-native';
import colors from '../../../assets/colors/colors';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  Historycontainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.textblack,
    paddingTop: responsiveHeight(2),
  },
  HistoryBox: {
    height: responsiveHeight(12),
    width: responsiveWidth(90),
    justifyContent: 'space-evenly',
    marginBottom: responsiveHeight(2),
    paddingHorizontal: responsiveHeight(2),
    backgroundColor: colors.calenderbackground,
    borderRadius: responsiveWidth(3),
  },
  text: {
    color: colors.textblack,
    fontSize: responsiveFontSize(2.2),
  },
});

export default styles;
