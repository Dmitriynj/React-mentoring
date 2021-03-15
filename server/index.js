// TODO: remove for production, use generated webpack bundles
// transpile imports on the fly
// require('@babel/register')({
//   extensions: ['.jsx', '.js', '.mjs'],
// });

const app = require('./app');

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});
