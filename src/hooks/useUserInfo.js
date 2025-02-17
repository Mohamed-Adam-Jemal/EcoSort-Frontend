// useUserInfo.js
import { jwtDecode } from 'jwt-decode';

const useUserInfo = () => {
  const token = localStorage.getItem('access_token');

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

export default useUserInfo; // Export as a hook