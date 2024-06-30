//#region 
import express, { Request, Response } from 'express';
import { EventBroker } from './messageQueueModules/EventBroker';
import { OrderService } from './service/orderService';
import dotenv from 'dotenv';
//#endregion

const rootDir = process.cwd();
dotenv.config({ path: `${rootDir}/.env` });

const app = express();
const eventBroker = new EventBroker();
const orderService = new OrderService();

//미들웨어 설정
app.use(express.json());