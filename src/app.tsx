import 'assets/styles/default.css';
import LayoutGlobal from 'commun/layout/LayoutGlobal';
import mapDroitAcces from 'commun/securite/mapDroitAcces';
import mapRole from 'commun/securite/mapRole';
import { theme } from 'commun/theme/theme';
import mapDomaine from 'domaines/mapDomaine';
import ServiceReference from 'modele/commun/reference/ServiceReference';
import { useMemo } from 'react';
import { ConfigAppType, WaxantApp } from 'waxant';

const App = () => {
    const config: ConfigAppType = useMemo(
        () => ({
            appName: 'CRUD',
            langue: 'fr',
            formatDate: 'DD/MM/YYYY',
            formatDateTime: 'DD/MM/YYYY HH:mm',
            apiTimeout: 50000,
            theme: theme,
            mapDroitAcces: mapDroitAcces,
            mapRole: mapRole,
            mapDomaine: mapDomaine,
            listerReference: ServiceReference.lister,
        }),
        []
    );

    return (
        <WaxantApp config={config}>
            <LayoutGlobal />
        </WaxantApp>
    );
};

export default App;
