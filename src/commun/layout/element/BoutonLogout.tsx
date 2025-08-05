import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from 'antd';
import styled from 'styled-components';
import { useContexteAuth } from 'waxant';

const SAvatar = styled(Avatar)`
    background-color: transparent;
    border-radius: 6px;
    color: ${(props) => props.theme.token.colorPrimary};
    border: 2px solid ${(props) => props.theme.token.colorPrimary};
    padding: 0;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    &:hover {
        background-color: red;
        border: 2px solid red;
        color: #fefefe;
    }
`;
const BoutonLogout = () => {
    const { logout } = useContexteAuth();

    return (
        <SAvatar icon={<FontAwesomeIcon icon={faPowerOff} />} size={30} onClick={logout} />
    );
};

export default BoutonLogout;
