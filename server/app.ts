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
// orderService 모듈을 등록.
eventBroker.addSubscribe('order', orderService);

app.post('/order', async (req: Request, res: Response) => {
  const { eventType, message } = req.body;
  if (!eventType || !message) {
    return res.status(400).send('잘못된 요청입니다.');
  }
  eventBroker.publish(eventType, message);
  res.send('Event published')
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});