/**
 * Authentication Service Interface
 */

import { ILoginResponse, IRegisterParams, ILoginParams, IUserWithToken } from './types';

export interface IAuthService {
  /**
   * Register a new user
   * @param params User registration parameters
   * @returns Newly created user with authentication token
   */
  register(params: IRegisterParams): Promise<IUserWithToken>;
  
  /**
   * Log in an existing user
   * @param params User login parameters
   * @returns User with authentication token
   */
  login(params: ILoginParams): Promise<ILoginResponse>;
  
  /**
   * Log out the current user
   * @returns True if logout was successful
   */
  logout(): Promise<boolean>;
  
  /**
   * Get the current authenticated user
   * @returns Current user if authenticated, null otherwise
   */
  getCurrentUser(): Promise<IUserWithToken | null>;
  
  /**
   * Verify a user's email address using a verification token
   * @param token Email verification token
   * @returns True if verification was successful
   */
  verifyEmail(token: string): Promise<boolean>;
  
  /**
   * Initiate password reset process
   * @param email User's email address
   * @returns True if reset email was sent successfully
   */
  requestPasswordReset(email: string): Promise<boolean>;
  
  /**
   * Reset a user's password using a reset token
   * @param token Password reset token
   * @param newPassword New password to set
   * @returns True if password was reset successfully
   */
  resetPassword(token: string, newPassword: string): Promise<boolean>;
  
  /**
   * Connect a blockchain wallet to the user's account
   * @param walletAddress Blockchain wallet address
   * @param signature Signed message to verify wallet ownership
   * @returns Updated user with connected wallet
   */
  connectWallet(walletAddress: string, signature: string): Promise<IUserWithToken>;
  
  /**
   * Disconnect a blockchain wallet from the user's account
   * @returns Updated user without connected wallet
   */
  disconnectWallet(): Promise<IUserWithToken>;
}

export * from './types';
