import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useContexteAuth, useI18n } from 'waxant';
import useLayoutContext from '../LayoutContext';
const AvatarContainer = styled.div`
    margin: auto;
    border-radius: 50%;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-avatar {
        background-color: #aaa;
        color:#555;
    } 
`;

const Username = styled.div`
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #DBE2EF;
`;

const Role = styled.div`
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    color: #DBE2EF;
`;

const BlocAvatar = () => {
    const { i18n } = useI18n();
    const { user, role } = useContexteAuth();
    const { menuOuvert } = useLayoutContext();
    const [nameInitial, setNameInitial] = useState('');
    const [roleInitial, setRoleInitial] = useState('');

    useEffect(() => {
        setNameInitial(user ? user
            .split('.')
            .map((name) => name.charAt(0).toUpperCase())
            .join('')
            : '');
    }, [user]);

    useEffect(() => {
        setRoleInitial(role ? i18n(role)
            .split(' ')
            .map((name) => name.charAt(0).toUpperCase())
            .join('.')
            : '');
    }, [role, i18n]);

    if (menuOuvert) {
        return (
            <div>
                <div style={{ marginTop: '60px' }}></div>
                <AvatarContainer>
                    <Avatar src={<FontAwesomeIcon icon={faUser} style={{ fontSize: '36px' }} />} size={68} />
                </AvatarContainer>
                <Username>{user}</Username>
                <Role>{i18n(role)}</Role>
                <div style={{ marginTop: '40px' }}></div>
            </div>
        );
    } else {
        return (
            <div>
                <div style={{ marginTop: '70px', textAlign: 'center' }}></div>
                <AvatarContainer>
                    <Avatar src={<FontAwesomeIcon icon={faUser} />} style={{ fontSize: '20px' }} size={48} />
                </AvatarContainer>
                <Username>{nameInitial}</Username>
                <Role>{roleInitial}</Role>
                <div style={{ marginTop: '50px' }}></div>
            </div>
        );
    }
};
export default BlocAvatar;
