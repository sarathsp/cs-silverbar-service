##  silverbar marketplace microservice

Microservice to retrieve market specific demand for silver bars.

## Operations

The microservice serves the below API request:
-  POST - /api/register
-  POST - /api/cancel
-  GET - /api/summary


## Usage

 Start the microservice using DEBUG={true|false} npm start` after doing an npm install.

## Unit Tests

The tests can be executed using `npm test` from the root level of the microservice.

## Details

This service uses only an in memory array and all data associated with the service will be lost on restart.
Uses express and Ramda library for most of the operations.
Added winston for logs.


