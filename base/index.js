const Generator = require("yeoman-generator");
const fs = require("fs");

module.exports = class Base extends Generator {
	/**
	 * @param path the template path of your vscode configuration
	 */
	addVsCodeSettings(path) {
		let settingsJSON;
		const settingsToAdd = this.fs.readJSON(path);

		if (settingsToAdd) {
			// CHECK IF THE VSCODE/SETTINGS.JSON EXISTS, IF IT DOES NOT EXIST IT IS CREATED
			if (!fs.existsSync(this.destinationPath(".vscode/settings.json"))) {
				settingsJSON = settingsToAdd;
			} else {
				const prevSettingsJSON = this.fs.readJSON(this.destinationPath(".vscode/settings.json"));
				settingsJSON = { ...prevSettingsJSON, ...settingsToAdd };
			}
		}

		fs.mkdirSync(this.destinationPath(".vscode"), { recursive: true });
		fs.writeFileSync(this.destinationPath(".vscode/settings.json"), JSON.stringify(settingsJSON, null, 2));
	}
};
