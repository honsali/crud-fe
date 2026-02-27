import type { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';

const Composant = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

type BlocProps = {
    style?: CSSProperties;
    marge?: string;
    largeur?: string;
    fond?: 'transparent' | 'blanc' | 'clair' | 'fonce';
    children?: ReactNode;
};

const Bloc = (props: BlocProps) => {
    const { style, marge = '0', largeur = '100%', fond = 'transparent', children } = props;
    const toBg = { transparent: 'transparent', blanc: '#FFFFFF', clair: '#F5F7FB', fonce: '#e9e5e0' };

    return <Composant style={{ ...(style ?? {}), padding: marge, width: largeur, background: toBg[fond] }}>{children}</Composant>;
};

export default Bloc;
