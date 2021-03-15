import { Global, Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.interface';
import {
  ExePyInput,
  ExePyOutput,
  PyShellModuleOptions,
} from './py-shell.interface';
import { PythonShell } from 'python-shell';
import { promisify } from 'util';

@Injectable()
export class PyShellService {
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly config: PyShellModuleOptions,
  ) {
    const msg: string[] = new Array<string>();
    const pyShell = new PythonShell('argsExample.py', {
      ...this.config,
      args: ['args01', 'args02'],
    });
    // stdin
    for (const ins of ['exins01', 'exins02']) {
      pyShell.send(ins);
    }
    // print
    pyShell.on('message', (message) => {
      msg.push(message);
    });
    // fin
    pyShell.end((err, code, signal) => {
      if (err) return { error: err, ok: false };
      return {
        ok: true,
        result: msg,
      };
    });
  }

  async exeHelloPyWithArg(args: string[], inputs: string[]) {
    const msg: string[] = new Array<string>();
    const pyShell = new PythonShell('argsExample.py', { ...this.config, args });
    // stdin
    for (const ins of inputs) {
      pyShell.send(ins);
    }
    // print
    pyShell.on('message', (message) => {
      msg.push(message);
    });
    // fin
    pyShell.end((err, code, signal) => {
      if (err) return { error: err, ok: false };
      return {
        ok: true,
        result: msg,
      };
    });
  }
  // 30초 이상 걸리는 await 라면 ?
  async exePy({ args, filename, inputs }: ExePyInput): Promise<ExePyOutput> {
    const msg: string[] = new Array<string>();
    const pyShell = new PythonShell(filename, { ...this.config, args });
    const pyShellEndPromise = promisify(pyShell.end);
    // stdin
    for (const ins of inputs) {
      pyShell.send(ins);
    }
    // print
    pyShell.on('message', (msg) => {
      msg.push(msg);
    });
    // fin
    // pyShell.end((err, code, signal) => {
    //   if (err) return { error: err, ok: false };
    //   return {
    //     ok: true,
    //     result: msg,
    //   };
    // });
    const res = await pyShellEndPromise();
    console.log(res);
    return {
      ok: true,
      result: msg,
    };
  }
}
