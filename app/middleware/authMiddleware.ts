import { NextFunction, Response } from "express";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../helpers/tokenHelper";
import { CustomError } from "../models/customError";

export const isAuthenticated = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    // Fetch Token from Header
    const accessTokenFromCookie = req?.headers?.authorization?.split(" ")[1];
    const refreshTokenFromCookie = req?.headers?.refreshtoken?.split(' ')[1];

    // Check if the access token is missing
    if (!accessTokenFromCookie || !refreshTokenFromCookie) {
      const error = new CustomError(
        401,
        "Authentication Error:  Please log in again to continue using the app."
      );
      return next(error);
    }

    // Verify the access token
    const verifiedAccessToken: any = verifyAccessToken(accessTokenFromCookie);
    // const verifiedRefreshToken: any = verifyRefreshToken(refreshTokenFromCookie);

    // Check if the access token is invalid
    if (!verifiedAccessToken) {
      const error = new CustomError(
        401,
        "Authentication Error: Invalid access token"
      );
      return next(error);
    }

    // Attach user information to the request
    req.user = {
      id: verifiedAccessToken.id,
      email: verifiedAccessToken.email,
      role:verifiedAccessToken.role
    };

    // User is authenticated
    next();
  } catch (err: any) {
    if (err.name == 'TokenExpiredError') {
			const accessToken = req?.headers?.authorization?.split(' ')[1];
			const refreshToken = req?.headers?.refreshtoken?.split(' ')[1];
			refreshAccessToken(accessToken, refreshToken)
				.then((data: any) => {
					// req.session.accessToken = data?.newAccessToken;
					// req.session.refreshToken = data?.newRefreshToken;
          const verifiedAccessToken: any = verifyAccessToken(data?.newAccessToken);

          req.user = {
            id: verifiedAccessToken.id,
            email: verifiedAccessToken.email,
            role:verifiedAccessToken.role
          };
					next();
				})
				.catch((err) => {
					next(err);
				});
		} else {
			next(err);
		}
    next(err);
  }

  
};


export const refreshAccessToken = async (
	accessToken: string,
	refreshToken: string
) => {
	try {
		// Check if the refresh token is valid
		const verified: any = verifyRefreshToken(refreshToken);

		if (!verified) {
			const error = new CustomError(401, 'Invalid refresh token');
			throw error;
		}

		// Generate new access token
		const newAccessToken = generateAccessToken({
			id: verified?.id,
			email: verified?.email,
		});

		// Generate new refresh token
		const newRefreshToken = generateRefreshToken({
			id: verified?.id,
			email: verified?.email,
		});

		return { newAccessToken, newRefreshToken };
	} catch (err: any) {
		if (err.name == 'TokenExpiredError') {
			const error = new CustomError(401, 'Token expired,Please log in again');
			throw error;
		} else {
			throw err;
		}
	}
};