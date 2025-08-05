import { Col, Row } from 'antd';
import logo from 'assets/images/logo.png';
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
    color: #33AADD;
    font-size: 26px;
    font-weight: 400;
    letter-spacing: 4px;
    font-family: Roboto;
`;

// #88ccee
// #4499DD
// #2277BB
// #33AADD
// 62B01E
const NoTitle = styled(Col)``;

const Brand = () => {
    const { menuOuvert } = useLayoutContext();
    return (
        <SBrand>
            <Logo>
                <img src={logo} alt="logo" />
            </Logo>
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
