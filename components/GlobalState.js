import React, { useEffect, useState, useContext } from 'react';
import { getDatabase, ref, get, set } from 'firebase/database';
import { useAuth } from './Authentication/AuthContext'; // Replace with your actual authentication context import

const GlobalStateContext = React.createContext();

export const GlobalStateProvider = ({ children }) => {
  const [likedItems, setLikedItems] = useState([]);
  const { user } = useAuth(); // Assuming you have an authentication context

  useEffect(() => {
    if (!user) {
      // If user is not available yet, wait for a second and check again
      setTimeout(() => {
        if (!user) {
          //console.log('User is still not available');
          return; // If user is still not available, return without fetching liked stores
        }
        fetchLikedStores();
      }, 1000);
    } else {
      fetchLikedStores();
    }
  }, [user]);

  const fetchLikedStores = async () => {
    const db = getDatabase();
    const likedStoresRef = ref(db, `users/${user?.phoneNumber}/likedStores`); // Use optional chaining (?.) in case user is null

    try {
      const snapshot = await get(likedStoresRef);
      if (snapshot.exists()) {
        const likedStoresData = snapshot.val();
        setLikedItems(likedStoresData);
      }
    } catch (error) {
      console.error('Error fetching liked stores:', error);
    }
  };

  
  const toggleLikeStatus = async (storeId) => {
    //console.log('in toggleLikeStatus');
    const db = getDatabase();
    const likedStoresRef = ref(db, `users/${user?.phoneNumber}/likedStores`);
  
    try {
      const snapshot = await get(likedStoresRef);
      let likedStoresData = [];
  
      if (snapshot.exists()) {
        // If the likedStores node exists, fetch its current data
        likedStoresData = snapshot.val();
      }
  
      let updatedLikedStoresData; // Define it here
  
      if (likedStoresData.includes(storeId)) {
        // Store is already liked, so unlike it
        updatedLikedStoresData = likedStoresData.filter(
          (likedStore) => likedStore !== storeId
        );
      } else {
        // Store is not liked, so like it
        updatedLikedStoresData = [...likedStoresData, storeId];
      }
  
      // Set or create the likedStores node with the updated data
      set(likedStoresRef, updatedLikedStoresData);
  
      // Update the global liked items state
      setLikedItems(updatedLikedStoresData);
    } catch (error) {
      console.error('Error toggling like status:', error);
    }
  };
  
  
  return (
    <GlobalStateContext.Provider value={{likedItems, toggleLikeStatus}}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
