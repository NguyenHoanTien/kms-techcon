class Configs {
    constructor() {
        if (!Configs.instance) {
            this.apiHTTP = 'http://localhost:3001';
            this.monitorWS = 'ws://localhost:3003';
            Configs.instance = this;
        }
        return Configs.instance;
    }

    setConfig({apiHTTP, monitorWS}) {
        this.apiHTTP = apiHTTP;
        this.monitorWS = monitorWS;
    }


    getConfig() {
        return {apiHTTP: this.apiHTTP, monitorWS: this.monitorWS}
    }
}

const ConfigInstance = new Configs();

export default ConfigInstance;
