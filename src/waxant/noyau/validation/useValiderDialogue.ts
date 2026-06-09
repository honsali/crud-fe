import { IInfoActionEchouee } from '../message/DomaineMessage';
import { MdlMessage } from '../message/MdlMessage';

const useValiderDialogue = (form, dispatch, actionErreur?: () => void) => {
    form.validateFields()
        .then(() => {
            actionErreur();
        })
        .catch((errorInfo) => {
            const messageErreur: IInfoActionEchouee = { code: 'error.validation.form' };
            messageErreur.listeErreurDirecte = errorInfo.errorFields.map((err) => {
                return err.errors[0];
            });
            if (dispatch) {
                dispatch(MdlMessage.setInfoActionEchoueeDansDialogue(messageErreur));
            }
        });
};

export default useValiderDialogue;
