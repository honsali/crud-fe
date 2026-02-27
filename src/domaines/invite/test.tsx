import { DeleteOutlined, EditFilled, EyeFilled, PlusOutlined, WarningOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { BoutonFort, BoutonIconeAlerte, BoutonIconeDanger, BoutonIconeFort, BoutonIconeNormal, BoutonTexteAlerte, BoutonTexteDanger, BoutonTexteLien, BoutonTexteNormal, CadreFort, CadreNormal, CadreSimple, Section } from 'waxant';

const Test = () => {

    return (
        <Section titre="test">
            <CadreFort >
                <div>Fort</div>

                <CadreNormal etat="valide" blocAction={<BoutonIconeFort libelle="Icone Fort" taille="mini" icone={<PlusOutlined />} />}>
                    <div>Normal</div>
                    <CadreSimple>
                        <div>Simple</div>
                    </CadreSimple>
                </CadreNormal>
            </CadreFort>

            <Space wrap size={12}>
                <BoutonFort libelle="Texte Fort" icone={<PlusOutlined />} />
                <BoutonTexteNormal libelle="Texte Normal" icone={<EditFilled />} />
                <BoutonTexteAlerte libelle="Texte Alerte" icone={<WarningOutlined />} />
                <BoutonTexteDanger libelle="Texte Danger" icone={<DeleteOutlined />} />
                <BoutonTexteLien libelle="Texte Lien" icone={<EyeFilled />} />
            </Space>


            <Space wrap size={12}>
                <BoutonIconeFort libelle="Icone Fort" icone={<PlusOutlined />} />
                <BoutonIconeNormal libelle="Icone Normal" icone={<EditFilled />} />
                <BoutonIconeAlerte libelle="Icone Alerte" icone={<WarningOutlined />} />
                <BoutonIconeDanger libelle="Icone Danger" icone={<DeleteOutlined />} />
            </Space>



        </Section >
    );
};

export default Test;
