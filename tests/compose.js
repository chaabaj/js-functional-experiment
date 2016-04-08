var compose = require('../compose.js');

module.exports = {};

module.exports.testCompose = function(test) {
    var fn = compose(function(a) {
        return a + 40;
    }, function(b) {
        return b * 2;
    }, function(a, b) {
        return a + b;
    });
    test.ok(fn(30, 40) === 180, "Should be equal to 180");
    test.done();
}
