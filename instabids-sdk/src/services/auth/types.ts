/**
 * Authentication Service Types
 */

import { IUser } from '../../types';

/**
 * User authentication token
 */
export interface IAuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

/**
 * User with authentication token
 */
export interface IUserWithToken {
  user: IUser;
  token: IAuthToken;
}

/**
 * Login response
 */
export interface ILoginResponse extends IUserWithToken {
  isNewUser: boolean;
}

/**
 * User registration parameters
 */
export interface IRegisterParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'customer' | 'vendor';
  walletAddress?: string;
}

/**
 * User login parameters
 */
export interface ILoginParams {
  email: string;
  password: string;
}

/**
 * Wallet connection parameters
 */
export interface IConnectWalletParams {
  walletAddress: string;
  signature: string;
  message?: string;
}

/**
 * Social login providers
 */
export type SocialLoginProvider = 'google' | 'facebook' | 'twitter' | 'apple';

/**
 * Social login parameters
 */
export interface ISocialLoginParams {
  provider: SocialLoginProvider;
  token: string;
}

/**
 * JWT token payload
 */
export interface IJwtPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
