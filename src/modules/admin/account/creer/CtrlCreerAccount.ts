import ServiceAccount from 'modele/admin/account/ServiceAccount';
import { ICreateAccountForm } from 'modele/admin/account/DomaineAccount';
import { ActionOperation, action, util } from 'waxant';
import { ActionAccount } from '../ActionAccount';
import { ReqCreerAccount, ResCreerAccount } from './MdlCreerAccount';

const creerAccountImpl: ActionOperation<ReqCreerAccount, ResCreerAccount> = async (requete, resultat, _thunkAPI) => {
    await requete.form?.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue()) as ICreateAccountForm;
    const { id } = await ServiceAccount.creer({
        username: dataForm.username,
        password: dataForm.password,
        role: { id: dataForm.role },
    });
    resultat.idAccount = id;
};

const CtrlCreerAccount = {
    creerAccount: action<ReqCreerAccount, ResCreerAccount>(creerAccountImpl, ActionAccount.UcCreerAccount.CREER_ACCOUNT),
};

export default CtrlCreerAccount;
