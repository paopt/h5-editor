import { execaCommand } from 'execa'
import ora from 'ora'
import { resolve } from 'path'
import { cwd } from 'process'

const PACKAGE_H5 = resolve(cwd(), './packages/h5')
const PACKAGE_SERVER = resolve(cwd(), './packages/server')

const installH5 = () => execaCommand('yarn install', { cwd: PACKAGE_H5});
const installServer = () => execaCommand('yarn install', { cwd: PACKAGE_SERVER});

async function runTask(name, task) {
  const s = ora().start(`${name}平台 开始下载依赖`);
  try {
    await task();
    s.succeed(`${name}平台 下载/更新依赖完成`)
  } catch (err) {
    s.fail(`${name}平台 下载/更新依赖失败，请进入${name}目录下载/更新依赖`)
    console.error(`失败原因：${err.toString()}`)
  }
}

(async () => {
  await runTask('h5', installH5);
  await runTask('server', installServer);
})()

