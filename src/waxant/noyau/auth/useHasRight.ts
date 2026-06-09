import _ from 'lodash';
import useContexteApp from '../contexte/ContexteApp';
import useContexteAuth from './ContexteAuth';

const useHasRight = (action): boolean => {
    const { mapDroitAcces } = useContexteApp();
    const { role } = useContexteAuth();
    return _.includes(mapDroitAcces[role], action);
};

export default useHasRight;
