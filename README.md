behindthesite-ui
================

Log of tech used by companies.

Technologies Used
-----------------

- UI
  - Angular JS 1.x
  - Twitter Bootsrap
  - Bootswatch Themes
  - RequireJS
  - Hosted: github Pages
- API
  - Nginx
  - Varnish cache
  - Python / Django
  - Provisioning: Ansible
  - Hosted: AWS
- Data
  - PostgreSQL
  - Provisioning: Ansible
  - Hosted: AWS

Developer Notes
-----------------

- Source code for the UI code is contained in `src/`

> Unfortunately, i have not open sourced the Python/Django API due to effort to separate API keys, configs etc.

- Production code is in the main/root directory.
- To build, change (CWD) to the `/src` directory and run:
  - `./build.sh` to minify the javascript. This updates the top level directory
  - `./static.sh` to move static css/images over to the top level directory.


