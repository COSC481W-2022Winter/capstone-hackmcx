const whitespaceRegex = /^\s*$/.compile();

export function isMissingOrWhitespace(str){
    return !str || whitespaceRegex.test(str);
}