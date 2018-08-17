# README
## About
This is a simple web application for managing grandmas recipes. It is written using _Ruby on Rails_ and _react_. This is my
first _react_ project since I wanted to get started learning the use of it.
## Features
All requirements are met. I needed the full 4h timeframe for implementing those. _react_ is new to me. I spend much time reading its documentation. Things which are missing are paging and a WYSIWYG-Editor for the cooking steps.
## Deployment
Make sure you have ruby 2.5, nodejs and yarn installed.

`bundle install`

`yarn install`

`rails assets:precompile`

`rails db:migrate`

`rails server`

Alternativly you can use docker.

`docker build --tag grandma .`

`docker run -p 3000:3000 grandma`
