import axios from 'axios';



 const verifyCredentials = async () => {
  try {
    const response = await axios.post('https://test.cashfree.com/api/v1/credentials/verify', {}, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.APP_ID,
        'x-api-secret': process.env.SECRET_KEY
      }
    });

    console.log('Verification Response:', response.data);
    return
  } catch (error) {
    if (error.response) {
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Status:', error.response.status);
    } else if (error.request) {
      console.error('Error Request Data:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
  }
};


export default verifyCredentials;