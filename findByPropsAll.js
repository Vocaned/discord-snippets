_mods = webpackChunkdiscord_app.push([[Symbol()],{},({c})=>Object.values(c)]);webpackChunkdiscord_app.pop();

findByPropsAll = (...props) => {
    let found = [];
    for (let m of _mods) {
        try {
            if (!m.exports || m.exports === window) continue;
            if (props.every((x) => m.exports?.[x])) found.push(m.exports);

            for (let ex in m.exports) {
                if (props.every((x) => m.exports?.[ex]?.[x])) found.push(m.exports[ex]);
            }
        } catch {}
    }
    return found;
}
