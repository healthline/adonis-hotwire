"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const standalone_1 = require("@adonisjs/core/build/standalone");
const helpers_1 = require("@poppinss/utils/build/helpers");
class MakeStimulusController extends standalone_1.BaseCommand {
    async run() {
        const stub = path_1.join(__dirname, '..', 'templates', 'StimulusController.txt');
        this.generator
            .addFile(this.name, { pattern: 'snakecase', form: 'singular', extname: '.js', suffix: 'Controller' })
            .stub(stub)
            .useMustache()
            .destinationDir(this.application.resourcesPath('js', 'controllers'))
            .appRoot(this.application.cliCwd || this.application.appRoot)
            .apply({
            filename: this.buildFilename(),
        });
        await this.generator.run();
    }
    buildFilename() {
        const pascalName = helpers_1.string.pascalCase(this.name);
        return pascalName.toLowerCase().endsWith('controller') ? pascalName : `${pascalName}Controller`;
    }
}
/**
 * Command name is used to run the command
 */
MakeStimulusController.commandName = 'make:stimulus_controller';
/**
 * Command description is displayed in the "help" output
 */
MakeStimulusController.description = 'Make a new Stimulus Controller';
MakeStimulusController.settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: false,
    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
};
__decorate([
    standalone_1.args.string({ description: 'Name of the Stimulus Controller' }),
    __metadata("design:type", String)
], MakeStimulusController.prototype, "name", void 0);
exports.default = MakeStimulusController;
