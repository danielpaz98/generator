const Generator = require("../../../../base");

module.exports = class extends Generator {
	initializing() {
		this.addVsCodeSettings(this.templatePath(".vscode/settings.json"));
		this.fs.copy(this.templatePath("vite.config.js"), this.destinationPath("vite.config.js"));
		this.fs.copy(this.templatePath("jsconfig.json"), this.destinationPath("jsconfig.json"));
		this.fs.copy(this.templatePath(".eslintignore"), this.destinationPath(".eslintignore"));
		this.fs.copy(this.templatePath(".eslintrc"), this.destinationPath(".eslintrc"));
	}

	end() {
		this.npmInstall(
			[
				"prettier",
				"eslint",
				"eslint-config-prettier",
				"eslint-config-standard",
				"eslint-plugin-import",
				"eslint-plugin-node",
				"eslint-plugin-promise",
				"eslint-plugin-vue",
				"vite-plugin-eslint",
			],
			{ "save-dev": true }
		);
	}
};
