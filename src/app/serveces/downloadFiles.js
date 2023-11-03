export const downloadFile = (fileUrl, fileName) => {
    const ancora = document.createElement('a')
    ancora.href = fileUrl
    ancora.download = fileName
    ancora.click()
}