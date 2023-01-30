import * as Joi from 'joi';
import { LOG_TIME_PATTERN } from '../constants/regex.constant';

export function calculateMinutes(regexArray: Array<string>): number {
  let minutes = 0;

  // Early return if minute appear earlier in the array
  if (regexArray[2].charAt(0) === 'm') {
    return minutes + parseInt(regexArray[1]);
  }

  // Tally minutes if value at index not undefined
  if (regexArray[4] !== undefined) {
    minutes += parseInt(regexArray[4]);
  }

  // Convert hours into minutes
  // Example: 2 --> 120
  if (regexArray[1]) {
    minutes += parseInt(regexArray[1]) * 60;
  }

  return minutes;
}

export const customTimeSpentValidator: Joi.CustomValidator = (
  value: string,
  helpers: Joi.CustomHelpers,
) => {
  const regexArray: Array<string> = LOG_TIME_PATTERN.exec(value);

  if (regexArray[2].charAt(0) === 'm') {
    if (parseInt(regexArray[2]) > 60) {
      throw new Error('Minutes cannot be more than 60');
    }
  }

  if (regexArray[4] !== undefined) {
    if (parseInt(regexArray[4]) > 60) {
      throw new Error('Minutes cannot be more than 60');
    }
  }

  if (parseInt(regexArray[1]) > 24 && regexArray[2] === 'h') {
    throw new Error('Hours cannot be more than 24');
  }

  if (calculateMinutes(regexArray) > 1440) {
    throw new Error('Time spent cannot be more than 24 hours');
  }

  return value;
};
