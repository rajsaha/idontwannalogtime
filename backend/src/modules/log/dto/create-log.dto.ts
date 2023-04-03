import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as Joi from 'joi';
import { LOG_TIME_PATTERN } from '../../../constants/regex.constant';
import { customTimeSpentValidator } from '../../../util/time-spent.util';

export class CreateLogDto {
  @IsString()
  @IsNotEmpty()
  public workedOn: string;

  @IsString()
  @IsNotEmpty()
  public timeSpentInPlainEnglish: string;

  @IsString()
  @IsNotEmpty()
  public logType: string;

  @IsString()
  @IsNotEmpty()
  public date: string;

  @IsString()
  @IsOptional()
  public note?: string;
}

export const CreateLogSchema = Joi.object().keys({
  workedOn: Joi.string().required(),
  timeSpentInPlainEnglish: Joi.string()
    .pattern(new RegExp(LOG_TIME_PATTERN))
    .custom(customTimeSpentValidator, 'Time spent validator')
    .required(),
  logType: Joi.string().required(),
  date: Joi.string()
    .pattern(/\d{4}-\d{2}-\d{2}/)
    .required(),
  note: Joi.string().optional().empty(''),
});
