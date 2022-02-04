"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const REQUIRED_DEPENDENCIES = [
    '@hotwired/turbo',
    'stimulus',
];
async function instructions(projectRoot, _app, sink) {
    const packageJson = new sink.files.PackageJsonFile(projectRoot);
    const dependencies = Object.keys(packageJson.get().dependencies);
    REQUIRED_DEPENDENCIES.forEach((dependency) => {
        if (!dependencies.includes(dependency)) {
            packageJson.install(dependency, undefined, false);
        }
    });
    const packagesToInstall = packageJson.getInstalls().list;
    if (!packagesToInstall.length) {
        return;
    }
    const spinner = sink.logger.await(`Installing ${sink.logger.colors.grey(packagesToInstall.join(', '))}`);
    try {
        spinner.start();
        packageJson.commit();
        spinner.update('Packages Installed.');
    }
    catch (err) {
        spinner.update('Failed to install packages.');
        sink.logger.fatal(err);
    }
    spinner.stop();
}
exports.default = instructions;
