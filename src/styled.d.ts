import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        token: {
            colorPrimary: string;
            colorError: string;
            colorWarning: string;
            [key: string]: any;
        };
    }
}
