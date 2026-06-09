import { useEffect } from 'react';
import { ContexteViewProvider } from 'waxant';
import TableauMenu from './element/TableauMenu';
import useListerMenu from './useListerMenu';

const ViewListerMenu = () => {
    const { listeMenu, listerMenu } = useListerMenu();

    useEffect(() => {
        listerMenu();
    }, []);
    //
    return (
        <ContexteViewProvider uc="UcListerMenu">
            <TableauMenu />
        </ContexteViewProvider>
    );
};

export default ViewListerMenu;