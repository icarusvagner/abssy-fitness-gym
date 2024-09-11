import jwt from "jsonwebtoken";
import config from "./config.util";
import { IUser } from "../models/result.model";
import executeQuery from "./executeQuery.util";

const signedJWT = (
  user: any,
  callback: (
    error: Error | null,
    accessToken: string | null,
    refreshToken: string | null,
  ) => void,
): void => {
  console.info("User %s", user[0]);
  console.info(
    `Attempting to sign tokens for ${user[0].username || user[0].email_address}`,
  );

  try {
    // Create the access token
    jwt.sign(
      {
        username: user[0].username,
        user_id: user[0].user_id,
        role: user[0]?.role,
      },
      config.server.token.accessSecret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: config.server.token.accessTokenExpireTime,
      },
      (error, accessToken) => {
        if (error) {
          callback(error, null, null);
        } else if (accessToken) {
          // Create the refresh token
          jwt.sign(
            {
              username: user[0].username,
              user_id: user[0].user_id,
              role: user[0]?.role,
            },
            config.server.token.refreshSecret,
            {
              issuer: config.server.token.issuer,
              algorithm: "HS256",
            },
            async (error, refreshToken) => {
              if (error) {
                callback(error, null, null);
              } else if (refreshToken) {
                // Insert the refresh token into the database
                await executeQuery(
                  `INSERT INTO refresh_token (username, refresh_token) VALUES('${user[0].username || user[0].email_address}','${refreshToken}')`,
                );
                callback(null, accessToken, refreshToken);
              }
            },
          );
        }
      },
    );
  } catch (error: any) {
    console.error(error.message, error);
    callback(error, null, null);
  }
};

export default signedJWT;
