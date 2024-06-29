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
export class EventBroker {
  private queues: { [key: string]: MessageQueue } = {};
  private subscribers: { [key: string]: Subscriber[] } = {};
  publish(eventType: string, message: string): void {
    if (!this.queues[eventType]) {
      this.queues[eventType] = new MessageQueue();
    }
    this.queues[eventType].enqueue(message);
    this.notifySubscribers(eventType);
  }
  private notifySubscribers(eventType: string) {
    const queue = this.queues[eventType];
    // Queue가 존재하며, Queue가 비어있지 않다면 ? dequeue를 통해 가장 처음 들어온 요청을 가져온다.
    if (queue && !queue.isEmpty()) {
      const message = queue.dequeue();
      // dequeue를 통해 받아온 요청이 유효하다면 해당 이벤트 타입에 맞는 서비스를 실행한다.
      if (message) {
        // 순회하며 요청을 전달.
        this.subscribers[eventType].forEach((service) => {
          service.callback(message)
        })
      }
    }
  }
  addSubscribe(eventType: string, subscriber: Subscriber) {
    // 호출한 eventType에 구독자가 존재하지 않다면, 생성
    // 2번째 매개변수를 통해 추가한 구독자를 멤버변수에 할당한다.
    if (!this.subscribers[eventType]) {
      this.subscribers[eventType] = [];
    }
    try {
      this.subscribers[eventType].push(subscriber);
    } catch (error) {
      console.error(error);
    }
  }
}

