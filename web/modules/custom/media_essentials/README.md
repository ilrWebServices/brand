# Media Essentials

### Introduction
This custom module is an attempt to bundle the configuration and installation of a workable media implementation for reusable images out of the box in Drupal. The goal is an easy starting point for creating and reusing media elements. It is based on a slimmed-down version of [thunder_media](https://github.com/BurdaMagazinOrg/thunder-distribution/tree/develop/modules/thunder_media).

Currently we cover the following use-cases:

- Drag/drop image addition with dropzone
- Multi-Upload of images
- Combining images to a gallery

### Caveats
**The bundled configuration was created on a site that used the standard profile. If your site is using a different profile, it may not import correctly.**

### Installation
Assuming that you are managing your site with Composer. It has been tested with sites generated via [Composer template for Drupal projects](https://github.com/drupal-composer/drupal-project).

1. `cd` to the root of your project, where your composer.json lives.
2. Add library integration for dropzonejs with `composer require oomphinc/composer-installers-extender`
3. Add or append to the following section to your composer.json:
```
    "extra": {
            "installer-types": ["library"],
            "installer-paths": {
                "web/core": ["type:drupal-core"],
                "web/libraries/{$name}": [
                    "type:drupal-library",
                    "enyo/dropzone"
                ],
                "web/modules/contrib/{$name}": ["type:drupal-module"],
                "web/profiles/contrib/{$name}": ["type:drupal-profile"],
                "web/themes/contrib/{$name}": ["type:drupal-theme"],
                "drush/contrib/{$name}": ["type:drupal-drush"]
            }
        }
    }
```
3. `composer require drupal/focal_point drupal/entity_browser:2.x-dev drupal/ctools drupal/crop:2.x-dev drupal/inline_entity_form drupal/dropzonejs_eb_widget:2.x-dev drupal/crop:2.x-dev enyo/dropzone`
4. `cd web`
5. `drush en media_essentials`
6. `drush cr`

### Configuration
I've included an example module ("media_essentials_example"), which will create a new content type called "Media Example" with the configuration described below. Consider using that as a reference.

I still find the media ecosystem in Drupal 8 a bit conceptually confusing. This module assumes that the standard use case for media is to add a reusable media field to a content type. To do that, you start by creating an entity_reference field on a content type, choosing "Other" in the dropdown. After you name your field, you will be able to choose "Media" as the type of the reference field. As you configure the field, you can select the media bundle (in this case, "image" is provided upon install). After the field is created, head to the "Manage form display" screen so that you can configure the field widget. Select "Entity browser", then click the settings icon on the right and update the entity display plugin to "Rendered entity" and change the display plugin configuration to "media thumbnail". You can also select the "Show widget details as open by default" option if that's your preference. Finally, head to the "Manage display" form and configure the display settings for the rendered entity. If you choose "Thumbnail" as the format, you can then configure which image style to output, which is likely the standard use case. This workflow is a bit confusing, however, and seems likely to change as Drupal core more fully implements a media gallery.

This suite of media modules and configuration easily integrates with the [entity_embed module](https://www.drupal.org/project/entity_embed), which you can use to select an image from the gallery, if that's needed on the project.
