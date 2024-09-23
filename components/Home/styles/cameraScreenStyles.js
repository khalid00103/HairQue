// cameraScreenStyles.js
import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import colors from '../../../assets/colors/colors.js';

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: 'black',
  },
  cameraView: {
    height: "85%",
    width: "100%",
    borderRadius: responsiveWidth(6.65),
    overflow: 'hidden',
  },
  camera: {
    height: "100%",
    width: "100%",
  },
  closeCamera: {
    position: 'absolute',
    top: responsiveHeight(2),
    right: responsiveWidth(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButton: {
    position: 'absolute',
    bottom: responsiveHeight(2),
    left: responsiveWidth(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    position: 'absolute',
    backgroundColor: colors.cardbackground,
    height: responsiveHeight(4),
    bottom: responsiveHeight(2),
    left: responsiveWidth(12.5),
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: responsiveWidth(5),
  },
  closeText: {
    fontSize: responsiveFontSize(2),
    color: colors.textwhite,
  },
  bottomContainer: {
    height: "15%",
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.textblack,
    justifyContent: 'center',
    borderRadius: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonflip: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: responsiveWidth(20),
    width: responsiveWidth(10),
    aspectRatio: 1,
  },
  scrollviewContainer: {
    marginStart: responsiveWidth(60),
    zIndex: 1,
  },
  filtersContainer: {
    alignItems: 'center',
  },
  filterButton: {
    marginHorizontal: responsiveWidth(2),
    borderRadius: responsiveWidth(10),
    justifyContent: 'center',
    alignItems: 'center',
    height: responsiveHeight(9),
    width: responsiveWidth(18),
    borderWidth: responsiveWidth(1.25),
    backgroundColor: colors.textwhite,
    borderColor: colors.textwhite,
    zIndex: 1,
  },
  filterImage: {
    width: 40,
    height: 40,
  },
  radioButtonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(2),
    zIndex: 0,
  },
});

export default styles;
