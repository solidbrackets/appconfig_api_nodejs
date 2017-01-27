# AppConfig v1.0.0

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)
[![Github Issues](http://githubbadges.herokuapp.com/solidbrackets/appconfig_api_nodejs/issues.svg?style=flat-square)](https://github.com/solidbrackets/appconfig_api_nodejs/issues)
[![Pending Pull-Requests](http://githubbadges.herokuapp.com/solidbrackets/appconfig_api_nodejs/pulls.svg?style=flat-square)](https://github.com/solidbrackets/appconfig_api_nodejs/pulls)

If you're rolling your own Continious Integration/Delivery solution or just want to prevent a vendor lock-in you can use this #serverless #microservice to store your applications configuration.

Since we don't want to run a critical build/deployment dependency on our own infrastructure we used [serverless](http://www.serverless.com) so we can deploy this project to AWS (Cloudformation, API gateway, S3, DynamoDB, lambda).


## Installing

We recommend Docker for your local development environment.

```
npm run install-docker
```


## Usage

After installing all the packages you can spin up your webserver and database.

```
npm run server-docker

npm run tests
```

The API will listen to:
* http://localhost:7999/v1/apps
* http://localhost:7999/v1/apps/{slug}

You can use the DynamoDB UI to query the database:
* http://localhost:8000/shell/


## An example AppConfig object:

```json
{
    "id": "yourappname",
    "scm": {
        "type": "git",
        "uri": "git@github.org:org/awesome.git"
    },
    "container": {
        "docker":{
            "uri":"org/awesome"
        }
    },
    "build":{
        "commands":{
            "test": "vendor/bin/phpunit"
        }
    },
    "environments": {
        "test": {
            "variables": {
                "key": 1
            }
        },
        "development": {
            "variables": {
                 "key": 2
            }
        },
        "acceptance": {
            "variables": {
                 "key": 3
            }
        },
        "production": {
            "variables": {
                 "key": 4
            }
        }
    }
}
```

## Deploy

The following command will remove the devDepencies and deploy you application to AWS.

```
npm run deploy
```

## TODO
* more CRUD api's 
* implement webhooks
* encrypt data on amazon

## Contributing

Feel free to create an issue. Pull requests are much appreciated.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/solidbrackets/appconfig_api_nodejs/tags). 

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.










