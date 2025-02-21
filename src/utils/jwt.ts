import jwt, { JwtPayload } from "jsonwebtoken";

interface User {
  id: string;
  username: string;
  [key: string]: any;
}

interface JwtOptions {
  secrete: string;
}

const DEFAULT_OPTIONS: JwtOptions = {
  secrete: process.env.JWT_SECRET as string,
};

const generateJWT = (
  user: any, // add user type
  options: JwtOptions = DEFAULT_OPTIONS
): string => {
  return jwt.sign(
    {
      ...user,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 * 365,
    },
    options.secrete
  );
};

const verifyJWT = (
  token: string,
  options: JwtOptions = DEFAULT_OPTIONS
): JwtPayload | string => {
  return jwt.verify(token, options.secrete);
};

const invalidateToken = (
  token: string,
  options: JwtOptions = DEFAULT_OPTIONS
): string => {
  const decoded = jwt.decode(token) as JwtPayload;
  decoded.exp = Math.floor(Date.now() / 1000) - 1;
  return jwt.sign(decoded, options.secrete);
};

export { generateJWT, verifyJWT, invalidateToken };
