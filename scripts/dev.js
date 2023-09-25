import { execaCommand} from 'execa';
import { resolve } from 'path';
import inquirer from 'inquirer'
import { cwd } from 'process'

const PACKAGE_H5 = resolve(cwd(), './packages/h5');
const PACKAGE_SERVER = resolve(cwd(), './packages/server');


function run(bin, opts = {}) {
  execaCommand(bin, {stdio: 'inherit', ...opts})
}

async function init() {
  const data = await inquirer.prompt([
    {
      type: 'list',
      message: '请选择您要运行的子项目：',
      name: 'package',
      choices: [
        {
          key: '0',
          name: 'h5编辑器 h5端',
          value: 'h5'
        },
        {
          key: '1',
          name: 'h5编辑器 服务端',
          value: 'server'
        }
      ]
    }
  ]);

  if (data.package === 'h5') {
    run('yarn dev', { cwd: PACKAGE_H5})
  } else if (data.package === 'server') {
    run('yarn dev', { cwd: PACKAGE_SERVER})
  }
}

init()