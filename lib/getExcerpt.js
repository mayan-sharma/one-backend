const getExcerpt = (str, length, delim, appendix) => {
    if (str.length <= length) return str;

    let excerpt = str.substr(0, length + delim.length);

    const lastDelimIdx = excerpt.lastIndexOf(delim);
    if (lastDelimIdx >= 0) excerpt = excerpt.substr(0, lastDelimIdx);

    if (excerpt) excerpt += appendix;
    return excerpt;
}

module.exports = getExcerpt;