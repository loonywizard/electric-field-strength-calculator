/**
 * Observer
 *
 * This is basic implementation of Observer pattern, also known as observer/publisher pattern
 *
 * Observer has array of subscribers, that consists of functions, that we need to call
 * when specific event has happen
 *
 * Observer has method 'subscribe', that adds new functions to subscribers array
 * Observer has method 'notifySubscribers', that calls all subscribers
 * */
export default class Observer {
  constructor() {
    this.subscribers = [];
  }

  subscribe = (...args) => {
    args.forEach((fn) => { this.subscribers.push(fn); });
  };

  notifySubscribers = (args) => {
    this.subscribers.forEach((fn) => { fn(args); });
  };
}
