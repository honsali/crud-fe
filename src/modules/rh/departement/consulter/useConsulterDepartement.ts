import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterDepartement from './CtrlConsulterDepartement';
import { selectDepartement } from './MdlConsulterDepartement';

const useConsulterDepartement = () => {
    const dispatch = useAppDispatch();
    const { idDepartement } = useParams<{ idDepartement: string }>();
    const departement = useSelector(selectDepartement);

    useEffect(() => {
        if (idDepartement) {
            dispatch(CtrlConsulterDepartement.recupererDepartementParId({ idDepartement }));
        }
    }, [dispatch, idDepartement]);

    return { departement };
};

export default useConsulterDepartement;
