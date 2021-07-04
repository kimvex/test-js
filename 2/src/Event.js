export default class Event{
  constructor(event) {
    this.second = event.second
    delete event.second
    this.event = event
  }

  execute_event() {
    console.log(`At second ${this.second}: ${JSON.stringify(this.event)}`)
  }
};