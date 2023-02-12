import { IsNotEmpty, IsString } from 'class-validator';
import * as Joi from 'joi';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public newPassword: string;

  @IsString()
  @IsNotEmpty()
  public confirmNewPassword: string;
}

export const UpdatePasswordSchema = Joi.object().keys({
  password: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmNewPassword: Joi.string().required(),
});
