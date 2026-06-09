import { useDispatch } from 'react-redux';
import { AppDispatch } from './StoreDynamique';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
