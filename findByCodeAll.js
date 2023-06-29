_mods = webpackChunkdiscord_app.push([[Symbol()],{},({c})=>Object.values(c)]);webpackChunkdiscord_app.pop();

findByCodeAll = (...code) => {
    let f=[];
    for (let m of _mods) {
        if (code.every(c=>typeof m.exports==="function"&&m.exports.toString().includes(c))) f.push(m.exports);
        for (let ex in m.exports) {
            if (code.every(c=>typeof m.exports?.[ex]==="function"&&m.exports?.[ex].toString().includes(c))) f.push(m.exports[ex]);
        }
    }
    return f;
}
