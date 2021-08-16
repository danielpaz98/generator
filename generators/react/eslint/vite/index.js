const Generator = require("yeoman-generator");

module.exports = class extends Generator {
	viteConfig() {
		this.fs.copy(this.templatePath("vite.config.js"), this.destinationPath("vite.config.js"));
	}

	jsConfig() {
		this.fs.copy(this.templatePath("jsconfig.json"), this.destinationPath("jsconfig.json"));
	}

	eslintIgnore() {
		this.fs.copy(this.templatePath(".eslintignore"), this.destinationPath(".eslintignore"));
	}

	eslintRc() {
		this.fs.copy(this.templatePath(".eslintrc"), this.destinationPath(".eslintrc"));
	}

	installDevDependencies() {
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
				"vite-react-jsx",
				"vite-plugin-eslint",
			],
			{ "save-dev": true }
		);
	}
};
