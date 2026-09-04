import ServiceAccount from 'modele/admin/account/ServiceAccount';
import { ActionOperation, action } from 'waxant';
import { ActionAccount } from '../ActionAccount';
import { ReqCreerAccount, ResCreerAccount } from './MdlCreerAccount';

const creerAccountImpl: ActionOperation<ReqCreerAccount, ResCreerAccount> = async (requete, resultat, _thunkAPI) => {
    const { id } = await ServiceAccount.creer(requete.request);
    resultat.idAccount = id;
};

const CtrlCreerAccount = {
    creerAccount: action<ReqCreerAccount, ResCreerAccount>(creerAccountImpl, ActionAccount.UcCreerAccount.CREER_ACCOUNT),
};

export default CtrlCreerAccount;
