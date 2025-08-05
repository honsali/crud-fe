import styled from 'styled-components';

const Composant = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const Bloc = ({ style = null, marge = '0', largeur = '100%', fond = 'transparent', children }) => {

    const toBg = { 'transparent': 'transparent', 'blanc': '#FFFFFFcc', 'clair': '#faf9f7', 'fonce': '#e9e5e0' };

    return <Composant style={{ ...style, padding: marge, width: largeur, background: toBg[fond] }}>{children}</Composant>;
};

export default Bloc;
