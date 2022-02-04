"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTurboStream = void 0;
const isContentStreamOptions = (options) => typeof options.content === 'string';
const getContentFromOptions = async (view, options) => {
    if (!options) {
        return '';
    }
    const content = isContentStreamOptions(options)
        ? await view.renderRaw(options.content, options.locals)
        : await view.render(options.templatePath, options.locals);
    return content;
};
const stream = async (view, target, action, options) => {
    const content = await getContentFromOptions(view, options);
    return `
  <turbo-stream action="${action}" target="${target}">
    <template>
      ${content}
    </template>
  </turbo-stream>
  `;
};
const streamActionHandler = (action, { response }, view) => {
    return async (target, options) => {
        response.header('Content-Type', 'text/vnd.turbo-stream.html; charset=utf-8');
        response.status(200);
        response.send(await stream(view, target, action, options));
    };
};
const buildTurboStream = (httpContext, view) => {
    return {
        append: streamActionHandler('append', httpContext, view),
        prepend: streamActionHandler('prepend', httpContext, view),
        remove: streamActionHandler('remove', httpContext, view),
        replace: streamActionHandler('replace', httpContext, view),
        update: streamActionHandler('update', httpContext, view),
    };
};
exports.buildTurboStream = buildTurboStream;
/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = (await import('@ioc:Adonis/Lucid/Database')).default
|   const Event = (await import('@ioc:Adonis/Core/Event')).default
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
class HotwireProvider {
    constructor(application) {
        this.application = application;
    }
    register() {
        // Register your own bindings
    }
    async boot() {
        // All bindings are ready, feel free to use them
        this.application.container.withBindings([
            'Adonis/Core/HttpContext',
            'Adonis/Core/View',
        ], (httpContext, view) => {
            httpContext.getter('turboStream', function () {
                return exports.buildTurboStream(this, view);
            });
        });
    }
    async ready() {
        // App is ready
    }
    async shutdown() {
        // Cleanup, since app is going down
    }
}
exports.default = HotwireProvider;
HotwireProvider.needsApplication = true;
