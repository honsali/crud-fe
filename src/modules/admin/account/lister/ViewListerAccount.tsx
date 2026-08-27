import { ActionUcAjouter, Section } from 'waxant';
import { ActionAccount } from '../ActionAccount';
import { PageCreerAccount } from '../ListePageAccount';
import TableauAccount from './element/TableauAccount';

const ViewListerAccount = () => {
    //
    return (
        <Section
            blocAction={
                <ActionUcAjouter nom={ActionAccount.UcListerAccount.AJOUTER_ACCOUNT} page={PageCreerAccount} />
            }
        >
            <TableauAccount />
        </Section>
    );
};

export default ViewListerAccount;
