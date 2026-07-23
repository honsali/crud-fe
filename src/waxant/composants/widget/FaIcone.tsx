import { library, type IconName } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FaIconeProps {
    nomIcone?: string;
    className?: string;
}

library.add(fas);

const FaIcone = ({ nomIcone, className }: FaIconeProps) => {
    const iconName = (nomIcone?.substring(2).toLowerCase() || 'circle') as IconName;
    return <FontAwesomeIcon icon={['fas', iconName]} className={className} />;
};

export default FaIcone;
