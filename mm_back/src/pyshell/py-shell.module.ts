import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.interface';
import { PyShellModuleOptions } from './py-shell.interface';
import { PyShellService } from './py-shell.service';

@Module({})
@Global()
export class PyShellModule {
  static forRoot(pyShellModuleOptions: PyShellModuleOptions): DynamicModule {
    return {
      module: PyShellModule,
      exports: [PyShellService],
      providers: [
        { provide: PyShellService, useClass: PyShellService },
        {
          provide: CONFIG_OPTIONS,
          useValue: pyShellModuleOptions,
        },
      ],
    };
  }
}
