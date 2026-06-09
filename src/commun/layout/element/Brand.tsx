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
        height: 28px;
    }
`;

const Title = styled(Col)`
    margin: 6px 0 0 8px;
`;

const Sin = styled.div`
    color: #faad14;
    font-size: 18px;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: 3.6px;
`;

const Corpo = styled.div`
    color: #62b01e;
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 1px;
`;

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
                    <Sin>SINCORPO</Sin>
                    <Corpo>wafa assurance</Corpo>
                </Title>
            ) : (
                <NoTitle />
            )}
        </SBrand>
    );
};

export default Brand;
