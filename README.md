![Logo](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/logo.png)

# What is svg-to-ts

svg-to-ts is a helper tool that converts your SVG icons to TypeScript. svg-to-ts can convert
SVGs to either one TypeScript file with exported constants, multiple TypeScript file or allready
compiled JavaScript files with the according declaration files.

# Who is this for

svg-to-ts is designed for autors of component libraries or icon libraries. Our examples and tutorials
are made with Angular, however svg-to-ts can also be used with other frameworks or vanilla TypeScript / JavaScript.

# Why you should use svg-to-ts

- svg-to-ts was developed with the experiences of providin an icon library for a large enterprise.
- The main goal is to provide icons in a tree shakable and performant way.
- You get free step to step guides in form of blog posts, that walk you through the process of creating your own tree shakable
  icon library
- `svg-to-ts` optimizes your SVG icons under the hood
- Automatic generation of types and interfaces for Typesafety

# How to use svg-to-ts

svg-to-ts can supports multiple scenarios and can be used in multiple ways. It can either be used over the command line or
via npm script.

## Usage

### Command line

To execute `svg-to-ts` on the commmand line simply run `npx svg-to-ts --help` to see a list of available parameters.
Once you know which parameters to use, you can use npx to execute svg-to-ts and pass some parameters to it. For example, if
you want to convert all SVG file in your current folder to TypeScript constants. `npx svg-to-ts -s './*.svgh'`.

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
    "preCompileSources": true
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
    "preCompileSources": true
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
or to allready precompiled icons.

### Single file with multiple constants

when using this option, each file gets optimized and converted into a constant. Interface and type also get automatically generated.
![Logo](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/howItWorks.png)

We wrote a step to step guide that explains this approach further and helps you create an icon library with this approach.
[Find out more in this blogpost](https://medium.com/angular-in-depth/how-to-create-an-icon-library-in-angular-4f8863d95a)

Available configurations:

| --version       | type      | default   | output the version number                                         |
| --------------- | --------- | --------- | ----------------------------------------------------------------- |
| typeName        | string    | myIcons   | name of the generated type                                        |
| prefix          | string    | myIcon    | prefix for the generated svg constants                            |
| interfaceName   | string    | MyIcon    | name for the generated interface                                  |
| fileName        | stirng    | my-icons  | file name of the generated file                                   |
| delimiter       | Delimiter | SNAKE     | delimiter which is used to generate the types and name properties |
| srcFiles        | string    | "/\*.svg" | input files matching the given filename pattern                   |
| outputDirectory | string    | "./dist"  | name of the output directory                                      |
| outputDirectory | string    | "./dist"  | name of the output directory                                      |

### Multiple files with multiple constants - optimized for lazy loading

# What it does

This library generates a Typescript file with your svg definitons. The file
will be generated in the following format:

- For each SVG file we generate a const with a `name` and a `data` property.
- We generate the types which match the name properties of the SVGS. This types are helpful to ensure the user adds only known icons
- We generate an interface to ensure the structure of each SVG constant

# SVG optimizations

Additonally we also optimize the SVG icons with the help of the `svgo` package. To optimize the SVG we use the following configurations.

- cleanupAttrs
- removeDoctype
- removeXMLProcInst
- removeComments
- removeMetadata
- removeTitle
- removeDesc
- removeUselessDefs
- removeEditorsNSData
- removeEmptyAttrs
- removeHiddenElems
- removeEmptyText
- removeEmptyContainers
- removeViewBox
- cleanupEnableBackground
- convertStyleToAttrs
- convertColors
- convertPathData
- convertTransform
- removeUnknownsAndDefaults
- removeNonInheritableGroupAttrs
- removeUselessStrokeAndFill
- removeUnusedNS
- cleanupIDs
- cleanupNumericValues
- moveElemsAttrsToGroup
- moveGroupAttrsToElems
- collapseGroups
- removeRasterImages
- mergePaths
- convertShapeToPath
- sortAttrs
- removeDimensions

# API

The CLI can be used with the `tsvg` command. This command accepts the following arguments.

| -v  | --version                  | output the version number                                                                                |
| --- | -------------------------- | -------------------------------------------------------------------------------------------------------- |
| -t  | --typeName <string>        | name of the generated type (myIcons)                                                                     |
| -p  | --prefix <string>          | prefix for the generated svg constants (myIcon)                                                          |
| -i  | --interfaceName <string>   | name for the generated interface (MyIcon)                                                                |
| -f  | --fileName <string>        | file name of the generated file (default: "my-icons")                                                    |
| -d  | --delimiter <Delimiter>    | delimiter which is used to generate the types and name properties (CAMEL,KEBAB,SNAKE) (default: "SNAKE") |
| -s  | --srcFiles <string>        | input files matching the given filename pattern (default: "\*.svg")                                      |
| -o  | --outputDirectory <string> | name of the output directory (default: "./dist")                                                         |
| -h  | --help                     | output usage information                                                                                 |

# Example

Let's say we have the following four svg files in a `inputfiles` folder.

- expressionless.svg
- full.svg
- laughing.svg
- smiling-face.svg

We can now run
`svg-to-ts.ts -s ./inputfiles -o ./dist -t sampleIcon -i SampleIcon -p sampleIcon`
and we end up with the following file in our `dist` folder.

![output](https://raw.githubusercontent.com/kreuzerk/svg-to-ts/master/assets/output.png)
