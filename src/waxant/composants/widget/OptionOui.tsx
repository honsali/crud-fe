import { CheckSquareTwoTone } from '@ant-design/icons';
import { theme } from 'antd';

const OptionOui = () => {
    const { token } = theme.useToken();
    return (
        <div>
            <CheckSquareTwoTone twoToneColor={token.colorPrimary} />
        </div>
    );
};

export default OptionOui;
