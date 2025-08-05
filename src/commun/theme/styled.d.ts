import type { ThemeConfig } from 'antd/es/config-provider/context';
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        token: ThemeConfig['token'];
    }
}
