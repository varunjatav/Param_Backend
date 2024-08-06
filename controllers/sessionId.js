export const sessionId = async (req, res) => {
    try {
      const response = await axios.post('https://sandbox.cashfree.com/pg/orders', {
        // Replace with actual request payload
        order_id: 'order_' + new Date().getTime(),
        order_amount: 100, // Example amount
        customer_email: 'example@example.com',
        customer_phone: '9999999999',
        return_url: 'https://your-return-url.com',
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.APP_ID,
          'x-api-secret': process.env.SECRET_KEY
        }
      });
  
      const paymentSessionId = response.data.paymentSessionId;
      res.json({ paymentSessionId });
    } catch (error) {
      console.error('Error generating payment session ID:', error);
      res.status(500).send('Error generating payment session ID');
    }
}