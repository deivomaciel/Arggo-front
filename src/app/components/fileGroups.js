// PDF: pdf
// Documentos de texto: doc, docx, ODT, OTT
// Planilhas: xls, xlsx, ODP, OTP

const extensionsGroups = {
    documents: ['pdf', 'doc', 'docx', 'ODT', 'OTT', 'xls', 'xlsx', 'ODP', 'OTP', 'txt'], // Documents
    image: ['jpeg','jpg', 'png', 'gif', 'svg', 'jfif'] // Images
}

const getFileType = type => {
    for(const groups in extensionsGroups) {
        if(extensionsGroups[groups].includes(type)) return groups
    }
}

export default getFileType