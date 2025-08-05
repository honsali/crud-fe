
const imprimer = (data) => {
    const url = URL.createObjectURL(data);
    window.open(url, '_blank');
};

const telechargerFichier = (response, nomFichier) => {
    const contentType = response.headers['content-type'];
    const blob = new Blob([response.data], { type: contentType });
    const url = window.URL.createObjectURL(blob);

    if (contentType === 'application/rtf') {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${nomFichier}.rtf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(url, '_blank');
    }
};

const fileUtil = {
    imprimer,
    telechargerFichier,
};

export default fileUtil;