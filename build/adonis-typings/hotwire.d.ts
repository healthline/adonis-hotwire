declare module '@ioc:Adonis/Core/HttpContext' {
    import { ViewContract } from '@ioc:Adonis/Core/View';
    type Locals = Parameters<ViewContract['render']>[1];
    interface PartialStreamOptions {
        locals?: Locals;
        templatePath: string;
    }
    interface ContentStreamOptions {
        locals?: Locals;
        content: string;
    }
    type StreamOptions = PartialStreamOptions | ContentStreamOptions;
    type TurboStreamFunction = (target: string, options?: StreamOptions) => Promise<void>;
    interface HttpContextContract {
        turboStream: {
            append: TurboStreamFunction;
            prepend: TurboStreamFunction;
            replace: TurboStreamFunction;
            update: TurboStreamFunction;
            remove: TurboStreamFunction;
        };
    }
}
