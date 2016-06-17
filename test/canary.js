var Lab = require('lab');
var Code = require('code');

var lab = exports.lab = Lab.script();


lab.experiment('Canary', function () {

  lab.test('test the lab framework', function (done) {

    Code.expect(true).to.be.true();

    done();
  });
});
