import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as Joi from 'joi';

export class CreateLogTypeDto {
  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsOptional()
  public backgroundColor?: string;

  @IsString()
  @IsOptional()
  public color?: string;
}

export const CreateLogTypeSchema = Joi.object().keys({
  description: Joi.string().required(),
  backgroundColor: Joi.string().optional(),
  color: Joi.string().optional(),
});
