/**
 * Base Service Class
 */
import { IServiceConfig, IApiResponse, ApiError, AuthenticationError, NotFoundError, ValidationError } from '../types';

export class BaseService {
  protected baseUrl: string;
  protected apiKey: string;
  protected authToken?: string;
  
  constructor(config: IServiceConfig) {
    this.baseUrl = config.baseUrl;
    this.apiKey = config.apiKey;
  }
  
  /**
   * Set authentication token for requests
   */
  protected setAuthToken(token: string): void {
    this.authToken = token;
  }
  
  /**
   * Clear authentication token
   */
  protected clearAuthToken(): void {
    this.authToken = undefined;
  }
  
  /**
   * Create request headers
   */
  protected createHeaders(): Headers {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey
    });
    
    if (this.authToken) {
      headers.append('Authorization', `Bearer ${this.authToken}`);
    }
    
    return headers;
  }
  
  /**
   * Handle API errors
   */
  protected handleError(error: any): Error {
    if (error instanceof ApiError) {
      return error;
    }
    
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.error?.message || 'An error occurred during the request';
      const code = data?.error?.code || 'UNKNOWN_ERROR';
      const details = data?.error?.details;
      
      switch (status) {
        case 401:
          return new AuthenticationError(message, details);
        case 404:
          return new NotFoundError(message, details);
        case 422:
          return new ValidationError(message, details);
        default:
          return new ApiError(message, code, details);
      }
    }
    
    return new ApiError(error.message || 'Network Error', 'NETWORK_ERROR');
  }
  
  /**
   * Make GET request
   */
  protected async get<T>(path: string, params?: Record<string, any>): Promise<IApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${path}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.createHeaders()
    });
    
    return this.handleResponse<T>(response);
  }
  
  /**
   * Make POST request
   */
  protected async post<T>(path: string, data: any): Promise<IApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: this.createHeaders(),
      body: JSON.stringify(data)
    });
    
    return this.handleResponse<T>(response);
  }
  
  /**
   * Make PUT request
   */
  protected async put<T>(path: string, data: any): Promise<IApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'PUT',
      headers: this.createHeaders(),
      body: JSON.stringify(data)
    });
    
    return this.handleResponse<T>(response);
  }
  
  /**
   * Make PATCH request
   */
  protected async patch<T>(path: string, data: any): Promise<IApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'PATCH',
      headers: this.createHeaders(),
      body: JSON.stringify(data)
    });
    
    return this.handleResponse<T>(response);
  }
  
  /**
   * Make DELETE request
   */
  protected async delete<T>(path: string): Promise<IApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers: this.createHeaders()
    });
    
    return this.handleResponse<T>(response);
  }
  
  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<IApiResponse<T>> {
    const data = await response.json();
    
    if (!response.ok) {
      const message = data?.error?.message || response.statusText;
      const code = data?.error?.code || 'API_ERROR';
      const details = data?.error?.details;
      
      throw this.handleError({
        response: {
          status: response.status,
          data
        }
      });
    }
    
    return {
      success: true,
      data: data as T
    };
  }
}
