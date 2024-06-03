import executeQuery from "./executeQuery.util";
import config from "./config.util";
import jwt from "jsonwebtoken";

const resetToken = (
    username: any,
    callback: (error: Error | null, reset_token: string | null | undefined) => void,
): void => {
  console.info(`Attempting to sign for reset token to ${username}`);

  try {
    jwt.sign(
      { username },
      config.server.token.resetAccessSecret,
      {
        issuer: config.server.token.issuer,
        algorithm: "HS256",
        expiresIn: config.server.token.resetTokenExpireTime,
      },
      (error, reset_token) => {
        if (error) {
          callback(error, null);
        }
        callback(null, reset_token);
      }
    );
  } catch (error: any) {
    console.error('Signing token error at rest token: ', error);
    callback(error, null);
  }
}

export default resetToken;
