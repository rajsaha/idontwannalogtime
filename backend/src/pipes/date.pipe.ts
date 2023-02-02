import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidateDatePipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    const regex = /\d{4}-\d{2}-\d{2}/;
    if (regex.test(value)) {
      return value;
    }
    throw new BadRequestException();
  }
}
