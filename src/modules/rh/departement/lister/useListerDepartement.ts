import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'waxant';
import CtrlListerDepartement from './CtrlListerDepartement';
import { ReqListerDepartement, selectListeDepartement } from './MdlListerDepartement';

export const useListerDepartement = () => {
    const dispatch = useAppDispatch();
    const listeDepartement = useSelector(selectListeDepartement);

    useEffect(() => {
        dispatch(CtrlListerDepartement.listerDepartement({} as ReqListerDepartement));
    }, [dispatch]);

    return {
        listeDepartement,
    };
};
