// Copy the contents of https://cdn.jsdelivr.net/npm/buttplug@3.0.0/dist/web/buttplug.min.js into the console first !!
// Make sure an Intiface Server is running

let buttplugio = async (url, channels, regex, control)=>{
    let currentUser = findByProps('getCurrentUser').getCurrentUser().id;

    let vibrate = (client, speed, duration)=>{
        speed = Math.min(Math.max(speed, 0), 1);
        duration = Math.min(duration, 30000);
        for (let d of client.devices) {
            if (d.vibrateAttributes) d.vibrate(speed)
            else if (d.oscillateAttributes) d.oscillate(speed);
            else if (d.rotateAttributes) d.rotate(speed);
            else continue;
            setTimeout(()=>{d.stop()}, duration);
        }
    }

    // Change these variables to modify the default vibrations!
    let speed = 0.5; // 0.0 - 1.0
    let duration = 500; // ms

    let connector = new Buttplug.ButtplugBrowserWebsocketClientConnector(url);
    let client = new Buttplug.ButtplugClient('Discord Snipper');
    client.addListener('deviceadded', async d=>{console.log('Device connected:', d.name, d.hasBattery ? `(Battery: ${await d.battery() * 100}%)` : '')});
    client.addListener('deviceremoved', d=>{console.log('Device disconnected:', d.name)});

    await client.connect(connector);
    await client.startScanning();
    console.log('Scanning for devices.')

    let alive = true;
    findByProps('_dispatch').addInterceptor(e => {
        if (!client.connected) {if (alive) {console.log('Disconnected from Intiface. Run the snippet again to reconnect.'); alive = false}; return}

        if (e.type === 'RPC_NOTIFICATION_CREATE') vibrate(client, speed, duration);
        else if (e.type === 'MESSAGE_CREATE' && channels.includes(e.channelId) && e.message.author.id !== currentUser) {
            if (regex && !regex.test(e.message.content)) return;

            let c = e.message.content.match(/^bzz\.(\d+)\.(\d+)$/);
            if (control && c) vibrate(client, parseInt(c[1])/100, parseInt(c[2]));
            else vibrate(client, speed, duration);
        }
    });
}

// Arguments: url, channels, regex
// url: Websocket URL of your Intiface server.
// channels: Array of channel IDs. Messages sent to these channels will vibrate your buttplug.
// regex: A regex that must match in order to trigger vibration. Using `null` means all messages sent to `channels` will vibrate.
// control: Boolean, if enabled, other people can control the speed and duration using the syntax `bzz.[speed 0-100].[duration ms, max 30000]`
await buttplugio('ws://127.0.0.1:12345', ['867746422027452426'], null, false);
//await buttplugio('ws://127.0.0.1:12345', ['867746422027452426', '1116311441117556766'], /buttplug/, true);
