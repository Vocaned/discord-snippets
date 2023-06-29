_mods = webpackChunkdiscord_app.push([[Symbol()],{},({c})=>Object.values(c)]);webpackChunkdiscord_app.pop();

findByPropsAll = (...props) => {
    let f = [];
    for (let m of _mods) {
        try {
            if (!m.exports||m.exports===window) continue;
            if (props.every(x=>m.exports?.[x])) f.push(m.exports);
            for (let ex in m.exports) {
                if (props.every(x=>m.exports?.[ex]?.[x])) f.push(m.exports[ex]);
            }
        } catch {}
    }
    return f;
}
