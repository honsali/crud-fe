import { FormInstance } from 'antd';
import { IConge } from 'modele/rh/conge/DomaineConge';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, util } from 'waxant';
import CtrlModifierConge from './CtrlModifierConge';
import { MdlModifierConge, ReqModifierConge, selectConge, selectEtatInitModificationConge, selectEtatMajConge } from './MdlModifierConge';

const useModifierConge = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const conge = useSelector(selectConge);
    const etatInitModificationConge = useSelector(selectEtatInitModificationConge);
    const etatMajConge = useSelector(selectEtatMajConge);

    const createAction = (action: any) => (req?: Partial<ReqModifierConge>) => dispatch(action({ ...req, ...params }));

    const majConge = async ({ form, ...req }: Partial<ReqModifierConge> & { form: FormInstance<IConge> }) => {
        const request = util.removeNonSerialisable(await form.validateFields()) as IConge;
        return dispatch(CtrlModifierConge.majConge({ ...req, request, ...params } as ReqModifierConge));
    };

    return {
        // Actions
        initModificationConge: createAction(CtrlModifierConge.initModificationConge),
        majConge,
        resetEtatInitModificationConge: () => dispatch(MdlModifierConge.resetEtatInitModificationConge()),
        resetEtatMajConge: () => dispatch(MdlModifierConge.resetEtatMajConge()),

        // State
        conge,
        etatInitModificationConge,
        etatMajConge,
    };
};

export default useModifierConge;
