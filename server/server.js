import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import compress from 'shrink-ray';
import helmet from 'helmet';
import passport from 'passport';
import configEnv from './config/configEnv';
import UserRoutes from './routes/UserRoutes';
import configBearerStrategy from './config/auth/passportBearerConfig';
import configPassportLocalStrategy from './config/auth/passportLocalConfig';
import RuleRoutes from './routes/RuleRoutes';
import TopicRoutes from './routes/TopicRoutes';
import ReplyRoutes from './routes/ReplyRoutes';
import StudentProfessorRoutes from './routes/StudentProfessorRoutes';
import ProfessorListRoutes from './routes/ProfessorListRoutes';
import TccRoutes from './routes/TccRoutes';
import CheckRulesRoutes from './routes/CheckRulesRoutes';
import CommentRoutes from './routes/CommentRoutes';

const ENV = process.env.NODE_ENV;

const app = express();

// config gzip compress
if (ENV !== 'test') {
  app.use(compress({
    cache: () => true,
    brotli: {
      quality: 6,
    },
    zlib: {
      quality: 6,
    },
  }));
}

app.use(morgan(ENV));
app.use(cors());
app.use(passport.initialize());
configPassportLocalStrategy(passport);
configBearerStrategy(passport);
app.use(passport.session({ session: false }));


app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
app.use(helmet.xssFilter());
app.disable('x-powered-by');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../client/dist/')));

// API routes goes here
app.get('/api', (req, res) => {
  res.json({ status: 'oks' });
});

app.use('/users', UserRoutes);
app.use('/rules', RuleRoutes);
app.use('/topic', TopicRoutes);
app.use('/reply', ReplyRoutes);
app.use('/professor_list', ProfessorListRoutes);
app.use('/studentProfessor', StudentProfessorRoutes);
app.use('/tcc', TccRoutes);
app.use('/check-rule', CheckRulesRoutes);
app.use('/comment', CommentRoutes);


// Call Angular
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// manage config per environment
configEnv(app);

export default app;
