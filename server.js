const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const app = express();

// Schema and Resolver

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
})
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-blcab.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    {useNewUrlParser: true, useUnifiedTopology: true}).
    then(() => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });