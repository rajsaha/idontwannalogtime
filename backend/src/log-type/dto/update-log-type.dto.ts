import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as Joi from 'joi';

export class UpdateLogTypeDto {
  @IsString()
  @IsNotEmpty()
  public _id: string;

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

export const UpdateLogTypeSchema = Joi.object().keys({
  _id: Joi.string().required(),
  description: Joi.string().required(),
  backgroundColor: Joi.string().optional(),
  color: Joi.string().optional(),
});
