# [3.3.0](https://github.com/kreuzerk/svg-to-ts/compare/v3.2.1...v3.3.0) (2020-03-08)


### Features

* **config:** read config from package.json, rc file and args ([524655f](https://github.com/kreuzerk/svg-to-ts/commit/524655fea3518e57c86c04896bb6c1ad6d4e4151))

## [3.2.1](https://github.com/kreuzerk/svg-to-ts/compare/v3.2.0...v3.2.1) (2020-03-05)


### Bug Fixes

* **icon:** generate name as type any ([08bd563](https://github.com/kreuzerk/svg-to-ts/commit/08bd563eb14fad4f0ed4957a907b485e62dd02bc))

# [3.2.0](https://github.com/kreuzerk/svg-to-ts/compare/v3.1.4...v3.2.0) (2020-03-05)


### Features

* **model:** generate model to a different path ([c10d322](https://github.com/kreuzerk/svg-to-ts/commit/c10d3223a7223486e282229289f19438224eadb7))

## [3.1.4](https://github.com/kreuzerk/svg-to-ts/compare/v3.1.3...v3.1.4) (2020-03-04)


### Bug Fixes

* **compiler:** emit on error ([edb1ea7](https://github.com/kreuzerk/svg-to-ts/commit/edb1ea770bd539d61979709e1c4cef43ab6ad474))

## [3.1.3](https://github.com/kreuzerk/svg-to-ts/compare/v3.1.2...v3.1.3) (2020-03-04)


### Bug Fixes

* **compiler:** emit compiled sources ([592ef68](https://github.com/kreuzerk/svg-to-ts/commit/592ef682addcfe76b77a4ac4d2698ccefb0673a1))

## [3.1.2](https://github.com/kreuzerk/svg-to-ts/compare/v3.1.1...v3.1.2) (2020-03-04)


### Bug Fixes

* **compiler:** reduce strictness ([19f6480](https://github.com/kreuzerk/svg-to-ts/commit/19f6480b9d8c3c047e99b5398c80f754be8db6c1))

## [3.1.1](https://github.com/kreuzerk/svg-to-ts/compare/v3.1.0...v3.1.1) (2020-03-04)


### Bug Fixes

* **generation:** fix generated folder name ([680f1f1](https://github.com/kreuzerk/svg-to-ts/commit/680f1f139403a69b93caec89b37fe78a1b565cd1))

# [3.1.0](https://github.com/kreuzerk/svg-to-ts/compare/v3.0.0...v3.1.0) (2020-03-04)


### Features

* **compiler:** compile ts files ([a911b7c](https://github.com/kreuzerk/svg-to-ts/commit/a911b7cfe78e58afeb0ca3db6cb0cf2f046f9c9a))
* **converter:** convert to multiple files ([fe13a4c](https://github.com/kreuzerk/svg-to-ts/commit/fe13a4c21d5d861956682e24b5abfe7b6ea0f074))
* **multifiles:** generate multiple files ([d933e1e](https://github.com/kreuzerk/svg-to-ts/commit/d933e1e03e4f9f5c799b9b2a1f2cda7a7bea4105))

# [3.0.0](https://github.com/kreuzerk/svg-to-ts/compare/v2.2.1...v3.0.0) (2020-02-25)


### Features

* **input:** Handle regex as sourceDir ([12d7bf9](https://github.com/kreuzerk/svg-to-ts/commit/12d7bf94002963a33938f68c87404a9c84fc884b))
* **sources:** use source files as regex ([69547dd](https://github.com/kreuzerk/svg-to-ts/commit/69547dd289ef71435dda2d644cb10fc81c2ba202))


### BREAKING CHANGES

* **sources:** srcDirectories is gone and we should now use srcFiles

## [2.2.1](https://github.com/kreuzerk/svg-to-ts/compare/v2.2.0...v2.2.1) (2020-02-10)


### Bug Fixes

* **conversion:** check to allow only svg files ([9fc3111](https://github.com/kreuzerk/svg-to-ts/commit/9fc31110f783998668671d043be9cadf962fefc0))

# [2.2.0](https://github.com/kreuzerk/svg-to-ts/compare/v2.1.0...v2.2.0) (2019-12-31)


### Features

* **delimiter:** add delimiter option to allow a custom delimiter ([c69358e](https://github.com/kreuzerk/svg-to-ts/commit/c69358e77aead04444ef7b312de04ed4b547d276))
* **type:** generate the types with the correct delimiter ([c6d1ebc](https://github.com/kreuzerk/svg-to-ts/commit/c6d1ebcb652432de2890f8a28b9a9f24da6ada0e))

# [2.1.0](https://github.com/kreuzerk/svg-to-ts/compare/v2.0.3...v2.1.0) (2019-12-13)


### Bug Fixes

* **types:** Fix error in type generation when last item is a folder ([c70c15d](https://github.com/kreuzerk/svg-to-ts/commit/c70c15d23348c0164869fb2f788ff585b46f4229))


### Features

* **input:** Handle multiple sourceDir ([fe9fd84](https://github.com/kreuzerk/svg-to-ts/commit/fe9fd84c15de90676366160ad6e0896891e92cf7))

## [2.0.3](https://github.com/kreuzerk/svg-to-ts/compare/v2.0.2...v2.0.3) (2019-12-10)


### Bug Fixes

* **input:** Exclude folders to source directory ([d2878a7](https://github.com/kreuzerk/svg-to-ts/commit/d2878a79cc0555bdcc507f72280cd701bd2d4928))

## [2.0.2](https://github.com/kreuzerk/svg-to-ts/compare/v2.0.1...v2.0.2) (2019-12-10)


### Bug Fixes

* **type:** add missing export statement ([ddab6ae](https://github.com/kreuzerk/svg-to-ts/commit/ddab6ae40e241b3b38948de2426afee853625fdb))

## [2.0.1](https://github.com/kreuzerk/svg-to-ts/compare/v2.0.0...v2.0.1) (2019-12-10)


### Bug Fixes

* **conversion:** use camel case for variable names ([89acef3](https://github.com/kreuzerk/svg-to-ts/commit/89acef3c6904c68f9327cd746776ff3856f9551d))

# [2.0.0](https://github.com/kreuzerk/svg-to-ts/compare/v1.1.2...v2.0.0) (2019-12-10)


### Features

* **conversion:** use snake case instead of camel case ([8963ce7](https://github.com/kreuzerk/svg-to-ts/commit/8963ce7eb8bda578270570542013a7950a9648ac))


### BREAKING CHANGES

* **conversion:** Generate types and variable names in snake case instead of camel case

## [1.1.2](https://github.com/kreuzerk/svg-to-ts/compare/v1.1.1...v1.1.2) (2019-12-09)


### Bug Fixes

* **output:** generate output with single quotes instead of double quotes ([bbd38f6](https://github.com/kreuzerk/svg-to-ts/commit/bbd38f69f88d614ef715f33edd31d0d4c3671e93))

## [1.1.1](https://github.com/kreuzerk/svg-to-ts/compare/v1.1.0...v1.1.1) (2019-12-09)


### Bug Fixes

* **bin:** fix wrong path to bin file ([bbb9565](https://github.com/kreuzerk/svg-to-ts/commit/bbb95658e4946171d7198f42fba9aafe09364a93))

# [1.1.0](https://github.com/kreuzerk/svg-to-ts/compare/v1.0.1...v1.1.0) (2019-12-09)


### Features

* **filename:** accept fileName as input property ([b99809d](https://github.com/kreuzerk/svg-to-ts/commit/b99809dbcee4e13387c76868eae22590e0e12418))

## [1.0.1](https://github.com/kreuzerk/svg-to-ts/compare/v1.0.0...v1.0.1) (2019-12-05)


### Bug Fixes

* **camelcase:** fix camel case is not a function ([dd6af14](https://github.com/kreuzerk/svg-to-ts/commit/dd6af14a1f4f43d816521d4a0e4799d4fbbe8cf7))

# 1.0.0 (2019-11-21)


### Features

* **converting:** optimize output ([fa6f42e](https://github.com/kreuzerk/svg-to-ts/commit/fa6f42ef6ad7d4ee3b72cd5aeb87c768a9298d3b))
* **prettier:** integrate prettier to format final Typescript ([9284eac](https://github.com/kreuzerk/svg-to-ts/commit/9284eac2e3de4d2d4589b98fff4d24beaf9850e7))
* **setup:** setup library ([6b42a67](https://github.com/kreuzerk/svg-to-ts/commit/6b42a6788ef8d0a3c14495d38377bcc9b26545e1))
