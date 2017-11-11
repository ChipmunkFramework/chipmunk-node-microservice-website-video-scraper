/**
 * @file
 * @version 1.0.0
 * {@link https://github.com/ChipmunkFramework/chipmunk-node-microservice-website-video-scraper GitHub}
 */

'use strict';

/**
 * @const {child_process.spawn}
 */
const { spawn } = require('child_process');

/**
 * @const {child_process.spawn}
 */
const child = spawn('youtube-dl', ['https://www.youtube.com/watch?v=TiKMsx2Exrw']);

/**
 *
 */
child.on('exit', function (code, signal) {
    /*console.log('child process exited with ' +
        `code ${code} and signal ${signal}`);*/

    if (code === 0 && !signal) {
        console.log('Success!');
    } else {
        console.log('Error!');
        console.log('Signal: ' + signal);
    }
});

/**
 *
 */
child.on('disconnect', function () {
    
});

/**
 *
 */
child.on('error', function () {

});

/**
 *
 */
child.stdout.on('data', (data) => {
    console.log(`child stdout:\n${data}`);
    let msg = data.toString();
    let regex = /(\[.*\])(\s+)(\d+\.\d+%)(\s+of\s+)(\d+\.\d+[A-z]+)(\s+at\s+)(\d+\.\d+[A-z]+\/s)(\s+)(ETA\s+\d+\:\d+)/;
    let result = msg.match(regex);
    let regexETA = /(ETA\s+)(.*)/;
    let etaArr = result.match(regexETA);
    let regexAction = /\[([A-z]+)\]/;
    let action = result[1],
        downloadPercentage = result[3],
        eta = etaArr[1];

    /**
     *
     * @type {{action: string, downloadPercentage: string, eta: (*|string)}}
     */
    let jsonResult = {
        "action": action,
        "downloadPercentage": downloadPercentage,
        "eta": eta
    };

    console.log(result);
    console.log(jsonResult);
});

/**
 *
 */
child.stderr.on('data', (data) => {
    console.error(`child stderr:\n${data}`);
});

/*let process = require('process');
let express = require('express');
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');

process.on('uncaughtException', (err) => {
    // something went unhandled.
    // Do any cleanup and exit anyway!

    console.error(err); // don't do just that.

    // FORCE exit the process too.
    process.exit(1);
});

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
    hello: () => {
        return 'Hello world!';
    },
};

let app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');*/