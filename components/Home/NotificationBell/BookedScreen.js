import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './BookedScreenStyles';
import { getDatabase, ref, remove } from 'firebase/database';
import NotFoundAnimation from './NotFoundAnimation';
import { responsiveFontSize } from "react-native-responsive-dimensions";

const BookedScreen = ({ firstItem, setFirstItem, data, phone }) => {
    const onCancel = () => {
      if (firstItem && phone) {
        const dataId = data.length;
        const db = getDatabase();
        const userBookingsRef = ref(db, `bookings/${phone}/${dataId}`);
        
        remove(userBookingsRef)
          .then(() => {
            console.log('Booking canceled successfully.');
            setFirstItem(null);          
          })
          .catch((error) => {
            console.error('Error canceling booking:', error);
          });
      }
    };
  
    if (firstItem === null) {
      return <NotFoundAnimation />;
    }
  
    return (
      <View style={styles.Bookedcontainer}>
        <View style={styles.BookBox}>
          <Text style={styles.text}>Store : {firstItem.storeName}</Text>
          <Text style={styles.text}>Date  : {firstItem.date}</Text>
          <Text style={styles.text}>Time : {firstItem.time}</Text>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
            <Text style={[styles.text, { color: 'white', fontSize: 16 }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.noteText}>Please Note* you can only book one appointment in a week.</Text>
      </View>
    );
  };
  export default BookedScreen;