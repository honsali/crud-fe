import { FormInstance } from 'antd';
import { IEmploye } from 'modele/rh/employe/DomaineEmploye';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, util } from 'waxant';
import CtrlCreerEmploye from './CtrlCreerEmploye';
import { MdlCreerEmploye, selectEtatCreerEmploye, selectIdEmploye } from './MdlCreerEmploye';

const useCreerEmploye = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const etatCreerEmploye = useSelector(selectEtatCreerEmploye);
    const idEmploye = useSelector(selectIdEmploye);

    const creerEmploye = async (form: FormInstance<IEmploye>) => {
        const request = util.removeNonSerialisable(await form.validateFields()) as IEmploye;
        return dispatch(CtrlCreerEmploye.creerEmploye({ request, ...params }));
    };

    return {
        // Actions
        creerEmploye,
        resetEtatCreerEmploye: () => dispatch(MdlCreerEmploye.resetEtatCreerEmploye()),

        // State
        etatCreerEmploye,
        idEmploye,
    };
};

export default useCreerEmploye;
