import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as Joi from 'joi';
import { LOG_TIME_PATTERN } from '../../../constants/regex.constant';
import { customTimeSpentValidator } from '../../../util/time-spent.util';

export class UpdateLogDto {
  @IsString()
  @IsNotEmpty()
  public _id: string;

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
  @IsOptional()
  public note?: string;
}

export const UpdateLogSchema = Joi.object().keys({
  _id: Joi.string().required(),
  workedOn: Joi.string().required(),
  timeSpentInPlainEnglish: Joi.string()
    .pattern(new RegExp(LOG_TIME_PATTERN))
    .custom(customTimeSpentValidator, 'Time spent validator')
    .required(),
  logType: Joi.string().required(),
  note: Joi.string().optional().empty(''),
});
