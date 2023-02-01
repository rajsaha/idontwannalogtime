import { IsNotEmpty, IsString } from 'class-validator';
import * as Joi from 'joi';
import { LOG_TIME_PATTERN } from '../../constants/regex.constant';
import { customTimeSpentValidator } from '../../util/time-spent.util';

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
}

export const CreateLogSchema = Joi.object().keys({
  workedOn: Joi.string().required(),
  timeSpent: Joi.string()
    .pattern(new RegExp(LOG_TIME_PATTERN))
    .custom(customTimeSpentValidator, 'Time spent validator')
    .required(),
  logType: Joi.string().required(),
});
