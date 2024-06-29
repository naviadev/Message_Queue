import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
const rootDir = process.cwd();
dotenv.config({ path: '../../../.env' });
const getRandomPort = (min = process.env.MIN_PORT, max = process.env.MAX_PORT): number => {
  return Math.floor(Math.random() * (Number(max) - Number(min) + 1) + Number(min));
}
const port: number = getRandomPort();
const upDateEnvPort = (RandPort: number = port): void => {
  const envFilePath = path.resolve(rootDir, '../../../.env');
  const envConfig = dotenv.parse(fs.readFileSync(envFilePath));
  envConfig.PORT = RandPort.toString();
  const newEnvContent: string = Object.keys(envConfig)
    .map(key => `${key}=${envConfig[key]}`)
    .join('\n');
  fs.writeFileSync(envFilePath, newEnvContent);
}
upDateEnvPort();