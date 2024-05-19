import {
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BadRequestException, HttpStatus } from '@nestjs/common';
export abstract class ApiController {
  notfound(error?: HttpException, message?: string): void {
    throw new NotFoundException(message ?? error?.message);
  }

  forbidden(error?: HttpException, message?: string): void {
    throw new ForbiddenException(message ?? error?.message);
  }

  badrequest(error?: HttpException, message?: string): void {
    throw new BadRequestException(message ?? error?.message);
  }

  internalerror(error?: HttpException, message?: string): void {
    throw new InternalServerErrorException(message ?? error?.message);
  }

  nocontent(res: any) {
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  created(res: any, data?: any) {
    return res.status(HttpStatus.CREATED).send(data);
  }

  ok(res: any, data?: any) {
    return res.status(HttpStatus.OK).send(data);
  }
}
