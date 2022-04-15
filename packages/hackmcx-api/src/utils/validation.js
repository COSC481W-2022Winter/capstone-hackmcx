const whitespaceRegex = new RegExp("/^\s*$/");
const imageUrlRegex = new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif|svg))/,'i');

export function isMissingOrWhitespace(str){
    return !str || whitespaceRegex.test(str);
}

export function isValidImageUrl(url){
    return url && imageUrlRegex.test(url)
}