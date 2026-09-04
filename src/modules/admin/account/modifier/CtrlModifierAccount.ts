import ServiceAccount from 'modele/admin/account/ServiceAccount';
import { IUpdateAccountForm } from 'modele/admin/account/DomaineAccount';
import { ActionOperation, action, util } from 'waxant';
import { ActionAccount } from '../ActionAccount';
import { ReqModifierAccount, ResModifierAccount } from './MdlModifierAccount';

const initModificationAccountImpl: ActionOperation<ReqModifierAccount, ResModifierAccount> = async (requete, resultat, _thunkAPI) => {
    resultat.account = await ServiceAccount.recupererParId(requete.idAccount);
};

const majAccountImpl: ActionOperation<ReqModifierAccount, ResModifierAccount> = async (requete, _resultat, _thunkAPI) => {
    await requete.form?.validateFields();
    const dataForm = util.removeNonSerialisable(requete.form?.getFieldsValue()) as IUpdateAccountForm;
    await ServiceAccount.maj(requete.idAccount, {
        role: { id: dataForm.role },
        activated: dataForm.activated,
    });
};

const CtrlModifierAccount = {
    initModificationAccount: action<ReqModifierAccount, ResModifierAccount>(initModificationAccountImpl, ActionAccount.UcModifierAccount.INIT_MODIFICATION_ACCOUNT),
    majAccount: action<ReqModifierAccount, ResModifierAccount>(majAccountImpl, ActionAccount.UcModifierAccount.MAJ_ACCOUNT),
};

export default CtrlModifierAccount;
