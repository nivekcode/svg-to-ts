![Logo](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/logo.png)

![Supports Angular](https://img.shields.io/badge/Supports-Angular-green) ![Supports React](https://img.shields.io/badge/Supports-React-green) ![Supports Vanilla JS / TS](https://img.shields.io/badge/Supports-Vanilla%20JS%20%2F%20TS-green)

![npm](https://img.shields.io/npm/dt/svg-to-ts) ![GitHub Repo stars](https://img.shields.io/github/stars/kreuzerk/svg-to-ts)

![npms.io (final)](https://img.shields.io/npms-io/maintenance-score/svg-to-ts) ![GitHub Workflow](https://img.shields.io/github/workflow/status/kreuzerk/svg-to-ts/release) ![GitHub](https://img.shields.io/github/license/kreuzerk/svg-to-ts) ![npm](https://img.shields.io/npm/v/svg-to-ts)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-22-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is svg-to-ts?](#what-is-svg-to-ts)
- [Who is this for?](#who-is-this-for)
- [Why you should use svg-to-ts](#why-you-should-use-svg-to-ts)
- [Step by step guide on how to create your icon library](#step-by-step-guide-on-how-to-create-your-icon-library)
  - [Video tutorials](#video-tutorials)
  - [Written tutorial](#written-tutorial)
- [How to use svg-to-ts](#how-to-use-svg-to-ts)
  - [Usage](#usage)
    - [Binaries](#binaries)
    - [Configuration](#configuration)
    - [Passing arguments to the binary](#passing-arguments-to-the-binary)
    - [Configure svg-to-ts over package.json](#configure-svg-to-ts-over-packagejson)
    - [Configuration file](#configuration-file)
      - [Using a custom path](#using-a-custom-path)
  - [ConversionTypes](#conversiontypes)
    - [1. Converting to a single object (`conversionType==='object'`)](#1-converting-to-a-single-object-conversiontypeobject)
      - [Available options:](#available-options)
      - [Example usage](#example-usage)
      - [Sample output](#sample-output)
    - [2. Multiple constants - Treeshakable and typesafe with one file (`conversionType==='constants'`)](#2-multiple-constants---treeshakable-and-typesafe-with-one-file-conversiontypeconstants)
      - [Available options:](#available-options-1)
      - [Example usage](#example-usage-1)
      - [Sample ouput](#sample-ouput)
    - [3. Tree shakable and optimized for lazy loading (`conversionType==='files'`)](#3-tree-shakable-and-optimized-for-lazy-loading-conversiontypefiles)
      - [Available options:](#available-options-2)
      - [Example usage](#example-usage-2)
      - [Sample output](#sample-output-1)
- [SVGO - SVG optimization](#svgo---svg-optimization)
- [Starter project](#starter-project)
- [Angular builder](#angular-builder)
- [FAQ](#faq)
  - [Which approach should I use](#which-approach-should-i-use)
  - [Is it possilbe to create a standalone library?](#is-it-possilbe-to-create-a-standalone-library)
  - [Can I use the icons to generate a type?](#can-i-use-the-icons-to-generate-a-type)
- [Contributors ✨](#contributors-)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# What is svg-to-ts?

`svg-to-ts` is a helper tool that converts your SVG icons to TypeScript or TSX. `svg-to-ts` can convert
SVGs to either one TypeScript / TSX file with exported constants, multiple TypeScript files or
even compiled JavaScript files with according declaration files. Furthermore, it generates all
typings in form of interfaces and types.

The generated output can then be used in combination with a iconregistry to create a tree shakable icon library.
[(More informations...)](#use-cases)

# Who is this for?

`svg-to-ts` is designed for autors of component libraries, icon libraries and SPA authors. Our examples and tutorials
are made with Angular, however `svg-to-ts` can also be used with other frameworks such as React or vanilla TypeScript / JavaScript.

# Why you should use svg-to-ts

- `svg-to-ts` helps you provide icons in a tree shakable and performant way.
- You get free step to step guides in form of blog posts, that walk you through the process of creating your own tree shakable
  icon library
- `svg-to-ts` optimizes your SVG icons under the hood
- `svg-to-ts` automatically generates types and interfaces for your icons to improve typesafety
- `svg-to-ts` was developed based on the experiences of providin an icon library for a large enterprise.
- `svg-to-ts` offers the possibility to generate TSX files (react components).
- offers three different conversion modes ('object', 'constants' and 'files')
- each method is highly configurable to supports multiple use cases.

# Step by step guide on how to create your icon library

We created multiple tutorials to show you how you can use svg-to-ts in the best way. We have two step by step guides.
A video course and a blog post. Both cover the same content. Feel free to choose the format you prefer.

## Video tutorials

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/GWD3GWU7NvE/0.jpg)](https://www.youtube.com/watch?v=GWD3GWU7NvE)

## Written tutorial

[This blog post](https://kevinkreuzer.medium.com/how-to-build-your-own-tree-shakable-svg-icons-library-in-less-than-30-minutes-9f7a4a324d29) guides you through the process of building your own icon library with svg-to-ts.
![Logo](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/blogimage.png)

# How to use svg-to-ts

`svg-to-ts` is a command line tool, it can either be used directly in your terminal or
via npm script.

## Usage

### Binaries

`svg-to-ts` provides three different binaries.

- `svg-to-ts-object`
- `svg-to-ts-constants`
- `svg-to-ts-files`

You can either run those binaries with `npx`

`npx -p svg-to-ts svg-to-ts-object`

or you can add a new script in your `package.json`.

```json
"name": "my-icon-library",
"version": "3.4.0",
"scripts": {
  "generate-icons": "svg-to-ts"
}
```

### Configuration

When executing a binary `svg-to-ts` automatically applies some defaults. However, you have multiple ways to configure `svg-to-ts`. To get a list of available options you can either execute the binary of your choice with the `--help` argument or you can find all the available options for your conversion type here in the docs:

- [1. Converting to a single object (`conversionType==='object'`)](#1-converting-to-a-single-object-conversiontypeobject)
- [2. Multiple constants - Treeshakable and typesafe with one file (`conversionType==='constants'`)](#2-multiple-constants---treeshakable-and-typesafe-with-one-file-conversiontypeconstants)
- [3. Tree shakable and optimized for lazy loading (`conversionType==='files'`)](#3-tree-shakable-and-optimized-for-lazy-loading-conversiontypefiles)

Once you found your configurations you have the following possibilities to configure `svg-to-ts`:

- Passing arguments to the binary
- Adding a configuration object in the `package.json`
- Adding a `.svg-to-tsrc` file (`javascript`, `json` , `yaml` or `yml`) in the root of your project or a path of you choice.

### Passing arguments to the binary

When choosing this option you directly pass the arguments to your binary.

`svg-to-ts-files -s './inputfiles/*.svg' --compileSources true --additionalModelOutputPath ./additional`

A complete list of the available arguments can be found by using the `--help` argument.

`svg-to-ts-files --help`

When you start using `svg-to-ts` in bigger projects, configuration may get more sophisticated. At this point command line arguments are hard to read.

### Configure svg-to-ts over package.json

To configure svg-to-ts over package.json you can add a `svg-to-ts` key in your `package.json` and use the config options.
Once you run `svg-to-ts` those configurations will be picked up. The config object can eiter be an object or an array containing multiple configurations.

```json
{
  "name": "my-icon-library",
  "version": "3.4.0",
  "scripts": {
    "generate-icons": "svg-to-ts"
  },
  "svg-to-ts": {
    "srcFiles": ["./projects/dinosaur-icons/icons/**/*.svg"],
    "outputDirectory": "./projects/dinosaur-icons/icons",
    "interfaceName": "DinosaurIcon",
    "typeName": "dinosaurIcon",
    "prefix": "dinosaurIcon",
    "svgoConfig": {
      "plugins": ["cleanupAttrs"]
    },
    "fileName": "dinosaur-icon.model",
    "additionalModelOutputPath": "./projects/dinosaur-icons/src/lib",
    "compileSources": true
  }
}
```

####

### Configuration file

To configure svg-to-ts over a .rc file you can add a `.svg-to-tsrc` file in the root of your project and use the config options. Once you run `svg-to-ts` those configurations will be picked up.

```json
{
  "srcFiles": ["./projects/dinosaur-icons/icons/**/*.svg"],
  "outputDirectory": "./projects/dinosaur-icons/icons",
  "interfaceName": "DinosaurIcon",
  "typeName": "dinosaurIcon",
  "prefix": "dinosaurIcon",
  "fileName": "dinosaur-icon.model",
  "svgoConfig": {
    "plugins": ["cleanupAttrs"]
  },
  "additionalModelOutputPath": "./projects/dinosaur-icons/src/lib",
  "compileSources": true
}
```

An alternative for bigger projects is to use a JavaScript-based configuration file. The main advantage here is there you can create dynamic configurations, but also use plain-old JavaScript objects, allowing you to add comments, etc. This is useful for more complex configurations where comments can clarify why options are defined in a certain way.

JS configurations must be defined as a CommonJS module. Whenever you want to use a JS configuration file your rc file
has to end with `.js`.

Here's an example:

```typescript
const svgToTsConfig = {
  srcFiles: ['./libs/web-icons/icons/**/*.svg'],
  outputDirectory: './libs/web-icons/src/lib',
  interfaceName: 'MyIcon',
  typeName: 'MyIconName',
  generateType: true,
  modelFileName: 'whatever-icon.model',
  additionalModelOutputPath: './libs/web-icons/src/lib',
  iconsFolderName: 'generated',
  delimiter: 'SNAKE',
  barrelFileName: 'generated-icons-barrel',
  svgoConfig: {
    plugins: ['cleanupAttrs']
  },
  compileSources: false
};

module.exports = svgToTsConfig;
```

#### Using a custom path

In case you want to put your configuration under a custom path, you can use the `--config` property to specify a path your configuration. For example `svg-to-ts --config ./myconfig.json`.

## ConversionTypes

svg-to-ts offers three different kinds of conversion types; Converting your icons to a single object,
converting your icons to constants or converting your icons to single files. Each approach is designed
to solve a specific kind of problem. You can switch between approaches by passing `conversionType` property (`object`, `constants` or `files`).

### 1. Converting to a single object (`conversionType==='object'`)

In this scenario the SVG icons are converted to a single object. It's an approach that is suitable if your icon registry
accepts an object with the filename as key and the svg data as key.

#### Available options:

| --version       | type                       | default                                  | description                                                                                  |
| --------------- | -------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| fileName        | string                     | my-icons                                 | file name of the generated file                                                              |
| tsx             | boolean                    | false                                    | Generate TSX file which can be used as React components out of the box                       |
| delimiter       | CAMEL, KEBAB, SNAKE, UPPER | CAMEL                                    | delimiter which is used to generate the types and name properties                            |
| svgoConfig      | null or config object      | check help command - to large to display | by default we search for a svgo.config.js file in the root or an inline configuration object |
| srcFiles        | string                     | "/\*.svg"                                | input files matching the given filename pattern                                              |
| outputDirectory | string                     | "./dist"                                 | name of the output directory                                                                 |
| objectName      | string                     | default - export                         | name of the exported const - if nothing is set - default export will be used                 |
| verbose         | boolean                    | false                                    | defines if the log should contain additional information. Can be useful for debugging        |
| generateType    | boolean                    | true                                     | defines if a type should be generated                                                        |
| typeName        | string                     | MyIconType                               | name of the type to be used when `generateType` is set to `true`                             |
| namePrefix      | string                     |                                          | prefix to be used for the name property included in the generated constant                   |

#### Example usage

Let's say we have the following four svg files in a `inputfiles` folder.

- expressionless.svg
- full.svg
- laughing.svg
- smiling-face.svg

We can now run
`svg-to-ts-object -s ./inputfiles -o ./dist`
and we end up with the following file in our `dist` folder.

#### Sample output

```typescript
export default {
  expressionLess: '<svg xmlns="http://ww...',
  full: '<svg xmlns="http://...',
  laughing: '<svg xmlns="http://ww...',
  smilingFace: '<svg xmlns="http://www....'
} as { [key in MyIconType]: string };

export type MyIconType = 'expressionLess' | 'full' | 'laughing' | 'smilingFace';
```

### 2. Multiple constants - Treeshakable and typesafe with one file (`conversionType==='constants'`)

This approach converts your svg icons into multiple constants in the same file so that they can be used
in combination with an icon registry. It furthermore also generates all necssary types. **We wrote a step to step guide that explains this approach further and helps you create an icon library with this approach.**
[Find out more in this blogpost](https://medium.com/angular-in-depth/how-to-create-an-icon-library-in-angular-4f8863d95a)

![Output scenario one](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/example-src1.png)
Only the icons included in the consuming SPA also end up in the final bundle of the SPA.

#### Available options:

| --version             | type                       | default                                  | description                                                                           |
| --------------------- | -------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------- |
| tsx                   | boolean                    | false                                    | Generate TSX file which can be used as React components out of the box                |
| generateType          | boolean                    | false                                    | defines if a type should be generated                                                 |
| typeName              | string                     | myIcons                                  | name of the type to be used when `generateType` is set to `true`                      |
| generateTypeObject    | boolean                    | false                                    | generate type object                                                                  |
| generateEnum          | boolean                    | false                                    | generate enum object                                                                  |
| prefix                | string                     | myIcon                                   | prefix for the generated svg constants                                                |
| namePrefix            | string                     |                                          | prefix to be used for the name property included in the generated constant            |
| interfaceName         | string                     | MyIcon                                   | name for the generated interface                                                      |
| fileName              | string                     | my-icons                                 | file name of the generated file                                                       |
| enumName              | string                     | MyIcons                                  | name for the generated enum                                                           |
| delimiter             | CAMEL, KEBAB, SNAKE, UPPER | SNAKE                                    | delimiter which is used to generate the types and name properties                     |
| svgoConfig            | string or config object    | check help command - to large to display | a path to your svgoConfiguration JSON file or an inline configuration object          |
| srcFiles              | string                     | "/\*.svg"                                | input files matching the given filename pattern                                       |
| outputDirectory       | string                     | "./dist"                                 | name of the output directory                                                          |
| exportCompleteIconSet | boolean                    | true                                     | exports a complete icon set                                                           |
| completeIconSetName   | string                     | completeIconSet                          | Default name of the exported variable                                                 |
| verbose               | boolean                    | false                                    | defines if the log should contain additional information. Can be useful for debugging |

#### Example usage

Let's say we have the following four svg files in a `inputfiles` folder.

- expressionless.svg
- full.svg
- laughing.svg
- smiling-face.svg

We can now run
`svg-to-ts-constants -s ./inputfiles -o ./dist`
and we end up with the following file in our `dist` folder.

#### Sample output

```javascript
export const myIconExpressionLess: {
  name: 'expression_less',
  data: string
} = {
  name: 'expression_less',
  data: `<svg xmlns="http://...`
};
export const myIconFull: {
  name: 'full',
  data: string
} = {
  name: 'full',
  data: `<svg xmlns="http://www...`
};
export const myIconLaughing: {
  name: 'laughing',
  data: string
} = {
  name: 'laughing',
  data: `<svg xmlns="http://www.w...`
};
export const myIconSmilingFace: {
  name: 'smiling_face',
  data: string
} = {
  name: 'smiling_face',
  data: `<svg xmlns="http://www.w3...`
};
/* ⚠️ Do not edit this file - this file is generated by svg-to-ts*/

export type myIcons = 'expression_less' | 'full' | 'laughing' | 'smiling_face';
export interface MyIcon {
  name: myIcons;
  data: string;
}
```

### 3. Tree shakable and optimized for lazy loading (`conversionType==='files'`)

This is the most sophisticated approach and also the approach that doesn't only support tree shaking but also
supports code splitting which is especially usefull in scenarios where you are using lazy loading.

(Previously, this was the `optimizeForLazyLoading` option but it has been removed in version 4.3.0.)

[Here's a step by step guide on how to create an icon library that is optimized for tree shaking](https://medium.com/angular-in-depth/how-to-create-a-fully-tree-shakable-icon-library-in-angular-c5488cf9cd76)

![fully tree shakable](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/fully-treeshakable.png)
Often, having the SVGs in a single file is enough. However, if you are in a more complex environment with bigger business
applications, you may want to make the icons even more tree shakable.

In Angular, for example, having all icons in a single file shakes out the icons that are not used. However, icons always
end up together in a chunk. The `conversionOption = files` allows you to configure `svg-to-ts` that icons are
generated in a way that they can even be split to lazy loaded chunks. Means not only the amount of the icons in the chunk
gets reduced, but also, where they end up. Means, an icon that is only used in a lazy loaded Angular feature module, will only
end up there.

#### Available options:

| --version                 | type                       | default                                  | description                                                                                                                                                                     |
| ------------------------- | -------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| barrelFileName            | string                     | index                                    | name of the generated type                                                                                                                                                      |
| tsx                       | boolean                    | false                                    | Generate TSX file which can be used as React components out of the box                                                                                                          |
| generateType              | boolean                    | false                                    | defines if a type should be generated                                                                                                                                           |
| typeName                  | string                     | myIcons                                  | name of the type to be used when `generateType` is set to `true`                                                                                                                |
| generateTypeObject        | boolean                    | false                                    | generate type object                                                                                                                                                            |
| generateEnum              | boolean                    | false                                    | generate enum object                                                                                                                                                            |
| exportCompleteIconSet     | boolean                    | false                                    | Specifies if the complete icon set should be exported or not (can be very handy for showcases)                                                                                  |
| completeIconSetName       | string                     | completeIconSet                          | Name of the generated complete icon set (only effective if exportCompleteIconSet is set to true)                                                                                |
| prefix                    | string                     | myIcon                                   | prefix for the generated svg constants                                                                                                                                          |
| namePrefix                | string                     |                                          | prefix to be used for the name property included in the generated constant                                                                                                      |
| interfaceName             | string                     | MyIcon                                   | name for the generated interface                                                                                                                                                |
| modelFileName             | string                     | my-icons                                 | file name of the generated file                                                                                                                                                 |
| enumName                  | string                     | MyIcons                                  | name for the generated enum                                                                                                                                                     |
| delimiter                 | CAMEL, KEBAB, SNAKE, UPPER | SNAKE                                    | delimiter which is used to generate the types and name properties                                                                                                               |
| srcFiles                  | string                     | "/\*.svg"                                | input files matching the given filename pattern                                                                                                                                 |
| svgoConfig                | null or config object      | check help command - to large to display | by default we search for a svgo.config.js file in the root or an inline configuration object                                                                                    |
| outputDirectory           | string                     | "./dist"                                 | name of the output directory                                                                                                                                                    |
| additionalModelOutputPath | string                     | null                                     | if a path is specified we will generate an additional file containing interface and type to this path - can be useful to improve type safety                                    |
| iconsFolderName           | string                     | "build"                                  | name of the folder we will build the TypeScript files to                                                                                                                        |
| compileSources            | boolean                    | false                                    | If set to false, we generate a TypeScript file for each SVG. If set to true we will allready compile those TypeScript files and generate JavaScript files and declaration files |
| compilationOutput         | ESM, UMD, ESM_AND_UMD      | ESM                                      | Sets the compilation output. This depends on your target audience. Some consumers require, ESM some UMD. You can choose the correct one or even compile to both.                |
| verbose                   | boolean                    | false                                    | defines if the log should contain additional information. Can be useful for debugging                                                                                           |

#### Generating UMD and ESM bundles

When you choose to generate UMD and ESM bundles the generated output will end up in a folder named `cjs` and `esm`. In order to correctly access those folders you have to add a exports map to the `package.json` of your library.

```json
"main": "./cjs/index.js",
  "module": "./esm/index.js",
  "exports": {
    ".": {
      "import": "./esm/index.js",
      "require": "./cjs/index.js"
    }
  }
}
```

#### Example usage

Let's say we have the following four svg files in a `inputfiles` folder.

- expressionless.svg
- full.svg
- laughing.svg
- smiling-face.svg

We can now run
`svg-to-ts-files -s ./inputfiles -o ./dist`
and we end up with the following file in our `dist` folder.

#### Sample output

![Output scenario two](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/generated-files-src2.png)

# SVGO - SVG optimization

Under the hood we use the [svgo](https://github.com/svg/svgo) project to optimize the svg icons. To configure SVGO
you can add a `svgo.config.js` file to your root. Check out the official [svgo](https://github.com/svg/svgo) page
for further docs about the configuration.

**Note: If you dont pass any options, svgo will apply some default options ([more](https://github.com/svg/svgo))**

# Starter project

If you want to build a standalone icon library we recommend you to checkout the [svg-icon-lib-starter](https://github.com/kreuzerk/svg-icon-library-starter) project on GitHub. This project allows you to build an astonishing framework-agnostic SVG icon library with ease. Out of the box icon optimization, build process, and icon showcase. 🚀

# Angular builder

In case you are working with Angular and prefer the usage of a builder we recommend you to check out our [offical Angular builder](https://github.com/angular-extensions/svg-icons-builder).

# FAQ

## Which approach should I use

This depends on your use case. If you have a simple application, it's probably enought to go with the single file or even a object. If you build a framework that is used by multiple teams, then you should probably go with the fully tree shakable scenario (generating multiple files).

## Is it possilbe to create a standalone library?

Yes, it is. The current configurations also allow you to put your icon registry inside the component library and the icons in a dedicated npm package. This has the following
advantages:

- Icons can be used with different registries
- Simplified build process
- Icons can be released independent of the component library
- No need to let `svg-to-ts` compile the icons - just set the `compile` flag to false.

## Can I use the icons to generate a type?

If you have a method that decides which icon should be returned its useful to add a return type. To do so you can take advantage of the name subset helper generated by `svg-to-ts`. The name of the helper will be dynamically generated depending upon the value provided for the `interfaceName` property. An `interfaceName` of `MyIcon` will generate a helper called `MyIconNameSubset` as shown in the following example.

```typescript
import {IconNameSubset, myIconSmile, myIconLaugh} from 'my-icon-lib';

type emojiIcons = MyIconNameSubset<[typeof myIconSmile, typeof myIconLaugh]>;

// resulting type is equal to type = 'smile' | 'laugh';

myMethod(): emojiIcons {
  // do stuff here
}

```

# Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://medium.com/@kevinkreuzer"><img src="https://avatars0.githubusercontent.com/u/5468954?v=4?s=200" width="200px;" alt="Kevin Kreuzer"/><br /><sub><b>Kevin Kreuzer</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=kreuzerk" title="Code">💻</a> <a href="#design-kreuzerk" title="Design">🎨</a> <a href="https://github.com/kreuzerk/svg-to-ts/commits?author=kreuzerk" title="Documentation">📖</a> <a href="#ideas-kreuzerk" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-kreuzerk" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-kreuzerk" title="Maintenance">🚧</a> <a href="https://github.com/kreuzerk/svg-to-ts/commits?author=kreuzerk" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/shaharkazaz"><img src="https://avatars2.githubusercontent.com/u/17194830?v=4?s=200" width="200px;" alt="Shahar Kazaz"/><br /><sub><b>Shahar Kazaz</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=shaharkazaz" title="Code">💻</a> <a href="https://github.com/kreuzerk/svg-to-ts/commits?author=shaharkazaz" title="Documentation">📖</a> <a href="#ideas-shaharkazaz" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-shaharkazaz" title="Maintenance">🚧</a> <a href="https://github.com/kreuzerk/svg-to-ts/commits?author=shaharkazaz" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/felipeplets"><img src="https://avatars3.githubusercontent.com/u/119980?s=400&u=92bcde3bbed2bf436317b301d1a9fca2445511cb&v=4?s=200" width="200px;" alt="Felipe Plets"/><br /><sub><b>Felipe Plets</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=felipeplets" title="Code">💻</a> <a href="https://github.com/kreuzerk/svg-to-ts/commits?author=felipeplets" title="Documentation">📖</a> <a href="#ideas-felipeplets" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-felipeplets" title="Maintenance">🚧</a> <a href="https://github.com/kreuzerk/svg-to-ts/commits?author=felipeplets" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/akehir"><img src="https://avatars2.githubusercontent.com/u/1078202?s=400&u=497e363bdad9525d99c8142900527d6334fd855c&v=4?s=200" width="200px;" alt="Raphael Ochsenbein"/><br /><sub><b>Raphael Ochsenbein</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=akehir" title="Code">💻</a> <a href="https://github.com/kreuzerk/svg-to-ts/commits?author=akehir" title="Documentation">📖</a> <a href="#ideas-akehir" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-akehir" title="Maintenance">🚧</a> <a href="https://github.com/kreuzerk/svg-to-ts/commits?author=akehir" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Palapapaa"><img src="https://avatars1.githubusercontent.com/u/2643459?s=400&v=4?s=200" width="200px;" alt="Guillaume M"/><br /><sub><b>Guillaume M</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=Palapapaa" title="Code">💻</a> <a href="https://github.com/kreuzerk/svg-to-ts/commits?author=Palapapaa" title="Documentation">📖</a> <a href="#ideas-Palapapaa" title="Ideas, Planning, & Feedback">🤔</a> <a href="#maintenance-Palapapaa" title="Maintenance">🚧</a> <a href="https://github.com/kreuzerk/svg-to-ts/commits?author=Palapapaa" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jvelay"><img src="https://avatars2.githubusercontent.com/u/4629727?v=4?s=200" width="200px;" alt="Jaime Velay Valor"/><br /><sub><b>Jaime Velay Valor</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=jvelay" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/glenngr"><img src="https://avatars0.githubusercontent.com/u/8955488?v=4?s=200" width="200px;" alt="Glenn Greibesland"/><br /><sub><b>Glenn Greibesland</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=glenngr" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://kasmao.com/"><img src="https://avatars0.githubusercontent.com/u/9607309?v=4?s=200" width="200px;" alt="MrP"/><br /><sub><b>MrP</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=VincentPuget" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://medium.com/@dSebastien"><img src="https://avatars3.githubusercontent.com/u/89887?v=4?s=200" width="200px;" alt="Sebastien Dubois"/><br /><sub><b>Sebastien Dubois</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=dsebastien" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://thatguynamedandy.com"><img src="https://avatars1.githubusercontent.com/u/2196085?v=4?s=200" width="200px;" alt="Andrew Polhill"/><br /><sub><b>Andrew Polhill</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=thatguynamedandy" title="Code">💻</a> <a href="https://github.com/kreuzerk/svg-to-ts/issues?q=author%3Athatguynamedandy" title="Bug reports">🐛</a> <a href="https://github.com/kreuzerk/svg-to-ts/commits?author=thatguynamedandy" title="Documentation">📖</a> <a href="#ideas-thatguynamedandy" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jvinters"><img src="https://avatars0.githubusercontent.com/u/44930772?v=4?s=200" width="200px;" alt="Joshua Vinters"/><br /><sub><b>Joshua Vinters</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=jvinters" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://amd.com"><img src="https://avatars1.githubusercontent.com/u/1633576?v=4?s=200" width="200px;" alt="Matthäus G. Chajdas"/><br /><sub><b>Matthäus G. Chajdas</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=Anteru" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.atbo.studio"><img src="https://avatars.githubusercontent.com/u/21083372?v=4?s=200" width="200px;" alt="Julian Kimmig"/><br /><sub><b>Julian Kimmig</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=atbostudio" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://montogeek.com"><img src="https://avatars.githubusercontent.com/u/1002461?v=4?s=200" width="200px;" alt="Fernando Montoya"/><br /><sub><b>Fernando Montoya</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=montogeek" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/DartWelder"><img src="https://avatars.githubusercontent.com/u/25117312?v=4?s=200" width="200px;" alt="Alexey Evenkov"/><br /><sub><b>Alexey Evenkov</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=DartWelder" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nmastereal"><img src="https://avatars.githubusercontent.com/u/9787382?v=4?s=200" width="200px;" alt="nmastereal"/><br /><sub><b>nmastereal</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=nmastereal" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://medium.com/@cakeinpanic/latest"><img src="https://avatars.githubusercontent.com/u/588916?v=4?s=200" width="200px;" alt="Katya Pavlenko"/><br /><sub><b>Katya Pavlenko</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=cakeinpanic" title="Code">💻</a> <a href="https://github.com/kreuzerk/svg-to-ts/commits?author=cakeinpanic" title="Documentation">📖</a> <a href="#ideas-cakeinpanic" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://twitter.com/liran_tal"><img src="https://avatars.githubusercontent.com/u/316371?v=4?s=200" width="200px;" alt="Liran Tal"/><br /><sub><b>Liran Tal</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=lirantal" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://bandism.net/"><img src="https://avatars.githubusercontent.com/u/22633385?v=4?s=200" width="200px;" alt="Ikko Ashimine"/><br /><sub><b>Ikko Ashimine</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=eltociear" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/theotonge"><img src="https://avatars.githubusercontent.com/u/793679?v=4?s=200" width="200px;" alt="Theo Tonge"/><br /><sub><b>Theo Tonge</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=theotonge" title="Code">💻</a> <a href="https://github.com/kreuzerk/svg-to-ts/commits?author=theotonge" title="Documentation">📖</a> <a href="https://github.com/kreuzerk/svg-to-ts/commits?author=theotonge" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://kasperchristensen.com"><img src="https://avatars.githubusercontent.com/u/81513?v=4?s=200" width="200px;" alt="Kasper Christensen"/><br /><sub><b>Kasper Christensen</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=fALKENdk" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://antoniopk.com/"><img src="https://avatars.githubusercontent.com/u/2219701?v=4?s=200" width="200px;" alt="Antonio"/><br /><sub><b>Antonio</b></sub></a><br /><a href="https://github.com/kreuzerk/svg-to-ts/commits?author=ToneyPK" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
