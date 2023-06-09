// src/interfaces/axios-error.interface.ts
export interface IAxiosError {
  message?: string;
  response?: {
    statusText?: string;
    data?: {
      message?: string;
    };
  };
}