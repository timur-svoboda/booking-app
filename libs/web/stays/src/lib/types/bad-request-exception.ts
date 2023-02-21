import { HttpException } from './http-exception';

export interface BadRequestException extends HttpException {
  message: {
    title: string[];
    description: string[];
  };
}
