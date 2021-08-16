const Generator = require("yeoman-generator");

module.exports = class extends Generator {
	async prompting() {
		this.answers = await this.prompt([
			{
				type: "checkbox",
				name: "features",
				message: "What features do you want?",
				choices: [
					{
						name: "eslint",
						// message: "Coding styles and files config (eslint, editorconfig, etc)",
						checked: true,
					},
					{
						name: "lint-staged",
					},
					// {
					// 	name: "snippets",
					// },
				],
			},
			{
				type: "list",
				name: "eslint",
				message: "Which ESLint config do you want?",
				when: (answers) => answers.features.includes("eslint"),
				choices: [
					{
						name: "react",
					},
					{
						name: "next",
					},
					{
						name: "vite",
					},
				],
			},
		]);
	}

	addFeatureEslint() {
		if (this.answers.eslint) {
			this.composeWith(require.resolve("./eslint/initial"));

			if (this.answers.eslint.includes("next")) {
				this.composeWith(require.resolve("./eslint/next")).on("end", function () {
					if (this.answers.features.includes("lint-staged")) {
						this.composeWith(require.resolve("./lint-staged"));
					}
					if (this.answers.features.includes("snippets")) {
						this.composeWith(require.resolve("./snippets"));
					}
				});
			}

			if (this.answers.eslint.includes("vite")) {
				this.composeWith(require.resolve("./eslint/vite")).on("end", function () {
					if (this.answers.features.includes("lint-staged")) {
						this.composeWith(require.resolve("./lint-staged"));
					}
					if (this.answers.features.includes("snippets")) {
						this.composeWith(require.resolve("./snippets"));
					}
				});
			}
		}
	}

	addFeatureLintStaged() {
		if (!this.answers.eslint && this.answers.features.includes("lint-staged")) {
			this.composeWith(require.resolve("./lint-staged")).on("end", function () {
				if (this.answers.features.includes("snippets")) {
					this.composeWith(require.resolve("./snippets"));
				}
			});
		}
	}

	addFeatureSnippets() {
		if (
			!this.answers.eslint &&
			!this.answers.features.includes("lint-staged") &&
			this.answers.features.includes("snippets")
		) {
			this.composeWith(require.resolve("./snippets"));
		}
	}
};
