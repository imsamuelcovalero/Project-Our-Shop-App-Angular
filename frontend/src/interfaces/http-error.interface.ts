// src/interfaces/http-error.interface.ts
export interface IHttpError {
  message?: string;
  response?: {
    statusText?: string;
    data?: {
      message?: string;
    };
  };
}