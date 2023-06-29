(e=>{
    _mods=webpackChunkdiscord_app.push([[Symbol()],{},({c})=>Object.values(c)]);webpackChunkdiscord_app.pop();findByProps=(...props)=>{for(let m of _mods){try{if(!m.exports||m.exports===window){continue}if(props.every((x)=>m.exports?.[x])){return m.exports}for(let ex in m.exports){if(props.every((x)=>m.exports?.[ex]?.[x])){return m.exports[ex]}}}catch{}}};
    let res={};
    for (let guild of Object.values(findByProps('getGuild', 'getGuilds').getGuilds())) {
        b = findByProps('getGuildExperimentBucket').getGuildExperimentBucket(e, guild.id).toString();
        if (!Object.keys(res).includes(b)) res[b] = [];
        res[b].push(`${guild.id} - ${guild.name}`);
    }
    for (let b of Object.entries(res)) {
        console.groupCollapsed('Bucket', b[0]);
        console.log(b[1].join('\n'));
        console.groupEnd();
    }
})('2023-03_improved_message_markdown_guild')
