import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const authenticate2FA = async (userId, code) => {
  // Implement 2FA verification logic here
  // This is a placeholder implementation
  console.log(`Verifying 2FA for user ${userId} with code ${code}`);
  return true;
};

export const authenticate3FA = async (userId, code, biometricData) => {
  // Implement 3FA verification logic here
  // This is a placeholder implementation
  console.log(`Verifying 3FA for user ${userId} with code ${code} and biometric data`);
  return true;
};