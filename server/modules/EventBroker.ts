import { Subscriber } from "../interface/Subscriber";
import { MessageQueue } from "./MessageQueue";

/** 
 * @naviadev 
 * EventBroker Class
 * ? 멤버변수
 * 
 * @queues : 이벤트 타입을 key로 가지며, 생성된 key만큼의 Queue를 할당한다. 
 * @subscribers : 이벤트 타입 별로 구독자(model) 리스트를 저장한다.
 */
class EventBroker {
  private queues: { [key: string]: MessageQueue } = {};
  private subscribers: { [key: string]: Subscriber[] } = {};



  publish(eventType: string, message: string): void {
    if (!this.queues[eventType]) {
      this.queues[eventType] = new MessageQueue();
    }
    this.queues[eventType].enqueue(message);

  }

}