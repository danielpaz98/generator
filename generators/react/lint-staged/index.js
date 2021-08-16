const Generator = require("yeoman-generator");
const fs = require("fs");

module.exports = class extends Generator {
	initial() {
		const pkgJson = {
			"simple-git-hooks": {
				"pre-commit": "npx lint-staged",
			},
			"lint-staged": {
				"src/**/*.{js,jsx,json}": ["eslint --fix", "prettier --write"],
			},
		};

		const packageJsonContent = this.fs.readJSON(this.destinationPath("package.json"));
		const newPackageJsonContent = { ...packageJsonContent, ...pkgJson };
		fs.writeFileSync(this.destinationPath("package.json"), JSON.stringify(newPackageJsonContent, null, 2));

		// CHECK IF EXIST GIT FOLDER
		if (!fs.existsSync(this.destinationPath(".git"))) {
			this.spawnCommand("git", ["init"]);
		}
	}

	installDevDependencies() {
		this.spawnCommandSync("npm", ["install", "--save-dev", "simple-git-hooks", "lint-staged"]);
	}

	addGitHooks() {
		this.spawnCommand("npx", ["simple-git-hooks"]);
	}
};
