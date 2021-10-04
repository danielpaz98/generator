const Generator = require("../../../../base");

module.exports = class extends Generator {
	initializing() {
		this.fs.copy(this.templatePath("postcss.config.js"), this.destinationPath("postcss.config.js"));
		this.addVsCodeSettings(this.templatePath(".vscode/settings.json"));
	}

	end() {
		this.npmInstall(["autoprefixer", "postcss-nested"], { "save-dev": true });
	}
};
