import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from 'src/common/common.interface';
import { JwtModuleOptions } from './jwt.interface';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly option: JwtModuleOptions,
  ) {}

  sign(payload: object): string {
    return jwt.sign(payload, this.option.privateKey);
  }
  verify(token: string): string | object {
    return jwt.verify(token, this.option.privateKey);
  }
}
