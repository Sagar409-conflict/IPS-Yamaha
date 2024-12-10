import { File as MulterFile } from 'multer';
export interface CustomError extends Error {
  statusCode?: number; // Optional custom status code
  details?: string; // Additional custom details
}

export interface UploadedFile extends MulterFile {
  path: string; // Explicitly declare the path property
}

export type UploadedFiles = {
  [fieldName: string]: UploadedFile[] | UploadedFile; // Adjusted type
};