const V = new function(){
    this.modules = (webpackChunkdiscord_app.push([[Symbol()],{},({c})=>Object.values(c)]));
    this.dispatch = (e) => this.modules.find(x=>x?.exports?.Z?.isDispatching).exports.Z.dispatch(e);
    this.getModuleById = (id) => this.modules.find(x => x.id == id);

    this.enableExperiments = () => {
        u = this.modules.find((x)=> x?.exports?.default?.getUsers).exports.default;
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
