// utils/getUserInfo.js
import jwtDecode from 'jwt-decode';

export const getUserInfo = () => {
  const token = localStorage.getItem('access_token'); // Use the correct key for your token

  if (token) {
    try {
      const decoded = jwtDecode(token);
      return decoded; // Return the decoded user information
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  } else {
    console.error('No token found');
    return null;
  }
};