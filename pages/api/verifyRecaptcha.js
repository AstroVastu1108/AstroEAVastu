import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { token } = req.body;

  try {
    const response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      new URLSearchParams({
        secret: process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SECRET_KEY,
        response: token,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const data = response.data;
    if (data.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: 'reCAPTCHA verification failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
}
