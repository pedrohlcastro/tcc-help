import app from './server';

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  /*eslint-disable */
  console.log('app is running!');
  /* eslint-enable */
});
module.exports = app;
