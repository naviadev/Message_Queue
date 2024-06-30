import { Subscriber } from "../interface/Subscriber";

export class OrderService implements Subscriber {
  async callback(message: string): Promise<void> {
    console.log(`Processed message: ${message}`);
  }
}
