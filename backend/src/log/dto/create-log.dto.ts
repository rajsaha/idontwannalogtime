import { IsNotEmpty, IsString } from 'class-validator';
import * as Joi from 'joi';

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  public workedOn: string;

  @IsString()
  @IsNotEmpty()
  public timeSpent: string;

  @IsString()
  @IsNotEmpty()
  public logType: string;

  @IsString()
  @IsNotEmpty()
  public userId: string;
}

export const CreateLogSchema = Joi.object().keys({
  workedOn: Joi.string().required(),
  timeSpent: Joi.string().required(),
  logType: Joi.string().required(),
  userId: Joi.string().required(),
});
