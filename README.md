Twitter Dancer!
=======

Twitter Dancer is a Twitter API based application implemented using the Dancer web application framework. The Dancer framework is written in Perl and inspired by Ruby's Sinatra.


#Tools used in this implementation:

* [Dancer] is a simple but powerful web application framework for Perl.

* [Twitter REST APIs] provides programmatic access to read and write Twitter data. Author a new Tweet, read author profile and follower data, and more. The REST API identifies Twitter applications and users using OAuth; responses are available in JSON.

* [Bootstrap] is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.

* [Redis] is an open source, BSD licensed, advanced key-value cache and store. It is often referred to as a data structure server since keys can contain strings, hashes, lists, sets, sorted sets, bitmaps and hyperloglogs.

* [jQuery] is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.

* [jQuery UI] is a curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library.

* [Perloku] to deploy Perl applications in seconds. 

# Setup Instructions 
These steps would lead you to run the application locally or even complete a  heroku deployment.

## Step 1: Clone

Clone the git repository:

```git
$ git clone https://github.com/kzaky/TwitterDancer.git

```

## Step 2: Setup your Twitter Application

* Get your Twitter API configuration from https://apps.twitter.com/
* Setup a new application and get your API keys and access tokens.

## Step 3: Setup your Redis Server

* Download redis from redis.io and startup an instance locally. (localhost:6379)
* For Deployment you can use RedisToGo.com and depending on your usuage you can buy a plan or opt-in for their 5MB free plan.


## Step 4: Setup your environment variables

```yaml
# configuration file for development environment

# the logger engine to use
# console: log messages to STDOUT (your console where you started the
#          application server)
# file:    log message to a file in log/
logger: "console"

# the log level for this environment
# core is the lowest, it shows Dancer2's core log messages as well as yours
# (debug, info, warning and error)
log: "core"

# should Dancer2 consider warnings as critical errors?
warnings: 1

# should Dancer2 show a stacktrace when an error is caught?
# if set to yes, public/500.html will be ignored and either
# views/500.tt or a default error template will be used.
show_errors: 1

# print the banner
startup_info: 1

# Twitter API configuration
twitter_consumer_key: ""
twitter_consumer_secret: ""
twitter_access_token: ""
twitter_access_token_secret: ""

# Redis Server configuration (Required for Intersection feature only)
redis_server: ""
redis_password: ""
```

## Step 5: Run the Server

Test that you can start the server:

```sh
chmod +x Perloku
PORT=3000 ./Perloku
```

## Setup 6: See if it works

Point your browser to the following:

```sh
http://localhost:3000
```
## Setup 7: Deployment (Requires Redis Setup (not locally) to run the Intersection feature)

Deploy:

```sh
git init
git add .
git update-index --chmod=+x Perloku (only if using Windows)
git update-index --chmod=+x bin/app.pl (only if using Windows)
git commit -m "Initial version"
heroku create -s cedar --buildpack http://github.com/judofyr/perloku.git
git push heroku master
```
## Screenshots

![TwitterDancer](/public/images/screenshots/app.png)
![User's Recent Tweets](/public/images/screenshots/recent.png)
![Two Users Intersection](/public/images/screenshots/intersection.png)
####Enjoy!

[jQuery]:http://jquery.com
[Perloku]:http://github.com/judofyr/perloku.git
[Bootstrap]:http://getbootstrap.com/
[Redis]:http://redis.io/
[jQuery UI]:http://jqueryui.com/
[Twitter REST APIs]:https://dev.twitter.com/overview/documentation
[Dancer]:http://perldancer.org/