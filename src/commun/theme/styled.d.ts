import { type ThemeConfig } from 'antd';
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        token: ThemeConfig['token'];
    }
}
