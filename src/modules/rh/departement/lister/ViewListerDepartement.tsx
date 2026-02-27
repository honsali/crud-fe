import { ActionUcAjouter, Section } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import { PageCreerDepartement } from '../ListePageDepartement';
import TableauDepartement from './element/TableauDepartement';

const ViewListerDepartement = () => {
    //
    return (
        <Section
            blocAction={
                <ActionUcAjouter nom={ActionDepartement.UcListerDepartement.AJOUTER_DEPARTEMENT} page={PageCreerDepartement} />
            }
        >
            <TableauDepartement />
        </Section>
    );
};

export default ViewListerDepartement;