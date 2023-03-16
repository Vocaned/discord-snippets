const V = new function(){
    this.modules = (webpackChunkdiscord_app.push([[Symbol()],{},({c})=>Object.values(c)]));
    webpackChunkdiscord_app.pop();

    // Helpers
    this.findByProps = (...props) => {
        for (let m of this.modules) {
            for (let ex in m.exports) {
                if (m.exports === window) continue;
                if (props.every((x) => m.exports?.[x])) return m.exports;
                if (props.every((x) => m.exports?.[ex]?.[x])) return m.exports[ex];
            }
        }
    }
    this.dispatch = (event) => this.findByProps('isDispatching').dispatch(event);
    this.getCurrentUser = () => this.findByProps('getUser', 'getUsers').getCurrentUser();
    this.getUser = (user) => this.findByProps('getUser', 'getUsers').getUser(user);
    this.getMember = (guild, member) => this.findByProps('getMember', 'getMembers').getMember(guild, member);
    this.getMessage = (channel, message) => this.findByProps('getMessage').getMessage(channel, message);
    this.getChannel = (channel) => this.findByProps('getChannel').getChannel(channel);
    this.getGuild = (guild) => this.findByProps('getGuild', 'getGuilds').getGuild(guild);
    this.getActionHandlers = (store) => Object.values(this.findByProps('getMessage')._dispatcher._actionHandlers._dependencyGraph.nodes).find(s => s.name === store);
    this.getStore = (store) => this.findByProps('Store').Store.getAll().find(s => s.getName() === store);

    this.mmh3 = (str) => this.findByProps('v3').v3(str);

    this.enableExperiments = () => {
        this.getCurrentUser().flags |= 1; // Give staff flag/badge, required for DevTools
        this.getActionHandlers('DeveloperExperimentStore').actionHandler['CONNECTION_OPEN'](); // Enable experiments
        try{this.getActionHandlers('ExperimentStore').actionHandler['OVERLAY_INITIALIZE']({user:{flags: 1}})} catch {} // This will always throw an error because we don't supply a list of experiments, but it still loads enabled experiments successfully
        this.getActionHandlers('ExperimentStore').storeDidChange() // Apply enabled experiments
    }
    this.overrideExperiment = (id, bucket) => {
        // Both guild and user experiments can be overridden, use `null` bucket to disable
        this.getActionHandlers('ExperimentStore').actionHandler['EXPERIMENT_OVERRIDE_BUCKET']({experimentId: id, experimentBucket: bucket})
    }
    this.getOverrides = () => {
        let vars = this.getStore('ExperimentStore').getSerializedState();
        console.table({...vars['guildExperimentOverrides'], ...vars['userExperimentOverrides']});
    }

    this.getModuleById = (id) => this.modules.find(x => x.id == id);
    this.printModuleById = (id) => {
        for (let c of webpackChunkdiscord_app) if (id in c[1]) return c[1][id].toString();
    }
}()
