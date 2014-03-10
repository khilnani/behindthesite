behindthesite
==========

> A log of technologies used by companies. 


# Developer Notes

## Setup

- Run `sudo /setup-dev.sh` or `sudo ./setup-prod.sh` as appropriate.

    > Installs global as well as local Node packages, and Bower dependencies.

## Environment Configuration

- Rename `config/env.sample.json` to `config/env.json` and update.
- `NODE_ENV` - 'development' or 'production'. 
- Update `config/env.json` as needed.  Default port is 8080.

## Server commands

- Development
  - `./behindthesite.js` or `node behindthesite.js`
- Production
  - Run `npm start` to Start.
  - Run `npm stop` to Stop.

    > Logs are written to `./logs`


## Tasks

> `gulp default` executes the `build` task.

- `gulp all` - Run tests and Build.
- `gulp test` - Run tests - lint, mocha and phantomjs.
- `gulp watch` - Watch for jade, less and coffeescript file changes and re-build on the fly.
- `gulp build` - Re-build jade, less and coffeescript files.
- `gulp release` - Test, build, bump versions and git tag.
