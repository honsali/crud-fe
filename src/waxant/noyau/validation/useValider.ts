import { type IInfoActionEchouee } from '../message/DomaineMessage';
import { MdlMessage } from '../message/MdlMessage';

const useValider = (form, dispatch, actionSuccess, actionErreur?) => {
    form.validateFields()
        .then(() => {
            actionSuccess();
        })
        .catch((errorInfo) => {
            const messageErreur: IInfoActionEchouee = { code: 'error.validation.form' };
            messageErreur.listeErreurDirecte = errorInfo.errorFields.map((err) => {
                return err.errors[0];
            });
            if (actionErreur) {
                actionErreur();
            }
            if (dispatch) {
                dispatch(MdlMessage.setInfoActionEchouee(messageErreur));
            }
        });
};

export default useValider;
