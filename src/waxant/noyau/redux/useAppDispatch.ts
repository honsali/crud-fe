import { useDispatch } from 'react-redux';
import type { AppDispatch } from './StoreDynamique';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
