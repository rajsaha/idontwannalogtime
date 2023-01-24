import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'joi';

export class JoiValidationException extends HttpException {
  constructor(error: ValidationError) {
    super(error, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
