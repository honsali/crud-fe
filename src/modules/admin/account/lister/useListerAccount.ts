import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'waxant';
import CtrlListerAccount from './CtrlListerAccount';
import { selectListeAccount } from './MdlListerAccount';

export const useListerAccount = () => {
    const dispatch = useAppDispatch();
    const listeAccount = useSelector(selectListeAccount);

    useEffect(() => {
        dispatch(CtrlListerAccount.listerAccount({}));
    }, [dispatch]);

    return { listeAccount };
};
