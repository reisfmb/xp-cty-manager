# Content Type Manager for Enonic XP

This app enables the management of content types through a GUI.

This app does not require any configuration.

## Compatibility

This app uses the File System Access API. To check what browsers currently support it, please check:

https://caniuse.com/?search=File%20System%20Access%20API

## Building and deploying

Build this application from the command line. Go to the root of the project and enter:

    ./gradlew clean build

To deploy the app, set `$XP_HOME` environment variable and enter:

    ./gradlew deploy
