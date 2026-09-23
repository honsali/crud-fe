import { FormInstance } from 'antd';
import { IDepartement } from 'modele/rh/departement/DomaineDepartement';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, util } from 'waxant';
import CtrlModifierDepartement from './CtrlModifierDepartement';
import { MdlModifierDepartement, ReqModifierDepartement, selectDepartement, selectEtatInitModificationDepartement, selectEtatMajDepartement } from './MdlModifierDepartement';

const useModifierDepartement = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const departement = useSelector(selectDepartement);
    const etatInitModificationDepartement = useSelector(selectEtatInitModificationDepartement);
    const etatMajDepartement = useSelector(selectEtatMajDepartement);

    const createAction = (action: any) => (req?: Partial<ReqModifierDepartement>) => dispatch(action({ ...req, ...params }));

    const majDepartement = async ({ form, ...req }: Partial<ReqModifierDepartement> & { form: FormInstance<IDepartement> }) => {
        const request = util.removeNonSerialisable(await form.validateFields()) as IDepartement;
        return dispatch(CtrlModifierDepartement.majDepartement({ ...req, request, ...params } as ReqModifierDepartement));
    };

    return {
        // Actions
        initModificationDepartement: createAction(CtrlModifierDepartement.initModificationDepartement),
        majDepartement,
        resetEtatInitModificationDepartement: () => dispatch(MdlModifierDepartement.resetEtatInitModificationDepartement()),
        resetEtatMajDepartement: () => dispatch(MdlModifierDepartement.resetEtatMajDepartement()),

        // State
        departement,
        etatInitModificationDepartement,
        etatMajDepartement,
    };
};

export default useModifierDepartement;
