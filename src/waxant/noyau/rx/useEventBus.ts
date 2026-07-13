import { useCallback, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { eventBus } from './EventBus';

export const useEventBusSubscription = (eventName: string, callback: (data: any) => void, actif = true) => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!actif || !eventName) {
            return undefined;
        }

        const subscription = eventBus.on(eventName, (data) => callbackRef.current(data));
        return () => subscription.unsubscribe();
    }, [actif, eventName]);
};

const useEventBus = () => {
    const params = useParams();

    const emit = useCallback((eventName: string, data?: any) => {
        eventBus.emit(eventName, { ...params, ...data });
    }, [params]);

    return { emit };
};

export default useEventBus;
