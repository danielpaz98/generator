const Generator = require("yeoman-generator");
const fs = require("fs");

module.exports = class extends Generator {
	initializing() {
		const pkgJson = {
			"simple-git-hooks": {
				"pre-commit": "npx lint-staged",
			},
			"lint-staged": {
				"src/**/*.{js,vue,json}": ["eslint --fix", "prettier --write"],
			},
		};

		const packageJsonContent = this.fs.readJSON(this.destinationPath("package.json"));
		const newPackageJsonContent = { ...packageJsonContent, ...pkgJson };
		fs.writeFileSync(this.destinationPath("package.json"), JSON.stringify(newPackageJsonContent, null, 2));

		// CHECK IF THE GIT FOLDER EXISTS, IF IT DOES NOT EXIST IT IS CREATED
		if (!fs.existsSync(this.destinationPath(".git"))) {
			this.spawnCommand("git", ["init"]);
		}
	}

	end() {
		this.spawnCommandSync("npm", ["install", "--save-dev", "simple-git-hooks", "lint-staged"]);
		this.spawnCommand("npx", ["simple-git-hooks"]);
	}
};
