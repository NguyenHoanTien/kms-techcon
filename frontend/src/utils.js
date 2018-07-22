import Configs from "./configs";

export function generateDownloadURL(name) {
    const {apiHTTP} = Configs.getConfig();
    return name
        ? `${apiHTTP}/images/download/${name}`
        : 'http://via.placeholder.com/550x715'
}
