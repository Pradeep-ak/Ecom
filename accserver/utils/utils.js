
function _formUrlEncoded(x) {
    return Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
}

module.exports ={
    formUrlEncoded:_formUrlEncoded
}
