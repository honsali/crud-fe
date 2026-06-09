import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { IRootState } from './StoreDynamique';

const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export default useAppSelector;
