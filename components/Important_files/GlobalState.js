import React, { useEffect, useState, useContext } from 'react';
import { getDatabase, ref, get, set } from 'firebase/database';
import { useAuth } from '../Authentication/AuthContext'; // Replace with your actual authentication context import
import { encodeEmail } from '../../utils/encodeEmail';

const GlobalStateContext = React.createContext();

export const GlobalStateProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [likedItems, setLikedItems] = useState([]);
  const { user } = useAuth(); // Assuming you have an authentication context

  useEffect(() => {
    if (user) {
      fetchLikedStores();
    }
  }, [user]); // Only run when `user` is available

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      if (!user) return; // Ensure user is available

      try {
        const db = getDatabase();
        const encodedEmail = encodeEmail(user.email);
        const userRef = ref(db, `users/${encodedEmail}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();
          setPhoneNumber(userData.phoneNumber); // Sets the phone number
        } else {
          console.error("No user data found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user) fetchPhoneNumber(); // Only fetch if user is available
  }, [user]);

  const fetchLikedStores = async () => {
    if (!user) return; // Ensure user is available
    const db = getDatabase();
    const sanitizedEmail = user.email.replace(/\./g, ','); // Replace '.' with ',' in email
    const likedStoresRef = ref(db, `users/${sanitizedEmail}/LikedStores`);

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
    if (!user) return; // Ensure user is available
    const db = getDatabase();
    const sanitizedEmail = user.email.replace(/\./g, ',');
    const likedStoresRef = ref(db, `users/${sanitizedEmail}/LikedStores`);

    try {
      const snapshot = await get(likedStoresRef);
      let likedStoresData = [];

      if (snapshot.exists()) {
        // If the likedStores node exists, fetch its current data
        likedStoresData = snapshot.val();
      }

      let updatedLikedStoresData;

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
    <GlobalStateContext.Provider value={{ phoneNumber, setPhoneNumber, likedItems, toggleLikeStatus }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(GlobalStateContext);
};
