import jwt from "jsonwebtoken";
import config from "../../config";
// import tokenRepository from '../repositories/tokenRepository';

// Generate AccessToken
export const generateAccessToken = (payload: any) => {
  // expiresIn works in seconds if given in number
  const token = jwt.sign(payload, config.accessTokenSecretKey, {
    expiresIn: config.accessTokenExpireTime,
  });
  return token;
};

// Generate RefreshToken
export const generateRefreshToken = (payload: any) => {
 
    // expiresIn works in seconds if given in number
    const token = jwt.sign(payload, config.refreshTokenSecretKey, {
      expiresIn: config.refreshTokenExpireTime,
    });
    return token;
  
};

// Verify Access Token
export const verifyAccessToken = (accessToken: string) => {
  const verified = jwt.verify(accessToken, config.accessTokenSecretKey);

  return verified;
};


export const isTokenExpired = (unixTimestamp: number) => {
  // Get the current time in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);

  // Compare the given Unix timestamp with the current timestamp
  return unixTimestamp <= currentTimestamp;
};

// Verify Refresh Token
export const verifyRefreshToken = (refreshToken: string) => {
  const verified = jwt.verify(refreshToken, config.refreshTokenSecretKey);
  return verified;
};

