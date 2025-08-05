import styled from 'styled-components';

const Composant = styled.div`
    hr {
        margin: 0 0 10px 0;
        border: none;
        border-top: 1px solid ${(props) => props.theme.token.colorPrimary};
    }
`;
const ChampSeparateur = (props) => {
    return (
        <Composant>
            <hr />
        </Composant>
    );
};

export default ChampSeparateur;
