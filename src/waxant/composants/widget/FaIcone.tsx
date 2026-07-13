import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FaIcone = ({ nomIcone, className = null }) => {
    library.add(fas)
    return <FontAwesomeIcon icon={nomIcone?.substring(2).toLowerCase()} className={className} />;
}

export default FaIcone;