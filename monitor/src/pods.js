class Pods {
    constructor() {
        if (!Pods.instance) {
            this._pods = [];
            Pods.instance = this;
        }
        return Pods.instance;
    }

    get pods() {
        return this._pods;
    }

    add(podId) {
        this._pods.push(podId);
    }

    remove(podId) {
        this._pods = this._pods.filter((pId) => pId !== podId);
    }
}

const PodsInstance = new Pods();

module.exports = PodsInstance;
