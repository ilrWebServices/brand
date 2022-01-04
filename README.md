# ILR Brand Site

This is the site at https://brand.ilr.cornell.edu, AKA The Brand Site.

It is based on the [Drupal's Core Recommended Metapackage][].

## Requirements

- git
- PHP 7.2 or greater
- Composer
- Drush ([Drush launcher][] is recommended, since a copy of Drush is included in this project)
- Node.js 8.x or greater (for theming), ideally with nvm

## Setup

1. Clone this repository
2. Open a terminal at the root of the repo
3. Run `composer install`
4. Copy `.env.example` to `.env` and update the database connection and other info.
5. Cd into the custom theme folder and run `nvm use && npm install && npm run build` to generate the CSS for the custom theme.

Setting up your local web server and database is left as an excercise for the developer. Please note when setting up your web server, though, that this project uses the `web` directory as the web root.

### Development-only Settings

You may wish to configure some settings (cache, config splits, etc.) for local development. To do so, you may optionally add a `settings.local.php` file to `web/sites/default/`.

Here's a suggested example:

```
<?php

// Allow any domain to access the site.
$settings['trusted_host_patterns'] = [];

// Enable the config split for development-only modules, like field_ui.
$config['config_split.config_split.local']['status'] = TRUE;

// Enable local development services.
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/local_development.services.yml';

// Show all error messages, with backtrace information.
$config['system.logging']['error_level'] = 'verbose';

// Disable CSS and JS aggregation.
$config['system.performance']['css']['preprocess'] = FALSE;
$config['system.performance']['js']['preprocess'] = FALSE;

// Skip file system permissions hardening.
$settings['skip_permissions_hardening'] = TRUE;

// Allow local access to media entity canonical URLs (e.g. /media/1).
$config['media.settings']['standalone_url'] = TRUE;
```

## Managing Modules and Other Dependencies

Use standard composer commands to add, remove, and update project dependencies. To add the rules module, for example, run:

```
$ composer require drupal/rules:~1.0
```

To add a module for developer use only, which will prevent its installation on the production site, use the `--dev` paramater, like so:

```
$ composer require --dev drupal/devel:~1.0
```

Outdated Drupal modules can be listed with the following command:

```
$ composer outdated "drupal/*"
```

To update a specific module, run something like:

```
composer update drupal/rules
```

## Patching Contributed modules

If you need to apply patches (depending on the project being modified, a pull request is often a better solution), you can do so with the [composer-patches][] plugin.

To add a patch to drupal module foobar insert the patches section in the extra section of composer.json:

```json
"extra": {
  "patches": {
    "drupal/foobar": {
      "Patch description": "URL or local path to patch"
    }
  }
}
```

## Updating Drupal core

```
$ composer update drupal/core-recommended --with-dependencies
```

Then run `git diff` to determine if any of the scaffolding files have changed.

Review changes and restore any customizations to `.htaccess` or `robots.txt`. Commit everything together in a single commit (or merge), so `web` will remain in sync with `core` when checking out branches or running `git bisect`.

See https://www.drupal.org/node/2700999 for more information.

## Theme Development

This project uses a custom theme (based on the original Emulsify project) that includes PatternLab.

The custom theme is found in `web/themes/custom/prism/`. The Sass CSS preprocessor is used for styles, and you can compile CSS automatically by running `npm start` in a spare terminal.

As of January 2022, we now commit the compiled css and javascript generated from the `npm start` command above.


[Drupal's Core Recommended Metapackage]: https://github.com/drupal/core-recommended
[Drush launcher]: https://github.com/drush-ops/drush-launcher
[composer-patches]: https://github.com/cweagans/composer-patches
