const Separateur = ({ top = null, marge = null }) => {
    const margin = marge ? marge : top ? top + 'px 0 0 0' : 0;
    return <div style={{ margin }}></div>;
};

export default Separateur;
