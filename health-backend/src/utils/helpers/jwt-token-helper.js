import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { jwtSecretKey, refreshTokenSecretKey } from '../../config/index.js';

export function signAccessToken(userId) {
  const accessToken = sign(
    { _id: userId },
    jwtSecretKey,
    {
      expiresIn: '5m',
    }
  );
  return accessToken;
}
export function signRefreshToken(userId) {
  const refreshToken = sign(
    { _id: userId },
    refreshTokenSecretKey,
    {
      expiresIn: '10m',
    }
  );
  return refreshToken;
}
export function signConfirmCodeToken(userId, confirmCode) {
  const confirmCodeToken = sign(
    { _id: userId, code: confirmCode },
    jwtSecretKey,
    {
      expiresIn: '5m',
    }
  );
  return confirmCodeToken;
}
