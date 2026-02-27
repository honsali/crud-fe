import { faCog, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContexteViewProvider, type ModuleDefinition, type PageDefinition } from 'waxant';
import Test from './test';


export const PageAccueilInvite: PageDefinition = {
    key: 'PageAccueilInvite',
    path: '/',
    toPath: (args) => '/',
    icone: <FontAwesomeIcon icon={faHome} />,
    menu: 'accueil',
    view: (
        <ContexteViewProvider uc="UcAccueilInvite">
            <div>Accueil</div>
        </ContexteViewProvider>
    ),
};

export const PageTest: PageDefinition = {
    key: 'PageTest',
    path: '/test',
    toPath: (args) => '/test',
    icone: <FontAwesomeIcon icon={faCog} />,
    menu: 'test',
    view: (
        <ContexteViewProvider uc="UcAccueilInvite">
            <Test />
        </ContexteViewProvider>
    ),
};

const ModuleAccueilInvite = (): ModuleDefinition => {
    return {
        key: 'ModuleIdentification',
        mapI18n: { PageAccueilInvite: 'Accueil', 'UcAccueilInvite.test': 'Test', 'UcAccueilInvite.titre': 'Titre' },
        listePage: [PageAccueilInvite, PageTest],
        reducer: {},
        index: PageAccueilInvite,
    };
};
export default ModuleAccueilInvite;
