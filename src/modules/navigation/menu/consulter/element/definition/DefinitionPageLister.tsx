import ViewListerEntity from 'modules/navigation/entity/lister/ViewListerEntity';
import Definition from './Definition';

const DefinitionPageLister = () => {
    return (
        <Definition type="pageLister">
            <ViewListerEntity surTouteLaLigne />
        </Definition>
    );
};

export default DefinitionPageLister;
