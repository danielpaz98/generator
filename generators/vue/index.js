const Generator = require("yeoman-generator");

module.exports = class extends Generator {
	async prompting() {
		const choicesList = [
			// { name: "vue" }, { name: "nuxt" },
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
					{
						name: "postcss",
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
			{
				type: "list",
				name: "postcss",
				message: "Which postcss config do you want?",
				when: (answers) => answers.features.includes("postcss"),
				choices: choicesList,
			},
		]);
	}

	addFeatureEslint() {
		if (this.answers.eslint) {
			this.composeWith(require.resolve("../editor-config"));

			if (this.answers.eslint.includes("nuxt")) {
				this.composeWith(require.resolve("./eslint/nuxt"));
			}

			if (this.answers.eslint.includes("vue")) {
				this.composeWith(require.resolve("./eslint/vue"));
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

	addFeaturePostCSS() {
		if (this.answers.postcss) {
			if (this.answers.postcss.includes("nuxt")) {
				this.composeWith(require.resolve("./postcss/nuxt"));
			}

			if (this.answers.postcss.includes("vue")) {
				this.composeWith(require.resolve("./postcss/vue"));
			}

			if (this.answers.postcss.includes("vite")) {
				this.composeWith(require.resolve("./postcss/vite"));
			}
		}
	}

	// addFeatureSnippets() {
	// 	if (this.answers.features.includes("snippets")) {
	// 		this.composeWith(require.resolve("./snippets"));
	// 	}
	// }
};
