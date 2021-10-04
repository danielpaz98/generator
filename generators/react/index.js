const Generator = require("yeoman-generator");

module.exports = class extends Generator {
	async prompting() {
		const choicesList = [
			// { name: "react" }, { name: "next" },
			{ name: "vite" },
		];

		this.answers = await this.prompt([
			{
				type: "checkbox",
				name: "features",
				message: "What features do you want?",
				choices: [
					{
						name: "eslint",
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
				choices: choicesList,
			},
		]);
	}

	addFeatureEslint() {
		if (this.answers.eslint) {
			this.composeWith(require.resolve("../editor-config"));

			if (this.answers.eslint.includes("next")) {
				this.composeWith(require.resolve("./eslint/next"));
			}

			if (this.answers.eslint.includes("react")) {
				this.composeWith(require.resolve("./eslint/react"));
			}

			if (this.answers.eslint.includes("vite")) {
				this.composeWith(require.resolve("./eslint/vite"));
			}
		}
	}

	addFeatureLintStaged() {
		if (this.answers.features.includes("lint-staged")) {
			this.composeWith(require.resolve("./lint-staged"));
		}
	}

	// addFeatureSnippets() {
	// 	if (this.answers.features.includes("snippets")) {
	// 		this.composeWith(require.resolve("./snippets"));
	// 	}
	// }
};
