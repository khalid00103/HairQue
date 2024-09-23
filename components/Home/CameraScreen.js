import React, { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView,Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import {MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import colors from '../../assets/colors/colors.js';
import Mask from '../Important_files/Mask.js';
import {responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions';
import { useIsFocused } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import ViewShot from 'react-native-view-shot';
import { generate } from 'react-native-image-generator';
import styles from './styles/cameraScreenStyles';
//import ImagesMerge from 'react-native-merge-two-image';
//import ImagesCombineLibrary from 'react-native-images-combine';

//import { connectFirestoreEmulator } from 'firebase/firestore';

function handleUnhandledRejection(event) {
  console.error('Unhandled Promise Rejection:', event.reason);
  // Handle or log the rejection here as needed
}

//window.addEventListener('unhandledrejection', handleUnhandledRejection);
export default CameraScreen = ({ navigation }) => {

  const [isCameraReady, setIsCameraReady] = useState(false);
  const { width, height } = Dimensions.get('window');
  const screenAspectRatio = width / height;
  const [faces, setFaces] = useState([]);
  const [type, setType] = useState(CameraType.front);
  const [selectedImage, setSelectedImage] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const viewShotRef = useRef(null);
  
  useEffect(() => {
    const handleUnhandledRejection = (error, isPromise) => {
      console.error('Unhandled Promise Rejection:', error, isPromise);
      // Handle or log the rejection here as needed
    };

    ErrorUtils.setGlobalHandler(handleUnhandledRejection);

    return () => {
      // Remove the global handler when the component unmounts
      ErrorUtils.setGlobalHandler(null);
    };
  }, []);

  const handleCameraReady = () => {
    setIsCameraReady(true);
    console.log("Camera is ready");
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      if (cameraRef.current) {
        cameraRef.current.pausePreview();
      }
    }
  }, [isFocused]);

  const [capturedImageUri, setCapturedImageUri] = useState(null);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const cameraRef = useRef(null);
  
  if (!permission) {
    // Camera permissions are still loading
    return <View style={{ backgroundColor: colors.textdarkgold }}></View>;
  }
  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ textAlign: 'center' }}>We need your permission to access the camera</Text>
      <Button onPress={requestPermission} title="grant permission" /></View>;
  }

  function toggleCameraType() {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const handleFacesDetected = ({ faces }) => {
    try {
      if (faces.length > 0) {
        console.log('faces:', faces);
        setFaces(faces);
      } else {
        // No faces detected, clear the faces state
        setFaces([]);
      }
    } catch (error) {
      console.error('Error in handleFacesDetected:', error);
      // You can log or handle the error here as needed
    }
  };
  

  
  const faceDetectionError = (error) => {
    console.log(error);
  }

  const mountCameraError = (error) => {
    console.log('Camera mount error:', error);
  // Handle the error condition, e.g., show an error message to the user
  };

  const handleImageSelection = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const closeCamera = () => {
    navigation.goBack();
  };
  

  const handleCaptureImage = async () => {
    if (cameraRef.current) {
      try {
        // Capture the camera frame
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });

        setShowDownloadButton(true);
        setShowCloseButton(true);
        await cameraRef.current.pausePreview();

        // Extract the mask view from Mask.js (You need to implement this logic)
        const maskView = getMaskView();

        // Combine the captured image and the mask view
        const combinedImage = await generate(
          [
            {
              uri: photo.uri, // Use the 'uri' property from the captured image
              width: 200, // Adjust as needed
              height: 300, // Adjust as needed
              x: 0,
              y: 0,
            },
            {
              uri: maskView.uri, // Use the 'uri' property from the mask view
              width: 200, // Adjust as needed
              height: 300, // Adjust as needed
              x: 0,
              y: 0,
            },
          ],
          {
            filename: 'result.png',
            width: 200, // Adjust as needed
            height: 300, // Adjust as needed
          }
        );

        console.log("combined Image:", combinedImage);

        // Set the captured image URI
        setCapturedImageUri(combinedImage);

        // Stop camera preview
      } catch (error) {
        console.log('Error capturing image:', error);
      }
    }
  };
  
  const getMaskView = () => {
    console.log('getMaskView function executed'); // Log the start of the function
  
    const maskView = (
      <>
        {/* Render the masks over the faces */}
        {faces.map((face) => (
          <Mask key={face.faceID} face={face} selectedImage={selectedImage} />
        ))}
      </>
    );
    
    console.log('maskView:', maskView); // Log the value of maskView
    return maskView;
  };

  const combineImages = async (image1Uri, image2Uri) => {
    const image1 = new Image();
    image1.src = image1Uri;
    const image2 = new Image();
    image2.src = image2Uri;

    await Promise.all([image1, image2]);

    // Use the container width and height as the combined image dimensions
    const width = "100%"; // Replace 'containerWidth' with the actual width
    const height = "100%"; // Replace 'containerHeight' with the actual height

    // Create a canvas to draw the combined image
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    // Draw the background image (image1) onto the canvas
    context.drawImage(image1, 0, 0, width, height);

    // Draw the overlay image (image2) onto the canvas
    context.drawImage(image2, 0, 0, width, height);

    // Convert the canvas to a data URI
    const combinedImageUri = canvas.toDataURL('image/jpeg');

    return combinedImageUri;
  };

  const handleDownloadImage = async () => {
    if (capturedImageUri) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
  
      if (status === 'granted') {
        try {
          await MediaLibrary.createAssetAsync(capturedImageUri);
          setShowDownloadButton(false);
        } catch (error) {
          console.log('Error saving image:', error);
        }
      } else {
        console.log('MEDIA_LIBRARY permission denied.');
      }
    }
  };
    
  const handleClose = () => {
    setShowDownloadButton(false);
    setShowCloseButton(false);
    setCapturedImageUri(null);
    
    if (cameraRef.current) {
      cameraRef.current.resumePreview();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraView}>
        <ViewShot style = {[{height:'100%'}]}ref={viewShotRef} options={{ format: 'jpg', quality: 0.8, captureMode: 'mount'}}>
          <Camera
            ref={cameraRef}
            style={[styles.camera]}
            //ratio = '1:1'
            onCameraReady={handleCameraReady}
            type={type}
            onFacesDetected={handleFacesDetected}
            onFaceDetectionError = {faceDetectionError}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              tracking: true,
            }}
            onMountError={mountCameraError}
          >
          <TouchableOpacity style={styles.closeCamera} onPress={closeCamera}>
            <Ionicons name="close" size={responsiveWidth(10)} color={colors.textwhite} />
          </TouchableOpacity>

          {isCameraReady && faces.length > 0 && (
            <>
              {/* Render the masks over the faces */}
              {faces.map((face) => (
                <Mask key={face.faceID} face={face} selectedImage={selectedImage} />
              ))}
            </>
          )}
          </Camera>
        </ViewShot>

        {showDownloadButton && (
          <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadImage}>
            <MaterialCommunityIcons name="download" size={responsiveWidth(8)} color={colors.textwhite} />
          </TouchableOpacity>
        )}

        {showCloseButton && (
          <TouchableOpacity style={styles.close} onPress={handleClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        )}

      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.buttonflip} onPress={toggleCameraType}>
          <MaterialCommunityIcons
            name="camera-flip-outline"
            size={responsiveWidth(10)}
            color={colors.textwhite}
          />
        </TouchableOpacity>

        <View style={styles.scrollviewContainer}>
          <ScrollView horizontal contentContainerStyle={styles.filtersContainer} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => handleImageSelection(require('../../assets/images/hair6.png'))}
            >
              <Image source={require('../../assets/images/hair6.png')} style={styles.filterImage} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => handleImageSelection(require('../../assets/images/hair7.png'))}
            >
              <Image source={require('../../assets/images/hair7.png')} style={styles.filterImage} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => handleImageSelection(require('../../assets/images/hair8.png'))}
            >
              <Image source={require('../../assets/images/hair8.png')} style={styles.filterImage} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => handleImageSelection(require('../../assets/images/hair9.png'))}
            >
              <Image source={require('../../assets/images/hair9.png')} style={styles.filterImage} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => handleImageSelection(require('../../assets/images/hair2.png'))}
            >
              <Image source={require('../../assets/images/hair2.png')} style={styles.filterImage} />
            </TouchableOpacity>
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.radioButtonContainer} onPress={handleCaptureImage}>
          <Ionicons name="radio-button-on" size={responsiveWidth(26)} color={colors.textwhite} />
        </TouchableOpacity>
      </View>
    </View>
  );
};