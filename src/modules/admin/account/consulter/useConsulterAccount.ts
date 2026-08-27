import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterAccount from './CtrlConsulterAccount';
import { MdlConsulterAccount, ReqConsulterAccount, selectAccount, selectEtatRecupererAccountParId, selectEtatReinitialiserMotDePasseAccount } from './MdlConsulterAccount';

const useConsulterAccount = () => {

    const dispatch = useAppDispatch();
    const params = useParams();

    const account = useSelector(selectAccount);
    const etatRecupererAccountParId = useSelector(selectEtatRecupererAccountParId);
    const etatReinitialiserMotDePasseAccount = useSelector(selectEtatReinitialiserMotDePasseAccount);

    const createAction = (action: any) => (req?: Partial<ReqConsulterAccount>) => dispatch(action({ ...req, ...params }));

    return {
        // Actions
        recupererAccountParId: createAction(CtrlConsulterAccount.recupererAccountParId),
        reinitialiserMotDePasseAccount: createAction(CtrlConsulterAccount.reinitialiserMotDePasseAccount),
        resetEtatRecupererAccountParId: () => dispatch(MdlConsulterAccount.resetEtatRecupererAccountParId()),
        resetEtatReinitialiserMotDePasseAccount: () => dispatch(MdlConsulterAccount.resetEtatReinitialiserMotDePasseAccount()),

        // State
        account,
        etatRecupererAccountParId,
        etatReinitialiserMotDePasseAccount,
    };
};

export default useConsulterAccount;
