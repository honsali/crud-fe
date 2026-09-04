import { FormInstance } from 'antd';
import { ICreateDepartementForm } from 'modele/rh/departement/DomaineDepartement';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlCreerDepartement from './CtrlCreerDepartement';
import MapperCreerDepartement from './MapperCreerDepartement';
import { MdlCreerDepartement, selectEtatCreerDepartement, selectIdDepartement } from './MdlCreerDepartement';

const useCreerDepartement = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatCreerDepartement = useSelector(selectEtatCreerDepartement);
    const idDepartement = useSelector(selectIdDepartement);

    const creerDepartement = async (form: FormInstance<ICreateDepartementForm>) => {
        const valeurs = await form.validateFields();
        const request = MapperCreerDepartement.creerRequest(valeurs);
        return dispatch(CtrlCreerDepartement.creerDepartement({ request, ...params }));
    };

    return {
        // Actions
        creerDepartement,
        resetEtatCreerDepartement: () => dispatch(MdlCreerDepartement.resetEtatCreerDepartement()),

        // State
        etatCreerDepartement,
        idDepartement,
    };
};

export default useCreerDepartement;
