import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // Check if the user's display name has changed
        if (user && user.displayName !== firebaseUser.displayName) {
          setUser(firebaseUser); // Update the user object with the latest data
        } else {
          setUser(firebaseUser);
          setPhoneNumber(firebaseUser.phoneNumber);
        }
      } else {
        setUser(null);
        setPhoneNumber(null);
      }
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, phoneNumber }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
