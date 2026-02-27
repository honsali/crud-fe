import { Col, Row } from 'antd';
import styled from 'styled-components';
import useLayoutContext from '../LayoutContext';

const SBrand = styled(Row)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Logo = styled(Col)`
    margin: 10px 0 0 0;
    img {
        height: 24px;
    }
`;

const Title = styled(Col)`
    margin: 4px 0 0 8px;
    color: #3F72AF;
    font-size: 26px;
    font-weight: 400;
    letter-spacing: 4px;
    font-family: Roboto;
`;


const NoTitle = styled(Col)``;

const Brand = () => {
    const { menuOuvert } = useLayoutContext();
    return (
        <SBrand>
            {menuOuvert ? (
                <Title>
                    CRUD
                </Title>
            ) : (
                <NoTitle />
            )}
        </SBrand>
    );
};

export default Brand;
