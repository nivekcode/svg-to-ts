![Logo](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/logo.png)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [What is svg-to-ts?](#what-is-svg-to-ts)
- [Who is this for?](#who-is-this-for)
- [Why you should use svg-to-ts](#why-you-should-use-svg-to-ts)
- [How to use svg-to-ts](#how-to-use-svg-to-ts)
  - [Usage](#usage)
    - [Command line](#command-line)
    - [Configuration in package.json or .rc file](#configuration-in-packagejson-or-rc-file)
      - [Configure svg-to-ts over package.json](#configure-svg-to-ts-over-packagejson)
      - [Configure svg-to-ts over .rc file](#configure-svg-to-ts-over-rc-file)
  - [Use-cases](#use-cases)
    - [Use Case 1 - Treeshakable and typesafe with one file (simpler use cases)](#use-case-1---treeshakable-and-typesafe-with-one-file-simpler-use-cases)
      - [Example usage](#example-usage)
    - [Use Case 2 - Fully tree shakable and optimized for lazy loading (more sophisticated)](#use-case-2---fully-tree-shakable-and-optimized-for-lazy-loading-more-sophisticated)
- [FAQ](#faq)
  - [Which approach should I use](#which-approach-should-i-use)
  - [Standalone library](#standalone-library)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# What is svg-to-ts?

`svg-to-ts` is a helper tool that converts your SVG icons to TypeScript. `svg-to-ts` can convert
SVGs to either one TypeScript file with exported constants, multiple TypeScript files or
compiled JavaScript files with according declaration files. Furthermore it generates all
typings in form of interfaces and types.

The generated output can then be used in combination with a iconregistry to create a tree shakable icon library.
[(More informations...)](#use-cases)

# Who is this for?

`svg-to-ts` is designed for autors of component libraries or icon libraries. Our examples and tutorials
are made with Angular, however `svg-to-ts` can also be used with other frameworks or vanilla TypeScript / JavaScript.

# Why you should use svg-to-ts

- `svg-to-ts` helps you provide icons in a tree shakable and performant way.
- You get free step to step guides in form of blog posts, that walk you through the process of creating your own tree shakable
  icon library
- `svg-to-ts` optimizes your SVG icons under the hood
- `svg-to-ts` automatically generates types and interfaces for your icons to improve typesafety
- `svg-to-ts` was developed based on the experiences of providin an icon library for a large enterprise.
- highly configurable - supports multiple use cases.

# How to use svg-to-ts

`svg-to-ts` is a command line tool, it can either be used directly in your terminal or
via npm script.

## Usage

### Command line

To execute `svg-to-ts` on the commmand line simply run `npx svg-to-ts --help` to see a list of available parameters.
Once you know which parameters to use, you can use npx to execute svg-to-ts and pass some parameters to it. For example, if
you want to convert all SVG file in your current folder to TypeScript constants. `npx svg-to-ts -s './*.svg'`.

### Configuration in package.json or .rc file

When you start using `svg-to-ts` in bigger projects, configuration may get more sophisticated. At this point command line
arguments are hard to read. Therefore `svg-to-ts` allows you to configure it either over package.json or over a `.svg-to-tsrc` file.

#### Configure svg-to-ts over package.json

To configure svg-to-ts over package.json you can simply add a `svg-to-ts` key in your package.json and use the config options.
Once you run `svg-to-ts` those configurations will be picked up.

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
    "optimizeForLazyLoading": true,
    "modelFileName": "dinosaur-icon.model",
    "additionalModelFile": "./projects/dinosaur-icons/src/lib",
    "compileSources": true
  }
}
```

#### Configure svg-to-ts over .rc file

To configure svg-to-ts over a .rc file you can add a `.svg-to-tsrc` file in the root of your project and use the config options.
The configuration can either be written in JSON or YAML.
Once you run `svg-to-ts` those configurations will be picked up.

```json
{
  "svg-to-ts": {
    "srcFiles": ["./projects/dinosaur-icons/icons/**/*.svg"],
    "outputDirectory": "./projects/dinosaur-icons/icons",
    "interfaceName": "DinosaurIcon",
    "typeName": "dinosaurIcon",
    "prefix": "dinosaurIcon",
    "optimizeForLazyLoading": true,
    "modelFileName": "dinosaur-icon.model",
    "additionalModelFile": "./projects/dinosaur-icons/src/lib",
    "compileSources": true
  }
}
```

If you decide to configure `svg-to-ts` by using a `.rc` file, it still makes sense to add the `generate-icons` script to your `package.json`

```json
{
  "name": "my-icon-library",
  "version": "3.4.0",
  "scripts": {
    "generate-icons": "svg-to-ts"
  }
}
```

## Use-cases

As mentioned above, `svg-to-ts` supports different use-cases. You can either generate you library to a single TypeScript file with multiple constants, to single TypeScript file per Icon
or to allready precompiled JavaScript files.

### Use Case 1 - Treeshakable and typesafe with one file (simpler use cases)

![Output scenario one](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/example-src1.png)
Only the icons included in the consuming SPA also end up in the final bundle of the SPA.

**We wrote a step to step guide that explains this approach further and helps you create an icon library with this approach.**
[Find out more in this blogpost](https://medium.com/angular-in-depth/how-to-create-an-icon-library-in-angular-4f8863d95a)

Available configurations:

| --version       | type                | default   | output the version number                                         |
| --------------- | ------------------- | --------- | ----------------------------------------------------------------- |
| typeName        | string              | myIcons   | name of the generated type                                        |
| prefix          | string              | myIcon    | prefix for the generated svg constants                            |
| interfaceName   | string              | MyIcon    | name for the generated interface                                  |
| fileName        | stirng              | my-icons  | file name of the generated file                                   |
| delimiter       | CAMEL, KEBAP, SNAKE | SNAKE     | delimiter which is used to generate the types and name properties |
| srcFiles        | string              | "/\*.svg" | input files matching the given filename pattern                   |
| outputDirectory | string              | "./dist"  | name of the output directory                                      |
| outputDirectory | string              | "./dist"  | name of the output directory                                      |

#### Example usage

Let's say we have the following four svg files in a `inputfiles` folder.

- expressionless.svg
- full.svg
- laughing.svg
- smiling-face.svg

We can now run
`svg-to-ts.ts -s ./inputfiles -o ./dist -t sampleIcon -i SampleIcon -p sampleIcon`
and we end up with the following file in our `dist` folder.

![output](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/output.png)

### Use Case 2 - Fully tree shakable and optimized for lazy loading (more sophisticated)

![fully tree shakable](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/fully-treeshakable.png)
Often, having the SVGs in a single file is enough. However if you are in a more complex environment with bigger business
applications, you may want to make the icons even more tree shakable.

In Angular, for example, having all icons in a single file shakes out the icons that are not used. However, icons always
end up together in a chunk. The `optimizeForLazyLoading` flag allows you to configure `svg-to-ts` that icons are
generated in a way that they can even be split to lazy loaded chunks. Means not only the amount of the icons in the chunk
gets reduced, but also, where they end up. Means, an icon that is only used in a lazy loaded Angular feature module, will only
end up there.
![Output scenario two](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/generated-files-src2.png)

[Here's a step by step guide on how to create an icon library that is optimized for tree shaking](https://medium.com/angular-in-depth/how-to-create-a-fully-tree-shakable-icon-library-in-angular-c5488cf9cd76)

Available configurations:

| --version                 | type                | default   | output the version number                                                                                                                                                       |
| ------------------------- | ------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| typeName                  | string              | myIcons   | name of the generated type                                                                                                                                                      |
| prefix                    | string              | myIcon    | prefix for the generated svg constants                                                                                                                                          |
| interfaceName             | string              | MyIcon    | name for the generated interface                                                                                                                                                |
| fileName                  | stirng              | my-icons  | file name of the generated file                                                                                                                                                 |
| delimiter                 | CAMEL, KEBAP, SNAKE | SNAKE     | delimiter which is used to generate the types and name properties                                                                                                               |
| srcFiles                  | string              | "/\*.svg" | input files matching the given filename pattern                                                                                                                                 |
| outputDirectory           | string              | "./dist"  | name of the output directory                                                                                                                                                    |
| outputDirectory           | string              | "./dist"  | name of the output directory                                                                                                                                                    |
| optimizeForLazyLoading    | boolean             | false     | when set to true, multiple files will be generated                                                                                                                              |
| additionalModelOutputPath | string              | null      | if a path is specified we will generate an additional file containing interface and type to this path - can be useful to improve type safety                                    |
| iconsFolderName           | string              | "build"   | name of the folder we will build the TypeScript files to                                                                                                                        |
| compileSources            | boolean             | false     | If set to false, we generate a TypeScript file for each SVG. If set to true we will allready compile those TypeScript files and generate JavaScript files and declaration files |

# FAQ

## Which approach should I use

This depends on your use case. If you have a simple application, it's probably enought to go with the single file and the constants.
If you build a framework that is used by multiple teams, then you should probably go with the fully tree shakable scenario (generating multiple files).

## Is it possilbe to create a standalone library?

Yes, it is. The current configurations also allow you to put your icon registry inside the component library and the icons in a dedicated npm package. This has the following
advantages:

- Icons can be used with different registries
- Simplified build process
- Icons can be released independent of the component library
- No need to let `svg-to-ts` compile the icons - just set the `compile` flag to false.
