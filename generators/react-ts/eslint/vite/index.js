const Generator = require("../../../../base");

module.exports = class extends Generator {
	initializing() {
		this.addVsCodeSettings(this.templatePath(".vscode/settings.json"));
		this.fs.copy(this.templatePath("vite.config.ts"), this.destinationPath("vite.config.ts"));
		this.fs.copy(this.templatePath("tsconfig.json"), this.destinationPath("tsconfig.json"));
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
				"eslint-plugin-react",
				"eslint-plugin-react-hooks",
				"@typescript-eslint/eslint-plugin",
				"@typescript-eslint/parser",
				"vite-plugin-eslint",
			],
			{ "save-dev": true }
		);
	}
};
