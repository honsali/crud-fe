import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { BoutonTexte } from 'waxant';
import DialogueCreerPage from './DialogueCreerPage';

const ActionCreerPage = () => {
    const [visible, setVisible] = useState(false);

    const creer = () => {
        setVisible(true);
    }

    return (
        <div style={{ margin: '10px 28px 0 28px' }}>
            <BoutonTexte type="menuItem" nom='ajouterPage' action={creer} icone={<FontAwesomeIcon icon={faSquarePlus} />} />
            <DialogueCreerPage visible={visible} setVisible={setVisible} />
        </div >
    );
};

export default ActionCreerPage;
