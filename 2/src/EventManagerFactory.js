import EventManager from './EventManager';
import Event from './Event';

export default class EventManagerFactory{
    static create(events, types) {
        const max_second = Math.max(...events.map(ev => ev.second))
        let list_events = {}
        types.forEach((t) => {
            const events_type = events.filter((ev) => ev.type === t)
            events_type.forEach((ev) => {
                if(list_events[ev.second]) {
                    list_events[ev.second].push(new Event(ev))
                } else {
                    list_events[ev.second] = [new Event(ev)]
                }
            })
        })

        return new EventManager(list_events, max_second);
    }
};