## [5.0.2](https://github.com/kreuzerk/svg-to-ts/compare/v5.0.1...v5.0.2) (2020-08-25)


### Bug Fixes

* **exitcodes:** add propper exit codes on failure ([902d09c](https://github.com/kreuzerk/svg-to-ts/commit/902d09cfaec55d95700c72ae97a19ce2ac349fd9))

## [5.0.1](https://github.com/kreuzerk/svg-to-ts/compare/v5.0.0...v5.0.1) (2020-06-28)


### Bug Fixes

* **logo:** change logo ([18d60ed](https://github.com/kreuzerk/svg-to-ts/commit/18d60edfe25f0ea7cbf4f2427c40277e98623779))

# [5.0.0](https://github.com/kreuzerk/svg-to-ts/compare/v4.4.0...v5.0.0) (2020-06-16)

### Bug Fixes

* **args:** use passed delimiter or default ([9d2a125](https://github.com/kreuzerk/svg-to-ts/commit/9d2a125cc090ce03f5997261d1ad2542ed79a964))
* **objectconvertion:** respect delimiter ([b0b307a](https://github.com/kreuzerk/svg-to-ts/commit/b0b307aed6a4df53c1a9cd9aaef63470d3b540f0))


### Features

* **args:** add shortcut for convertionType ([f061efc](https://github.com/kreuzerk/svg-to-ts/commit/f061efc62af4373db1ad465a23e21e41da5efec1))
* **converting:** add new convertion option to convert svg-icons to objects ([9459f36](https://github.com/kreuzerk/svg-to-ts/commit/9459f36b33075b3bef712dce2e4ca3833529a97d))
* **convertionOptions:** add new convertion options ([4886eef](https://github.com/kreuzerk/svg-to-ts/commit/4886eef17f2df0995d2d0ddfd37b30b8bafea22b))
* **defaultexport:** use default export if no objectname is specified ([d5c8635](https://github.com/kreuzerk/svg-to-ts/commit/d5c86354076a93c8e485154d6a4b60dc43071c13))
* **export:** add possibility for default exports ([4246587](https://github.com/kreuzerk/svg-to-ts/commit/42465877ef9e1c68a27627c0d42c8ff59cae11e2))

### BREAKING CHANGES

* **options:** conversion option is required

# [4.3.0](https://github.com/kreuzerk/svg-to-ts/compare/v4.2.3...v4.3.0) (2020-06-04)

### Features

- **svgo:** automatically prefix svg ids with filename ([5bb989b](https://github.com/kreuzerk/svg-to-ts/commit/5bb989b5a8238e9d7c865d01a5b4a8852fbdba96))

## [4.2.3](https://github.com/kreuzerk/svg-to-ts/compare/v4.2.2...v4.2.3) (2020-06-04)

### Bug Fixes

- **svgo:** correctly pick up options from external config file ([9b8d138](https://github.com/kreuzerk/svg-to-ts/commit/9b8d138ddf080fe80cf29f83a2dca54c6c3b5eaa))

## [4.2.2](https://github.com/kreuzerk/svg-to-ts/compare/v4.2.1...v4.2.2) (2020-05-05)

### Bug Fixes

- **prefix:** allow empty prefixes ([6fa8f1f](https://github.com/kreuzerk/svg-to-ts/commit/6fa8f1f1f9ac61b71b75cef3ec2c48b4e1115242))

## [4.2.1](https://github.com/kreuzerk/svg-to-ts/compare/v4.2.0...v4.2.1) (2020-04-12)

### Bug Fixes

- **docs:** add missing options for single file conversion ([0c6c3e1](https://github.com/kreuzerk/svg-to-ts/commit/0c6c3e1684b3532d436a6fef4d53b1998efe56a1))

# [4.2.0](https://github.com/kreuzerk/svg-to-ts/compare/v4.1.1...v4.2.0) (2020-04-12)

### Features

- **config:** add options to not generate type and to generate type object ([9e120b3](https://github.com/kreuzerk/svg-to-ts/commit/9e120b32342d470b2aef57563d775e7427b8913c))
- **config:** add options to not generate type and to generate type object ([8bbec6f](https://github.com/kreuzerk/svg-to-ts/commit/8bbec6f1ee541027bb5bfc886122f58def6edac6))

## [4.1.1](https://github.com/kreuzerk/svg-to-ts/compare/v4.1.0...v4.1.1) (2020-03-28)

### Bug Fixes

- **escaping:** Use template literals instead of ' quotes to encapsulate svgs, as the quote character can occur in svgs. ([a5fd0a4](https://github.com/kreuzerk/svg-to-ts/commit/a5fd0a42fb7809bcdd5492df7d3d6625386e6b88))

# [4.1.0](https://github.com/kreuzerk/svg-to-ts/compare/v4.0.5...v4.1.0) (2020-03-25)

### Bug Fixes

- **args:** update args ([09fdd27](https://github.com/kreuzerk/svg-to-ts/commit/09fdd274722c8da13327889099b81180c8a012ce))

### Features

- **svgo:** use configuration to config svgo ([de279ae](https://github.com/kreuzerk/svg-to-ts/commit/de279ae76fdcc664b9dc5634bda340145cef2787))
- **svgoconfig:** accept svgo config as parameter ([b2466e2](https://github.com/kreuzerk/svg-to-ts/commit/b2466e2a8fdde0effc20768ca943d635071fa2f6))

## [4.0.5](https://github.com/kreuzerk/svg-to-ts/compare/v4.0.4...v4.0.5) (2020-03-25)

### Bug Fixes

- **args:** rename preCompileSources to compileSources ([556203b](https://github.com/kreuzerk/svg-to-ts/commit/556203b309e8232e55f956882c70fcadca317650))

## [4.0.4](https://github.com/kreuzerk/svg-to-ts/compare/v4.0.3...v4.0.4) (2020-03-25)

### Bug Fixes

- **readme:** fix API in README ([f8e547b](https://github.com/kreuzerk/svg-to-ts/commit/f8e547b3a251bf26d58e626d7491c073feddfb85))

## [4.0.3](https://github.com/kreuzerk/svg-to-ts/compare/v4.0.2...v4.0.3) (2020-03-23)

### Bug Fixes

- **README:** link blogpost with step to step guide ([be96c5f](https://github.com/kreuzerk/svg-to-ts/commit/be96c5f8a1ff9bef6dd46e6e66dc6d8accfb239c))

## [4.0.2](https://github.com/kreuzerk/svg-to-ts/compare/v4.0.1...v4.0.2) (2020-03-23)

### Bug Fixes

- **image:** rename generated file example ([1427eae](https://github.com/kreuzerk/svg-to-ts/commit/1427eae48236b14d8a94c6a45ea6f7c45ddb15e3))
- **previewimage:** adjust image path ([6aea6d1](https://github.com/kreuzerk/svg-to-ts/commit/6aea6d1535de400c39c9a811a23a34688a106204))

## [4.0.1](https://github.com/kreuzerk/svg-to-ts/compare/v4.0.0...v4.0.1) (2020-03-23)

### Bug Fixes

- **image:** overwrite example src image ([2fa0d9f](https://github.com/kreuzerk/svg-to-ts/commit/2fa0d9f29b0817ba0430758b09c1fff98ea11ae2))

# [4.0.0](https://github.com/kreuzerk/svg-to-ts/compare/v3.5.1...v4.0.0) (2020-03-23)

### Features

- **optimizeforlazyloading:** add compile sources flag ([b177737](https://github.com/kreuzerk/svg-to-ts/commit/b17773702e33d67956fb85cdaa3fd3d01ea621dc))

### BREAKING CHANGES

- **optimizeforlazyloading:** Rename preCompile sources to compileSources

## [3.5.1](https://github.com/kreuzerk/svg-to-ts/compare/v3.5.0...v3.5.1) (2020-03-18)

### Bug Fixes

- **helpmenu:** add typescript as dependency ([65655e5](https://github.com/kreuzerk/svg-to-ts/commit/65655e554b250fdac957334336965ca954c58c0a))

# [3.5.0](https://github.com/kreuzerk/svg-to-ts/compare/v3.4.0...v3.5.0) (2020-03-15)

### Features

- **modelOutput:** add additional model output path ([614b37a](https://github.com/kreuzerk/svg-to-ts/commit/614b37a485bf2ea1a789202a1385d1772509111b))
- **modelOutput:** add warning icon ([8bde4d8](https://github.com/kreuzerk/svg-to-ts/commit/8bde4d890a88c2208e3cef5ad94d559420bb7d36))

# [3.4.0](https://github.com/kreuzerk/svg-to-ts/compare/v3.3.2...v3.4.0) (2020-03-15)

### Features

- **precompilation:** add flag to precompile sources ([0f59a83](https://github.com/kreuzerk/svg-to-ts/commit/0f59a83e16af9f5f73e33a068c9f8d0fe8322e97))

## [3.3.2](https://github.com/kreuzerk/svg-to-ts/compare/v3.3.1...v3.3.2) (2020-03-11)

### Bug Fixes

- **modelfile:** remove output path ([9f03426](https://github.com/kreuzerk/svg-to-ts/commit/9f03426a0fbd8ea39e109c2d73f38d75c9d72620))

## [3.3.1](https://github.com/kreuzerk/svg-to-ts/compare/v3.3.0...v3.3.1) (2020-03-10)

### Bug Fixes

- **compile:** do not compile typescript sources ([ef8b79d](https://github.com/kreuzerk/svg-to-ts/commit/ef8b79dc3dc2db329b14754aa3b341efa76d6a80))

# [3.3.0](https://github.com/kreuzerk/svg-to-ts/compare/v3.2.1...v3.3.0) (2020-03-08)

### Features

- **config:** read config from package.json, rc file and args ([524655f](https://github.com/kreuzerk/svg-to-ts/commit/524655fea3518e57c86c04896bb6c1ad6d4e4151))

## [3.2.1](https://github.com/kreuzerk/svg-to-ts/compare/v3.2.0...v3.2.1) (2020-03-05)

### Bug Fixes

- **icon:** generate name as type any ([08bd563](https://github.com/kreuzerk/svg-to-ts/commit/08bd563eb14fad4f0ed4957a907b485e62dd02bc))

# [3.2.0](https://github.com/kreuzerk/svg-to-ts/compare/v3.1.4...v3.2.0) (2020-03-05)

### Features

- **model:** generate model to a different path ([c10d322](https://github.com/kreuzerk/svg-to-ts/commit/c10d3223a7223486e282229289f19438224eadb7))

## [3.1.4](https://github.com/kreuzerk/svg-to-ts/compare/v3.1.3...v3.1.4) (2020-03-04)

### Bug Fixes

- **compiler:** emit on error ([edb1ea7](https://github.com/kreuzerk/svg-to-ts/commit/edb1ea770bd539d61979709e1c4cef43ab6ad474))

## [3.1.3](https://github.com/kreuzerk/svg-to-ts/compare/v3.1.2...v3.1.3) (2020-03-04)

### Bug Fixes

- **compiler:** emit compiled sources ([592ef68](https://github.com/kreuzerk/svg-to-ts/commit/592ef682addcfe76b77a4ac4d2698ccefb0673a1))

## [3.1.2](https://github.com/kreuzerk/svg-to-ts/compare/v3.1.1...v3.1.2) (2020-03-04)

### Bug Fixes

- **compiler:** reduce strictness ([19f6480](https://github.com/kreuzerk/svg-to-ts/commit/19f6480b9d8c3c047e99b5398c80f754be8db6c1))

## [3.1.1](https://github.com/kreuzerk/svg-to-ts/compare/v3.1.0...v3.1.1) (2020-03-04)

### Bug Fixes

- **generation:** fix generated folder name ([680f1f1](https://github.com/kreuzerk/svg-to-ts/commit/680f1f139403a69b93caec89b37fe78a1b565cd1))

# [3.1.0](https://github.com/kreuzerk/svg-to-ts/compare/v3.0.0...v3.1.0) (2020-03-04)

### Features

- **compiler:** compile ts files ([a911b7c](https://github.com/kreuzerk/svg-to-ts/commit/a911b7cfe78e58afeb0ca3db6cb0cf2f046f9c9a))
- **converter:** convert to multiple files ([fe13a4c](https://github.com/kreuzerk/svg-to-ts/commit/fe13a4c21d5d861956682e24b5abfe7b6ea0f074))
- **multifiles:** generate multiple files ([d933e1e](https://github.com/kreuzerk/svg-to-ts/commit/d933e1e03e4f9f5c799b9b2a1f2cda7a7bea4105))

# [3.0.0](https://github.com/kreuzerk/svg-to-ts/compare/v2.2.1...v3.0.0) (2020-02-25)

### Features

- **input:** Handle regex as sourceDir ([12d7bf9](https://github.com/kreuzerk/svg-to-ts/commit/12d7bf94002963a33938f68c87404a9c84fc884b))
- **sources:** use source files as regex ([69547dd](https://github.com/kreuzerk/svg-to-ts/commit/69547dd289ef71435dda2d644cb10fc81c2ba202))

### BREAKING CHANGES

- **sources:** srcDirectories is gone and we should now use srcFiles

## [2.2.1](https://github.com/kreuzerk/svg-to-ts/compare/v2.2.0...v2.2.1) (2020-02-10)

### Bug Fixes

- **conversion:** check to allow only svg files ([9fc3111](https://github.com/kreuzerk/svg-to-ts/commit/9fc31110f783998668671d043be9cadf962fefc0))

# [2.2.0](https://github.com/kreuzerk/svg-to-ts/compare/v2.1.0...v2.2.0) (2019-12-31)

### Features

- **delimiter:** add delimiter option to allow a custom delimiter ([c69358e](https://github.com/kreuzerk/svg-to-ts/commit/c69358e77aead04444ef7b312de04ed4b547d276))
- **type:** generate the types with the correct delimiter ([c6d1ebc](https://github.com/kreuzerk/svg-to-ts/commit/c6d1ebcb652432de2890f8a28b9a9f24da6ada0e))

# [2.1.0](https://github.com/kreuzerk/svg-to-ts/compare/v2.0.3...v2.1.0) (2019-12-13)

### Bug Fixes

- **types:** Fix error in type generation when last item is a folder ([c70c15d](https://github.com/kreuzerk/svg-to-ts/commit/c70c15d23348c0164869fb2f788ff585b46f4229))

### Features

- **input:** Handle multiple sourceDir ([fe9fd84](https://github.com/kreuzerk/svg-to-ts/commit/fe9fd84c15de90676366160ad6e0896891e92cf7))

## [2.0.3](https://github.com/kreuzerk/svg-to-ts/compare/v2.0.2...v2.0.3) (2019-12-10)

### Bug Fixes

- **input:** Exclude folders to source directory ([d2878a7](https://github.com/kreuzerk/svg-to-ts/commit/d2878a79cc0555bdcc507f72280cd701bd2d4928))

## [2.0.2](https://github.com/kreuzerk/svg-to-ts/compare/v2.0.1...v2.0.2) (2019-12-10)

### Bug Fixes

- **type:** add missing export statement ([ddab6ae](https://github.com/kreuzerk/svg-to-ts/commit/ddab6ae40e241b3b38948de2426afee853625fdb))

## [2.0.1](https://github.com/kreuzerk/svg-to-ts/compare/v2.0.0...v2.0.1) (2019-12-10)

### Bug Fixes

- **conversion:** use camel case for variable names ([89acef3](https://github.com/kreuzerk/svg-to-ts/commit/89acef3c6904c68f9327cd746776ff3856f9551d))

# [2.0.0](https://github.com/kreuzerk/svg-to-ts/compare/v1.1.2...v2.0.0) (2019-12-10)

### Features

- **conversion:** use snake case instead of camel case ([8963ce7](https://github.com/kreuzerk/svg-to-ts/commit/8963ce7eb8bda578270570542013a7950a9648ac))

### BREAKING CHANGES

- **conversion:** Generate types and variable names in snake case instead of camel case

## [1.1.2](https://github.com/kreuzerk/svg-to-ts/compare/v1.1.1...v1.1.2) (2019-12-09)

### Bug Fixes

- **output:** generate output with single quotes instead of double quotes ([bbd38f6](https://github.com/kreuzerk/svg-to-ts/commit/bbd38f69f88d614ef715f33edd31d0d4c3671e93))

## [1.1.1](https://github.com/kreuzerk/svg-to-ts/compare/v1.1.0...v1.1.1) (2019-12-09)

### Bug Fixes

- **bin:** fix wrong path to bin file ([bbb9565](https://github.com/kreuzerk/svg-to-ts/commit/bbb95658e4946171d7198f42fba9aafe09364a93))

# [1.1.0](https://github.com/kreuzerk/svg-to-ts/compare/v1.0.1...v1.1.0) (2019-12-09)

### Features

- **filename:** accept fileName as input property ([b99809d](https://github.com/kreuzerk/svg-to-ts/commit/b99809dbcee4e13387c76868eae22590e0e12418))

## [1.0.1](https://github.com/kreuzerk/svg-to-ts/compare/v1.0.0...v1.0.1) (2019-12-05)

### Bug Fixes

- **camelcase:** fix camel case is not a function ([dd6af14](https://github.com/kreuzerk/svg-to-ts/commit/dd6af14a1f4f43d816521d4a0e4799d4fbbe8cf7))

# 1.0.0 (2019-11-21)

### Features

- **converting:** optimize output ([fa6f42e](https://github.com/kreuzerk/svg-to-ts/commit/fa6f42ef6ad7d4ee3b72cd5aeb87c768a9298d3b))
- **prettier:** integrate prettier to format final Typescript ([9284eac](https://github.com/kreuzerk/svg-to-ts/commit/9284eac2e3de4d2d4589b98fff4d24beaf9850e7))
- **setup:** setup library ([6b42a67](https://github.com/kreuzerk/svg-to-ts/commit/6b42a6788ef8d0a3c14495d38377bcc9b26545e1))
