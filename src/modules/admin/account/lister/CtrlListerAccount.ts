import ServiceAccount from 'modele/admin/account/ServiceAccount';
import { ActionOperation, action } from 'waxant';
import { ActionAccount } from '../ActionAccount';
import { ReqListerAccount, ResListerAccount } from './MdlListerAccount';

const listerAccountImpl: ActionOperation<ReqListerAccount, ResListerAccount> = async (_requete, resultat, _thunkAPI) => {
    resultat.listeAccount = await ServiceAccount.lister();
};

const CtrlListerAccount = {
    listerAccount: action<ReqListerAccount, ResListerAccount>(listerAccountImpl, ActionAccount.UcListerAccount.LISTER_ACCOUNT),
};

export default CtrlListerAccount;
