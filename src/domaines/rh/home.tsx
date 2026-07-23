import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContexteViewProvider, type ModuleDefinition, type PageDefinition } from 'waxant';

export const PageAccueilRh: PageDefinition = {
    key: 'PageAccueilRh',
    path: '/',
    toPath: () => '/',
    icone: <FontAwesomeIcon icon={faHome} />,
    menu: 'accueil',
    view: (
        <ContexteViewProvider uc="UcAccueilRh">
            <div>Accueil</div>
        </ContexteViewProvider>
    ),
};

const ModuleAccueilRh = (): ModuleDefinition => ({
    key: 'ModuleAccueilRh',
    mapI18n: {
        PageAccueilRh: 'Accueil',
        'UcAccueilRh.titre': 'Accueil',
    },
    listePage: [PageAccueilRh],
    reducer: {},
    index: PageAccueilRh,
});

export default ModuleAccueilRh;
