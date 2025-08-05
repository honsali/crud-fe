import { Subject, Subscription } from 'rxjs';

interface EventPayload {
    event: string;
    data?: any;
}

class EventBus {
    private eventBus = new Subject<EventPayload>();

    emit(event: string, data?: any): void {
        this.eventBus.next({ event, data });
    }

    on(event: string, callback: (data: any) => void): Subscription {
        return this.eventBus.asObservable().subscribe(({ event: emittedEvent, data }) => {
            if (emittedEvent === event) {
                callback(data);
            }
        });
    }
}

export const eventBus = new EventBus();
