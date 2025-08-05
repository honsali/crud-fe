import { Layout } from 'antd';
import styled from 'styled-components';

export const SFooter = styled(Layout.Footer)`
    text-align: center;
    color: #999;
    font-weight: 700;
    margin-top: 20px;
`;

const LayoutFooter = () => {
    return <SFooter>&copy; 2025 CRUD</SFooter>;
};

export default LayoutFooter;
