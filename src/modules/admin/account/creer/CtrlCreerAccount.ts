import ServiceAccount from 'modele/admin/account/ServiceAccount';
import { ActionOperation, action, util } from 'waxant';
import { ActionAccount } from '../ActionAccount';
import { ReqCreerAccount, ResCreerAccount } from './MdlCreerAccount';

const creerAccountImpl: ActionOperation<ReqCreerAccount, ResCreerAccount> = async (requete, resultat, _thunkAPI) => {
    await requete.form?.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue());
    const { id } = await ServiceAccount.creer(dataForm);
    resultat.idAccount = id;
};

const CtrlCreerAccount = {
    creerAccount: action<ReqCreerAccount, ResCreerAccount>(creerAccountImpl, ActionAccount.UcCreerAccount.CREER_ACCOUNT),
};

export default CtrlCreerAccount;
