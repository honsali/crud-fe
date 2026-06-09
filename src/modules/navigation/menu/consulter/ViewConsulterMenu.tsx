import { ConsulterMenuProvider } from './ContextConsulterMenu';
import ActionCreerPage from './element/ActionCreerPage';
import MenuNavigation from './element/MenuNavigation';

const ViewConsulterMenu = () => {
    //
    return (
        <ConsulterMenuProvider>
            <MenuNavigation />
            <ActionCreerPage />
        </ConsulterMenuProvider>
    );
};

export default ViewConsulterMenu;
