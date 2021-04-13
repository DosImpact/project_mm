import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  ExePyInput,
  ExePyOutput,
  PyShellModuleOptions,
  CONFIG_OPTIONS,
} from './py-shell.interface';
import { PythonShell } from 'python-shell';

@Injectable()
export class PyShellService {
  private readonly logger = new Logger(PyShellService.name);
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly config: PyShellModuleOptions,
  ) {}
  //
  async exeHelloPyWithArg(args: string[], inputs: string[]) {
    try {
      const { result, sucess, error } = await new Promise<{
        sucess: boolean;
        error?: string;
        result: string[];
      }>((res, rej) => {
        const pyShell = new PythonShell('argsExample.py', {
          ...this.config,
          args,
        });
        const outputs = Array<string>();
        for (const ins of inputs) {
          pyShell.send(ins);
        }
        pyShell.on('message', (message) => {
          outputs.push(message);
        });
        pyShell.end((err, code, signal) => {
          res({ sucess: true, result: outputs });
        });

        // 그외 예외 처리
        pyShell.on('close', () => {
          console.log('close event');
          rej({ sucess: false, error: 'closed' });
        });
        pyShell.on('error', (error) => {
          console.log('error event');
          rej({ sucess: false, error: error.message });
        });
        pyShell.on('stderr', (error) => {
          console.log('stderr event');
          rej({ sucess: false, error: 'stderr' });
        });
      });
      if (sucess) {
        return {
          ok: true,
          result,
        };
      }
      return {
        ok: false,
        error,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  // 30초 이상 걸리는 await 라면 ?
  async exePy({ args, filename, inputs }: ExePyInput): Promise<ExePyOutput> {
    // 기존 코드 ,파이썬 실행 - 메시지 보내기, 이벤트 드리븐 : 메시지 받기 이벤트, 종료 이벤트
    // API wrapping 하려면
    // Promise객체를 생성 - 그 안에서 종료 이벤트를 받으면 리턴
    if (!filename.endsWith('py')) filename = filename + '.py';
    console.log('exePy', filename, inputs);

    try {
      const { result, sucess, error } = await new Promise<{
        sucess: boolean;
        error?: string;
        result: string[];
      }>((res, rej) => {
        try {
          const pyShell = new PythonShell(filename, {
            ...this.config,
            args,
          });
          console.log('spawn success');

          const outputs = Array<string>();
          if (inputs) {
            for (const ins of inputs) {
              pyShell.send(ins);
            }
          }
          console.log('input inject success');

          pyShell.on('message', (message) => {
            if (message) outputs.push(String(message).trim());
          });
          pyShell.end((err, code, signal) => {
            res({ sucess: true, result: outputs });
          });

          // 그외 예외 처리
          // 정상 종료이여도 pyShell.end 이벤트랑 충돌
          // pyShell.on('close', () => {
          //   this.logger.error('close event');
          //   rej({ sucess: false, error: 'closed' });
          // });
          pyShell.on('error', (error) => {
            this.logger.error(error.traceback);
            rej({ sucess: false, error: error.traceback });
          });
          pyShell.on('stderr', (error) => {
            this.logger.error('stderr event');
            rej({ sucess: false, error: 'stderr' });
          });
        } catch (error) {
          console.log('프로미스 객체 안에도 애러 잡기');
          rej({ sucess: false, error: '..' });
        }
      });

      // pyShell Result

      if (sucess) {
        return {
          ok: true,
          result,
        };
      }
      throw new Error('cannot exePy ');
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
