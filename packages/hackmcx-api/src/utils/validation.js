const whitespaceRegex = new RegExp("/^\s*$/");

export function isMissingOrWhitespace(str){
    return !str || whitespaceRegex.test(str);
}