import _ from 'lodash';
import useContexteApp from '../contexte/ContexteApp';
import useContexteAuth from './ContexteAuth';

const useHasRight = (action: string): boolean => {
    const { mapDroitAcces } = useContexteApp();
    const { role } = useContexteAuth();
    return role ? _.includes(mapDroitAcces[role] ?? [], action) : false;
};

export default useHasRight;
