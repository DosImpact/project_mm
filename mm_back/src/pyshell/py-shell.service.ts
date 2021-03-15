import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.interface';
import { PyShellModuleOptions } from './py-shell.interface';
import { PythonShell } from 'python-shell';

@Injectable()
export class pyShellService {
  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly config: PyShellModuleOptions,
  ) {
    // const pyshell = new PythonShell('helloInf.py', {
    //   ...config,
    //   args: ['value1', 'value2', 'value3'],
    // });
    // // sends a message to the Python script via stdin
    // pyshell.send('from node.js send 1');
    // pyshell.send('from node.js send 2');
    // pyshell.send('from node.js send 3');
    // pyshell.on('message', function (message) {
    //   // received a message sent from the Python script (a simple "print" statement)
    //   console.log(message);
    // });
    // // end the input stream and allow the process to exit
    // pyshell.end(function (err, code, signal) {
    //   if (err) throw err;
    //   console.log('The exit code was: ' + code);
    //   console.log('The exit signal was: ' + signal);
    //   console.log('finished');
    // });
  }

  async exeHelloPyWithArg(args: string[], inputs: string[]) {
    const msg: string[] = new Array<string>();
    const pyShell = new PythonShell('argsExample.py', { ...this.config, args });
    // stdin
    for (const ins of inputs) {
      pyShell.send(ins);
    }
    // print
    pyShell.on('message', (msg) => {
      msg.push(msg);
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
}
