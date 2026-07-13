const revokeObjectUrl = (url: string) => {
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const imprimer = (data) => {
    const url = URL.createObjectURL(data);
    window.open(url, '_blank');
    revokeObjectUrl(url);
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

    revokeObjectUrl(url);
};

const fileUtil = {
    imprimer,
    telechargerFichier,
};

export default fileUtil;