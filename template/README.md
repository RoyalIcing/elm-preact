# {{ name }}

Integrate Elm 0.19.0 with [Preact CLI](https://github.com/developit/preact-cli). Elm’s **optimize** mode is on for small bundles.

Create a new project using this by running:

```sh
npm install -g preact-cli
preact create RoyalIcing/elm-preact my-project
cd my-project
npm install
npm run dev
```

## Overview

Preact is used for:

- Routing
- Route/container components
- Webpack handling and configuration
- CSS

Elm is used for:

- Model state & updates
- Subscriptions

See the Profile page for an example of how Elm and Preact interact.

## CLI Commands

``` bash
# install dependencies
npm install

# add new elm dependency
elm install elm/time

# serve with hot reload at localhost:9123
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# run tests with jest and preact-render-spy 
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
