import { CheckOutlined, LayoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

const SAvatar = styled(Avatar)`
    background-color: #fcfcfc;
    border-radius: 6px;
    color: #999;
    border: 1px solid #999;
    padding: 0;
    cursor: pointer;

    &:hover {
        color: #777;
    }
`;
const LayoutManager = () => {
    const [menuLarge, setMenuLarge] = useState(true);
    const [documentLarge, setDocumentLarge] = useState(true);
    const items: MenuProps['items'] = [
        {
            key: '1',
            icon: <CheckOutlined style={{ color: menuLarge ? '#555' : 'transparent' }} />,
            onClick: () => setMenuLarge(!menuLarge),
            label: 'Menu Large',
        },
        {
            key: '2',
            icon: <CheckOutlined style={{ color: documentLarge ? '#555' : 'transparent' }} />,
            onClick: () => setDocumentLarge(!documentLarge),
            label: 'Document Large',
        },
    ];
    return (
        <Dropdown menu={{ items }} placement="bottom" arrow>
            <SAvatar shape="square" size={40} icon={<LayoutOutlined />} />
        </Dropdown>
    );
};
export default LayoutManager;
