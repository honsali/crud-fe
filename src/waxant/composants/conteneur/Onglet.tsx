import type { FC, Key, ReactNode } from 'react';

export interface OngletProps {
    key: Key;
    entete?: ReactNode;
    badge?: ReactNode;
    children: ReactNode;
    disabled?: boolean;
}

const Onglet: FC<OngletProps> = ({ children }) => <>{children}</>;

export default Onglet;
