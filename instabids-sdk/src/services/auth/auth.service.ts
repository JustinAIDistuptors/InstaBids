/**
 * Authentication Service Implementation
 */

import { IAuthService } from './';
import { ILoginParams, IRegisterParams, ILoginResponse, IUserWithToken } from './types';
import { IServiceConfig, AuthenticationError } from '../../types';
import { BaseService } from '../base.service';

export class AuthService extends BaseService implements IAuthService {
  constructor(config: IServiceConfig) {
    super(config);
  }

  /**
   * Register a new user
   */
  async register(params: IRegisterParams): Promise<IUserWithToken> {
    try {
      const response = await this.post<IUserWithToken>('/auth/register', params);
      this.setAuthToken(response.data.token.accessToken);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Log in an existing user
   */
  async login(params: ILoginParams): Promise<ILoginResponse> {
    try {
      const response = await this.post<ILoginResponse>('/auth/login', params);
      this.setAuthToken(response.data.token.accessToken);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Log out the current user
   */
  async logout(): Promise<boolean> {
    try {
      await this.post<{ success: boolean }>('/auth/logout', {});
      this.clearAuthToken();
      return true;
    } catch (error) {
      this.clearAuthToken();
      return false;
    }
  }

  /**
   * Get the current authenticated user
   */
  async getCurrentUser(): Promise<IUserWithToken | null> {
    try {
      const response = await this.get<IUserWithToken>('/auth/me');
      return response.data;
    } catch (error) {
      if (error instanceof AuthenticationError) {
        this.clearAuthToken();
        return null;
      }
      throw this.handleError(error);
    }
  }

  /**
   * Verify a user's email address using a verification token
   */
  async verifyEmail(token: string): Promise<boolean> {
    try {
      const response = await this.post<{ success: boolean }>('/auth/verify-email', { token });
      return response.data.success;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Initiate password reset process
   */
  async requestPasswordReset(email: string): Promise<boolean> {
    try {
      const response = await this.post<{ success: boolean }>('/auth/request-password-reset', { email });
      return response.data.success;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Reset a user's password using a reset token
   */
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
      const response = await this.post<{ success: boolean }>('/auth/reset-password', { token, newPassword });
      return response.data.success;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Connect a blockchain wallet to the user's account
   */
  async connectWallet(walletAddress: string, signature: string): Promise<IUserWithToken> {
    try {
      const response = await this.post<IUserWithToken>('/auth/connect-wallet', { walletAddress, signature });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Disconnect a blockchain wallet from the user's account
   */
  async disconnectWallet(): Promise<IUserWithToken> {
    try {
      const response = await this.post<IUserWithToken>('/auth/disconnect-wallet', {});
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
