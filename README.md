# lab-08-back-end

**Author**: Jeff Borda and Evan Slaton
**Version**: 1.4.0

## Overview
This is the backend to the City Explorer page.  Once the user enters a location, we get information related to that location from the following APIs:
- Google Maps
- Dark Sky
- Yelp
- The Movie DB

## Getting Started
To use this app, download the [City Explorer](https://github.com/codefellows/seattle-301d38/tree/master/06-node-express-apis) front end application.  This can be run on live-server, connecting to the backend locally or by adding this deployed site's url.

## Architecture
This was coded with JavaScript and Node.js, with the following dependecies:
- Express
- Dotenv
- Superagent
- Cors

## Change Log
01-19-2016 12:40pm - Application fully functional, now returning movie information from The Movie DB.

01-19-2016 12:09pm - Yelp API added.

01-19-2016 10:10am - Weather data added using Dark Sky API.

01-19-2016 10:00am - Finished refactoring code from the previous day when the Google Maps API was added.  Now using .map().

## Credits and Collaborations
Jeff Borda and Evan Slaton worked together during all phases of today's development.