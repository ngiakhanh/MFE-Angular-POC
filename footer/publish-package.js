const exec = require('child_process').exec;
exec(
  'npm publish --access public',
  {
    cwd: 'dist/footer-web-element'
  },
  (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    console.log(error);
  });
