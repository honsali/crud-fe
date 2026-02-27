const EnteteDialogue = ({ texte }) => {
    if (texte) {
        return <div style={{ fontWeight: 500 }}> {texte} </div>;
    }
};

export default EnteteDialogue;
