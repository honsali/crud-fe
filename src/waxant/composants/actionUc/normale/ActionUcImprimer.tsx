import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { BoutonProps } from '../../bouton/BoutonProps';

import ActionUcNormale from '../ActionUcNormale';

const ActionUcImprimer = (props: BoutonProps) => {
    return <ActionUcNormale nom="imprimer" icone={<FontAwesomeIcon icon={faPrint} />} {...props} />;
};

export default ActionUcImprimer;
