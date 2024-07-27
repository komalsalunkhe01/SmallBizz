// api.js
const BASE_URL = 'http://localhost:5000'; // Update this with your backend URL

export const fetchShopDataByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${category}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching shop data:', error);
    throw new Error('Failed to fetch shop data. Please try again later.');
  }
};
