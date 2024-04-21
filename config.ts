import dotenv from "dotenv";
dotenv.config({ path: ".env" });

// Env file configuration
function config(Env: any) {
  return {
    port: Env?.PORT,
    databaseUrl: Env?.DATABASE_URL,
    accessTokenSecretKey: Env?.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenSecretKey: Env?.REFRESH_TOKEN_SECRET_KEY,
    accessTokenExpireTime: 24 * 60 * 60, // in seconds
    refreshTokenExpireTime: 10 * 24 * 60 * 60, // in seconds

  };
}

export default {
  ...config(process.env),
};