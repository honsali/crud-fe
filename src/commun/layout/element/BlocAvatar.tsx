import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar } from 'antd';
import { useMemo } from 'react';
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
        color: #555;
    }
`;

const Username = styled.div`
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #dbe2ef;
`;

const Role = styled.div`
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    color: #dbe2ef;
`;

const initials = (value: string) => value
    .split(/[.\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase())
    .join('.');

const BlocAvatar = () => {
    const { i18n } = useI18n();
    const { user, role } = useContexteAuth();
    const { menuOuvert } = useLayoutContext();
    const roleLabel = role ? i18n(role) : '';
    const nameInitial = useMemo(() => initials(user ?? ''), [user]);
    const roleInitial = useMemo(() => initials(roleLabel), [roleLabel]);

    if (menuOuvert) {
        return (
            <div>
                <div style={{ marginTop: '60px' }} />
                <AvatarContainer>
                    <Avatar src={<FontAwesomeIcon icon={faUser} style={{ fontSize: '36px' }} />} size={68} />
                </AvatarContainer>
                <Username>{user}</Username>
                <Role>{roleLabel}</Role>
                <div style={{ marginTop: '40px' }} />
            </div>
        );
    }

    return (
        <div>
            <div style={{ marginTop: '70px', textAlign: 'center' }} />
            <AvatarContainer>
                <Avatar src={<FontAwesomeIcon icon={faUser} />} style={{ fontSize: '20px' }} size={48} />
            </AvatarContainer>
            <Username>{nameInitial}</Username>
            <Role>{roleInitial}</Role>
            <div style={{ marginTop: '50px' }} />
        </div>
    );
};

export default BlocAvatar;
