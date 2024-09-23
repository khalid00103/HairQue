import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from './styles/HistoryScreenStyles';
import NotFoundAnimation from './NotFoundAnimation';
const HistoryScreen = ({ remainingItems, phone }) => {
    if (remainingItems.length === 0) {
      return <NotFoundAnimation />;
    }
  
    return (
      <View style={styles.Historycontainer}>
        <FlatList
          data={remainingItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.HistoryBox}>
              <Text style={styles.text}>Store : {item.storeName}</Text>
              <Text style={styles.text}>Date  : {item.date}</Text>
              <Text style={styles.text}>Time : {item.time}</Text>
            </View>
          )}
        />
      </View>
    );
  };
  
  export default HistoryScreen;
