import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.interface';
import { PyShellModuleOptions } from './py-shell.interface';
import { pyShellService } from './py-shell.service';

@Module({})
export class PyShellModule {
  static forRoot(pyShellModuleOptions: PyShellModuleOptions): DynamicModule {
    return {
      module: PyShellModule,
      exports: [pyShellService],
      providers: [
        { provide: pyShellService, useClass: pyShellService },
        {
          provide: CONFIG_OPTIONS,
          useValue: pyShellModuleOptions,
        },
      ],
    };
  }
}
