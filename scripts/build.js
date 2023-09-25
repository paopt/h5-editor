import { execaCommand } from 'execa'
import ora from 'ora'
import { resolve } from 'path'
import { cwd } from 'process'

const PACKAGE_H5 = resolve(cwd(), './packages/h5')

const buildH5 = () => execaCommand('yarn build', { cwd: PACKAGE_H5});

async function runTask(name, task) {
  const s = ora().start(`${name}平台 开始打包`);
  try {
    await task();
    s.succeed(`${name}平台 打包完成`)
  } catch (err) {
    s.fail(`${name}平台 打包失败，请进入${name}目录打包`)
    console.error(`失败原因：${err.toString()}`)
  }
}

(async () => {
  await runTask('h5', buildH5);
})()

