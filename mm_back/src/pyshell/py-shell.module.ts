import { BullModule } from '@nestjs/bull';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { CONFIG_OPTIONS, PyShellModuleOptions } from './py-shell.interface';
import { PyShellService } from './py-shell.service';

@Module({})
@Global()
export class PyShellModule {
  static forRoot(pyShellModuleOptions: PyShellModuleOptions): DynamicModule {
    return {
      module: PyShellModule,
      imports: [
        BullModule.registerQueue({
          name: 'pyTask',
        }),
      ],
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
