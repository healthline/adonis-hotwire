/// <reference types="@adonisjs/application/build/adonis-typings" />
import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import { ViewContract } from '@ioc:Adonis/Core/View';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
export declare const buildTurboStream: (httpContext: HttpContextContract, view: ViewContract) => HttpContextContract['turboStream'];
export default class HotwireProvider {
    protected application: ApplicationContract;
    static needsApplication: boolean;
    constructor(application: ApplicationContract);
    register(): void;
    boot(): Promise<void>;
    ready(): Promise<void>;
    shutdown(): Promise<void>;
}
