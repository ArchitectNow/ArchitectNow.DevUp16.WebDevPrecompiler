# Setup Instructions
```bash
# install packages
npm install
# start development environment (webpack-dev-server)
npm start
```
NOTE: The bundle generated from webpack-dev-server is served from memory so there are no output files.

## File Structure
```
app root/
 ├──config/                    * our configuration
 |   ├──helpers.js             * helper functions for our configuration files
 |   ├──karma.conf.js          * karma config for our unit tests
 │   ├──webpack.dev.js         * our development webpack config
 │   ├──webpack.prod.js        * our production webpack config
 │   └──webpack.test.js        * our testing webpack config
 │
 ├──src/                       * our source files that will be bundled to wwwroot
 |  ├──bootstrap.ts            * our entry file for our browser environment
 │  │
 |  ├──index.html              * index.html: where we generate our index page
 │  │
 |  ├──polyfills.ts            * our polyfills file
 │  │
 |  ├──vendor.ts               * our vendor file
 │  │
 │  ├──app/                    * WebApp: folder
 │  │   ├──features/           * components that resemble a page. (Home, About..)
 │  │   ├──services/           * application wide services
 │  │   └──components/         * application wide (navbar, footer...)
 │  │
 │  └──assets/                 * static assets are served here
 │
 ├──wwwroot/                   * bundled ouput files
 │
 ├──tsconfig.json              * config that webpack uses for typescript
 ├──package.json               * what npm uses to manage it's dependencies
 └──webpack.config.js          * webpack main configuration file

# How to deploy
```bash
npm run publish
```


TODO:
- setup tslint (typescript lint config)
- setup typedoc (typescript documentation generator)

