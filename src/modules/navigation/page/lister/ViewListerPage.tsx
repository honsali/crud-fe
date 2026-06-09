import { ActionUcAjouter, Section } from 'waxant';
import { ActionPage } from '../ActionPage';
import { PageCreerPage } from '../ListePagePage';
import TableauPage from './element/TableauPage';

const ViewListerPage = () => {
    //
    return (
        <Section
            blocAction={
                <ActionUcAjouter nom={ActionPage.UcListerPage.AJOUTER_PAGE} page={PageCreerPage} />
            }
        >
            <TableauPage />
        </Section>
    );
};

export default ViewListerPage;