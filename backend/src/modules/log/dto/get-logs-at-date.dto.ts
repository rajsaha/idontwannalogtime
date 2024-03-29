import { IsNotEmpty, IsString } from 'class-validator';
import * as Joi from 'joi';

export class GetLogsAtDateDto {
  @IsString()
  @IsNotEmpty()
  public date: string;
}

export const GetLogsAtDateSchema = Joi.string()
  .pattern(/\d{4}-\d{2}-\d{2}/)
  .required();
