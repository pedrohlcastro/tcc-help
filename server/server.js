'use strict';

const ENV = process.env.NODE_ENV;

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import compress from 'shrink-ray';
import helmet from 'helmet';

import configEnv from './config/configEnv';
import db from './config/db';

const app = express();

app.db = db(app);

//config gzip compress
if (ENV != 'test'){
    app.use(compress({
        cache: (req, res) => {
            return true;
        },
        brotli: {
            quality: 6
        },
        zlib: {
            quality: 6
        }
    }));
}

app.use(morgan(ENV));
app.use(cors());

app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
app.use(helmet.xssFilter());
app.disable('x-powered-by');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../client/dist/')));

//API routes goes here
app.get('/', (req, res) => {
    res.json({status: 'oks'});
});
const User = app.db.models.User;
app.route('/users')
    .get((req, res) => {
        User.findAll({})
            .then(result => res.json(result))
            .catch(err => res.sendStatus(412));
    })
    .post((req, res) => {
        User.create(req.body)
        .then(result => res.json(result))
        .catch(err => res.sendStatus(412));
    });

app.route('/users/:id')
    .get( (req, res) => {
        User.findOne({where: req.params})
            .then(result => res.json(result))
            .catch(err => res.sendStatus(412));
    })
    .put( (req, res) => {
        User.update(req.body, {where: req.params})
            .then(result => res.json(result))
            .catch(err => res.sendStatus(412));
    })
    .delete( (req, res) => {
        User.destroy({where: req.params})
            .then(result => res.sendStatus(204))
            .catch(err => res.sendStatus(412));
    });

//Call Angular
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

//manage config per environment
configEnv(app);

export default app;