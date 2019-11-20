#Tsvg
This module is designed for authors of UI frameworks which aim to
provide an SVG Icon library in a tree shakable way.

To make SVGs tree shakeable its a good way to export them as string constants.
Of course you don't always want to regenerate all the strings by hand. That's where
tsvg comes in.

# What it does

Tsvg automates the following things:

- Reads the content of all svg icons in a folder
- Optimized the svg content with svgo
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
  - removeAttrs
- It then creates a const for each svg (with the prefix + the file name in camelcase)
- adds a `name` and a `data` attribute to the const. The `name` attribute can
  later be used to register the icon in a registry service.
- exports an interface for the consts - (Interfacename can be passed as argument)

# API

The CLI can be used with the `tsvg` command. This command accepts the following arguments.

| -v  | --version                  | output the version number                        |
| --- | -------------------------- | ------------------------------------------------ |
| -t  | --typeName <string>        | name of the generated type                       |
| -p  | --prefix <string>          | prefix for the generated svg constants           |
| -i  | --interfaceName <string>   | name for the generated interface                 |
| -s  | --srcDirectory <string>    | name of the source directory (default: ".")      |
| -o  | --outputDirectory <string> | name of the output directory (default: "./dist") |
| -h  | --help                     | output usage information                         |

# Example

Let's say we have the following four svg files in a `inputfiles` folder.

![expressionless](https://raw.githubusercontent.com/kreuzerk/tsvg/master/inputfiles/expressionless.svg)

- expressionless.svg

![full](https://raw.githubusercontent.com/kreuzerk/tsvg/master/inputfiles/full.svg)

- full.svg

![laughing](https://raw.githubusercontent.com/kreuzerk/tsvg/master/inputfiles/laughing.svg)

- laughing.svg

![smiling-face](https://raw.githubusercontent.com/kreuzerk/tsvg/master/inputfiles/smiling-face.svg)

- smiling-face.svg

We can now run `tsvg -i ./inputfiles`
and we end up with the following file in our `dist` folder.

![output](https://raw.githubusercontent.com/kreuzerk/tsvg/master/assets/tsvgOutput.svg)
