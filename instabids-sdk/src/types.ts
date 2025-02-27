/**
 * Core types for the InstaBids SDK
 */

// Client configuration
export interface IClientConfig {
  apiKey: string;
  environment: 'production' | 'development';
  apiUrl?: string;
}

// Base service configuration
export interface IServiceConfig {
  baseUrl: string;
  apiKey: string;
}

// Base API response
export interface IApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// Pagination parameters
export interface IPaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

// Pagination response
export interface IPaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// User types
export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
  role: 'customer' | 'vendor' | 'admin';
  walletAddress?: string;
  isVerified: boolean;
  reputationScore?: number;
}

// Vendor profile
export interface IVendorProfile {
  userId: string;
  businessName?: string;
  description?: string;
  skills: string[];
  completedProjects: number;
  rating: number;
  serviceCategories: string[];
  portfolio: IPortfolioItem[];
  contactDetails: IContactDetails;
}

// Portfolio item
export interface IPortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  projectDate: string;
  tags: string[];
}

// Contact details
export interface IContactDetails {
  email: string;
  phone?: string;
  website?: string;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
}

// Blockchain transaction
export interface ITransaction {
  id: string;
  txHash: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  blockHeight?: number;
  confirmations?: number;
}

// Smart contract event
export interface ISmartContractEvent {
  contractAddress: string;
  eventName: string;
  blockNumber: number;
  transactionHash: string;
  logIndex: number;
  timestamp: string;
  returnValues: Record<string, any>;
}

// Error types
export class ApiError extends Error {
  code: string;
  details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 'AUTHENTICATION_ERROR', details);
    this.name = 'AuthenticationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 'NOT_FOUND', details);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class WalletError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 'WALLET_ERROR', details);
    this.name = 'WalletError';
  }
}
