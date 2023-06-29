// Copy the contents of https://cdn.jsdelivr.net/npm/buttplug@3.0.0/dist/web/buttplug.min.js into the console first !!
// Make sure an Intiface Server is running

let buttplugio = async (url, channels, regex)=>{
    _mods=webpackChunkdiscord_app.push([[Symbol()],{},({c})=>Object.values(c)]);webpackChunkdiscord_app.pop();findByProps=(...props)=>{for(let m of _mods){try{if(!m.exports||m.exports===window){continue}if(props.every((x)=>m.exports?.[x])){return m.exports}for(let ex in m.exports){if(props.every((x)=>m.exports?.[ex]?.[x])){return m.exports[ex]}}}catch{}}};
    let currentUser = findByProps('getCurrentUser').getCurrentUser().id;

    // Change these variables to modify the vibrations!
    let speed = 0.5; // 0.0 - 1.0
    let duration = 500; // ms

    let connector = new Buttplug.ButtplugBrowserWebsocketClientConnector(url);
    let client = new Buttplug.ButtplugClient('Discord Snipper');
    client.addListener('deviceadded', d=>{console.log('Device connected:', d.name)});
    client.addListener('deviceremoved', d=>{console.log('Device disconnected:', d.name)});

    findByProps('_dispatch').addInterceptor(e => {
        if (e.type === 'RPC_NOTIFICATION_CREATE' || (e.type === 'MESSAGE_CREATE' && channels.includes(e.channelId) && e.message.author.id !== currentUser)) {
            if (regex && !regex.test(e.message.content)) return;

            for (let d of client.devices) {
                if (!d.vibrateAttributes.length) continue;
                d.vibrate(speed)
                setTimeout(()=>{d.stop()}, duration);
            }
        }
    });
    await client.connect(connector);
    await client.startScanning();
}

// Arguments: url, channels, regex
// url: Websocket URL of your Intiface server.
// channels: Array of channel IDs. Messages sent to these channels will vibrate your buttplug.
// regex: A regex that must match in order to trigger vibration. Using `null` means all messages sent to `channels` will vibrate.
await buttplugio('ws://127.0.0.1:12345', ['867746422027452426'], null);
//await buttplugio('ws://127.0.0.1:12345', ['867746422027452426', '1116311441117556766'], /buttplug/);
