import { FormInstance } from 'antd';
import { IConge } from 'modele/rh/conge/DomaineConge';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, util } from 'waxant';
import CtrlCreerConge from './CtrlCreerConge';
import { MdlCreerConge, selectEtatCreerConge, selectIdConge } from './MdlCreerConge';

const useCreerConge = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatCreerConge = useSelector(selectEtatCreerConge);
    const idConge = useSelector(selectIdConge);

    const creerConge = async (form: FormInstance<IConge>) => {
        const request = util.removeNonSerialisable(await form.validateFields()) as IConge;
        return dispatch(CtrlCreerConge.creerConge({ request, ...params, idEmploye: params.idEmploye! }));
    };

    return {
        // Actions
        creerConge,
        resetEtatCreerConge: () => dispatch(MdlCreerConge.resetEtatCreerConge()),

        // State
        etatCreerConge,
        idConge,
    };
};

export default useCreerConge;
