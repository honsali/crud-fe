import _ from 'lodash';
import { useContexteAuth } from 'waxant';
import useContexteApp from '../contexte/ContexteApp';

const useHasRight = (action): boolean => {
    const { mapDroitAcces } = useContexteApp();
    const { role } = useContexteAuth();
    const inRole = _.includes(mapDroitAcces[role], action);
    if (!inRole) {
        console.log('NO RIGHT FOR =========>' + action);
    }
    return inRole;
};

export default useHasRight;
