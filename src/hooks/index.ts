import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from 'src/store';

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

export { useAppDispatch, useAppSelector };
