import ServiceAccount from 'modele/admin/account/ServiceAccount';
import { ActionOperation, action, util } from 'waxant';
import { ActionAccount } from '../ActionAccount';
import { ReqConsulterAccount, ResConsulterAccount } from './MdlConsulterAccount';

const recupererAccountParIdImpl: ActionOperation<ReqConsulterAccount, ResConsulterAccount> = async (requete, resultat, _thunkAPI) => {
    resultat.account = await ServiceAccount.recupererParId(requete.idAccount);
};

const reinitialiserMotDePasseAccountImpl: ActionOperation<ReqConsulterAccount, ResConsulterAccount> = async (requete, _resultat, _thunkAPI) => {
    await requete.form?.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue());
    await ServiceAccount.reinitialiserMotDePasseAccount(dataForm);
};

const CtrlConsulterAccount = {
    recupererAccountParId: action<ReqConsulterAccount, ResConsulterAccount>(recupererAccountParIdImpl, ActionAccount.UcConsulterAccount.RECUPERER_ACCOUNT_PAR_ID),
    reinitialiserMotDePasseAccount: action<ReqConsulterAccount, ResConsulterAccount>(reinitialiserMotDePasseAccountImpl, ActionAccount.UcConsulterAccount.REINITIALISER_MOT_DE_PASSE_ACCOUNT),
};

export default CtrlConsulterAccount;
