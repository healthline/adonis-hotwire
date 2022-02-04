"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppProvider {
    constructor(app) {
        this.app = app;
    }
    register() {
        // Register your own bindings
    }
    async boot() {
        // IoC container is ready
    }
    async ready() {
        // App is ready
    }
    async shutdown() {
        // Cleanup, since app is going down
    }
}
exports.default = AppProvider;
