// utils/encodeEmail.js
export const encodeEmail = (email) => {
    return email.replace(/\./g, ',');
  };
  
  export const decodeEmail = (encodedEmail) => {
    return encodedEmail.replace(/,/g, '.');
  };
  