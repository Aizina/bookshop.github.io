import { NextApiRequest, NextApiResponse } from 'next';
import { ValidationResult } from '@/context/interfaces';

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 9;

const validateInput = (email: string, password: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { error: true, errorType: 'Email', message: 'Invalid email address.' };
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { error: true, errorType: 'Password', message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.` };
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    return { error: true, errorType: 'Password', message: `Password must be at most ${MAX_PASSWORD_LENGTH} characters long.` };
  }

  return { error: false, errorType: null, message: null };
};

const generateToken = (email: string): string => {
  return Buffer.from(`${email}:${Date.now()}`).toString('base64');
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      error: true,
      message: 'Method not allowed. Only POST requests are supported.',
    });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        errorType: 'Validation',
        message: 'Email and password are required.',
      });
    }
    const validationResult = validateInput(email, password);
    if (validationResult.error) {
      return res.status(400).json({
        error: true,
        errorType: validationResult.errorType,
        message: validationResult.message,
      });
    }
    const token = generateToken(email);

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
    });
  } catch (err) {
    console.error('Error during authentication:', err);
    return res.status(500).json({
      error: true,
      message: 'Internal server error.',
    });
  }
}
