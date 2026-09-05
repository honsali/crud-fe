import { FormInstance } from 'antd';
import { IEmploye } from 'modele/rh/employe/DomaineEmploye';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, util } from 'waxant';
import CtrlModifierEmploye from './CtrlModifierEmploye';
import { MdlModifierEmploye, ReqModifierEmploye, selectEmploye, selectEtatInitModificationEmploye, selectEtatMajEmploye } from './MdlModifierEmploye';

const useModifierEmploye = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const employe = useSelector(selectEmploye);
    const etatInitModificationEmploye = useSelector(selectEtatInitModificationEmploye);
    const etatMajEmploye = useSelector(selectEtatMajEmploye);

    const createAction = (action: any) => (req?: Partial<ReqModifierEmploye>) => dispatch(action({ ...req, ...params }));

    const majEmploye = async ({ form, ...req }: Partial<ReqModifierEmploye> & { form: FormInstance<IEmploye> }) => {
        const request = util.removeNonSerialisable(await form.validateFields()) as IEmploye;
        return dispatch(CtrlModifierEmploye.majEmploye({ ...req, request, ...params } as ReqModifierEmploye));
    };

    return {
        // Actions
        initModificationEmploye: createAction(CtrlModifierEmploye.initModificationEmploye),
        majEmploye,
        resetEtatInitModificationEmploye: () => dispatch(MdlModifierEmploye.resetEtatInitModificationEmploye()),
        resetEtatMajEmploye: () => dispatch(MdlModifierEmploye.resetEtatMajEmploye()),

        // State
        employe,
        etatInitModificationEmploye,
        etatMajEmploye,
    };
};

export default useModifierEmploye;
