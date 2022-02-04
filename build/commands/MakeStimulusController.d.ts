import { BaseCommand } from '@adonisjs/core/build/standalone';
export default class MakeStimulusController extends BaseCommand {
    /**
     * Command name is used to run the command
     */
    static commandName: string;
    /**
     * Command description is displayed in the "help" output
     */
    static description: string;
    name: string;
    static settings: {
        /**
         * Set the following value to true, if you want to load the application
         * before running the command
         */
        loadApp: boolean;
        /**
         * Set the following value to true, if you want this command to keep running until
         * you manually decide to exit the process
         */
        stayAlive: boolean;
    };
    run(): Promise<void>;
    private buildFilename;
}
