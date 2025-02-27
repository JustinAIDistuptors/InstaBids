/**
 * InstaBids TypeScript SDK
 * Main entry point for the SDK
 */

import { IAuthService } from './services/auth';
import { IBidService } from './services/bids';
import { IProjectService } from './services/projects';
import { IUserService } from './services/users';
import { IWalletService } from './services/wallet';
import { INotificationService } from './services/notifications';
import { AuthService } from './services/auth/auth.service';
import { BidService } from './services/bids/bid.service';
import { ProjectService } from './services/projects/project.service';
import { UserService } from './services/users/user.service';
import { WalletService } from './services/wallet/wallet.service';
import { NotificationService } from './services/notifications/notification.service';
import { IClientConfig } from './types';

export class InstaBidsClient {
  public readonly auth: IAuthService;
  public readonly bids: IBidService;
  public readonly projects: IProjectService;
  public readonly users: IUserService;
  public readonly wallet: IWalletService;
  public readonly notifications: INotificationService;

  constructor(config: IClientConfig) {
    // Initialize base configuration and shared services
    const { apiKey, environment, apiUrl } = config;
    const baseUrl = apiUrl || (environment === 'production' 
      ? 'https://api.instabids.com/v1'
      : 'https://dev-api.instabids.com/v1');
    
    // Initialize services
    this.auth = new AuthService({ baseUrl, apiKey });
    this.bids = new BidService({ baseUrl, apiKey });
    this.projects = new ProjectService({ baseUrl, apiKey });
    this.users = new UserService({ baseUrl, apiKey });
    this.wallet = new WalletService({ baseUrl, apiKey });
    this.notifications = new NotificationService({ baseUrl, apiKey });
  }
}

// Export types and interfaces
export * from './types';
export * from './services/auth/types';
export * from './services/bids/types';
export * from './services/projects/types';
export * from './services/users/types';
export * from './services/wallet/types';
export * from './services/notifications/types';

// Export default client
export default InstaBidsClient;
