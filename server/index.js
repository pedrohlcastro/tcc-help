import app from './server';

app.listen('8000', () => {
    console.log('app is running!');
});

module.exports = app;