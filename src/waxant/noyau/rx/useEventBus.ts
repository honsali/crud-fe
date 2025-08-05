import { useParams } from 'react-router';
import { eventBus } from 'waxant';

const useEventBus = () => {
    const params = useParams();

    const emit = (eventName: string, data?: any) => {
        eventBus.emit(eventName, { ...params, ...data });
    };

    return { emit };
};

export default useEventBus;
