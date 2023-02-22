const V = new function(){
    this.modules = (webpackChunkdiscord_app.push([[Symbol()],{},({c})=>Object.values(c)]));
    this.dispatch = (e) => this.findByProps('isDispatching').dispatch(e);
    this.getModuleById = (id) => this.modules.find(x => x.id == id);

    this.findByProps = (...props) => {
        for (let m of this.modules) {
            for (let ex in m.exports) {
                if (props.every((x) => m.exports?.[ex]?.[x])) return m.exports[ex];
            }
        }
    }

    this.enableExperiments = () => {
        u = this.findByProps('getUsers');
        m = Object.values(u._dispatcher._actionHandlers._dependencyGraph.nodes);
        u.__proto__.getCurrentUser().flags |= 1;
        m.find((x)=>x.name === "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]();
        try {m.find((x)=>x.name === "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({user:{flags: 1}})} catch {}
    }
    this.printModuleById = (id) => {
        for (let chunk in webpackChunkdiscord_app) {
            if (!(webpackChunkdiscord_app[chunk] instanceof Array)) continue;
            if (id in webpackChunkdiscord_app[chunk][1]) {
                return webpackChunkdiscord_app[chunk][1][id].toString();
            }
        }
    }
}()
