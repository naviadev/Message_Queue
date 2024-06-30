export interface Subscriber {
  callback: (message: string) => void;
}