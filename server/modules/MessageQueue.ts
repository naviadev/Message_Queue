export class MessageQueue {
  private queue: string[] = [];

  enqueue(message: string): void {
    this.queue.push(message);
  }

  dequeue(): string {
    const firstMessage = this.queue.shift();
    if (firstMessage === undefined) {
      throw new Error('Empty Queue');
    } else {
      return firstMessage;
    }
  }

  isEmpty(): Boolean {
    return this.queue.length === 0
  }
}

