export default class EventManager{
    constructor(list_events, max_second) {
        this.list_events = list_events
        this.max_second = max_second
    }

    run() {
        console.log("RUNNING");
        let second = 0;
        const loop_time = setInterval(() => {
            const evts = this.list_events[second]
            if (evts) {
                evts.forEach((evt) => {
                    evt.execute_event()
                });
            }

            if (second === this.max_second) {
                clearInterval(loop_time)
                return
            }
            second++
        }, 1000);

    }
};