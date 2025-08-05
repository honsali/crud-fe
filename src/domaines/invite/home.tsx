import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContexteViewProvider, ModuleDefinition, PageDefinition } from 'waxant';


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

const ModuleAccueilInvite = (): ModuleDefinition => {
    return {
        key: 'ModuleIdentification',
        mapI18n: { PageAccueilInvite: 'Accueil' },
        listePage: [PageAccueilInvite],
        reducer: {},
        index: PageAccueilInvite,
    };
};
export default ModuleAccueilInvite;
