const Generator = require("yeoman-generator");

module.exports = class extends Generator {
	editorConfig() {
		this.fs.copy(this.templatePath(".editorconfig"), this.destinationPath(".editorconfig"));
	}

	prettierRc() {
		this.fs.copy(this.templatePath(".prettierrc"), this.destinationPath(".prettierrc"));
	}

	npmRc() {
		this.fs.copy(this.templatePath(".npmrc"), this.destinationPath(".npmrc"));
	}
};
