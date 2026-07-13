const Separateur = ({ top, marge }: { top?: string | undefined, marge?: string | undefined }) => {
    const margin = marge ? marge : top ? top + 'px 0 0 0' : 0;
    return <div style={{ margin }}></div>;
};

export default Separateur;
