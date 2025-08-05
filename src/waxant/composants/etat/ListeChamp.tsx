import { Row } from 'antd';
import styled from 'styled-components';

const Composant = styled(Row)`
    .ant-form-item .ant-form-item-label > label {
        color: #666;
        font-weight: 600;
    }
`;

const ListeChamp = ({ children }) => {
    return <Composant gutter={24}>{children}</Composant>;
};

export default ListeChamp;
