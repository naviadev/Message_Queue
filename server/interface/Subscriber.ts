export interface Subscriber {
  id: string;
  callback: (message: string) => void;
}