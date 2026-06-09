import { ContexteViewProvider } from 'waxant';
import TableauModule from './element/TableauModule';

const ViewListerModule = () => {
    //
    return (
        <ContexteViewProvider uc="UcListerModule">
            <TableauModule />
        </ContexteViewProvider>
    );
};

export default ViewListerModule;