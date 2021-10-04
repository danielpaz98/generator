const Generator = require("yeoman-generator");

module.exports = class extends Generator {
	initializing() {
		this.fs.copy(this.templatePath(".editorconfig"), this.destinationPath(".editorconfig"));
		this.fs.copy(this.templatePath(".prettierrc"), this.destinationPath(".prettierrc"));
		this.fs.copy(this.templatePath(".npmrc"), this.destinationPath(".npmrc"));
	}
};
