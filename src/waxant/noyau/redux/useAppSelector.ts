import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import { type IRootState } from './StoreDynamique';

const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export default useAppSelector;
