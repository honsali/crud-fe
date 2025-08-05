import { ActionUcAjouter, BlocAction, Section } from 'waxant';
import { ActionRh } from '../../ActionRh';
import { PageCreerDepartement } from '../../ListePageRh';
import TableauDepartement from './element/TableauDepartement';

const ViewListerDepartement = () => {
    //
    return (
        <Section>
            <TableauDepartement />
            <BlocAction>
                <ActionUcAjouter nom={ActionRh.UcListerDepartement.AJOUTER_DEPARTEMENT} page={PageCreerDepartement} />
            </BlocAction>
        </Section>
    );
};

export default ViewListerDepartement;