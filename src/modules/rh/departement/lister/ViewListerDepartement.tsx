import { ActionUcAjouter, BlocAction, Section } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import { PageCreerDepartement } from '../ListePageDepartement';
import TableauDepartement from './element/TableauDepartement';

const ViewListerDepartement = () => {
    //
    return (
        <Section>
            <TableauDepartement />
            <BlocAction>
                <ActionUcAjouter nom={ActionDepartement.UcListerDepartement.AJOUTER_DEPARTEMENT} page={PageCreerDepartement} />
            </BlocAction>
        </Section>
    );
};

export default ViewListerDepartement;