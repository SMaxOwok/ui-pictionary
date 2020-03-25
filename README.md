# UI Pictionary
[![Build Status](https://travis-ci.org/SMaxOwok/ui-pictionary.svg?branch=master)](https://travis-ci.org/SMaxOwok/ui-pictionary)

![picationary](static/pictionary.gif)

# Setup
## Installation
- Install Ruby for macOS with `brew install ruby` and check the version with `ruby -v`. Using a version manager like [RVM](http://rvm.io/) you can install or switch to the required version, 2.5.7.
- Install the Bundler 2 gem using `gem install bundler`
  - Make sure to run `bundle install` to install all other gem dependencies
- Install [nodenv](https://github.com/nodenv/nodenv) and [yarn](https://yarnpkg.com/)
  - `brew install nodenv` and `brew install yarn` for macOS
    - You may need to `yarn cache clean` and then `yarn install` if you already have yarn on your machine
- UI-Pictionary uses [Sidekiq](https://sidekiq.org/) for background processing, and Sidekiq requires Redis
  - Install and run redis on macOS
     ```#bash!
      $ brew install redis
      ```
     then

     ```#bash!
      $ brew services start redis
     ```

## Running the app
Because you will need several processes running for this app, it's advised to use the foreman gem
  ```#bash!
  $ gem install foreman
  ```
  (only necessary if foreman is not already on your machine globally)

  Run the processes:
  ```#bash!
  $ foreman start
  ```

If you would prefer running each process in separate tabs, these are the ones you will need:

clock: `bin/clockwork ./clock.rb`

web: `bin/rails s`

webpack: `bin/webpack-dev-server`

worker: `bin/sidekiq -C config/sidekiq.yml`
