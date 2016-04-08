var partial = require('../partial.js');
var curry = require('../curry.js');
var _ = require('../placeholder.js');

var add = partial(2, function(x, y)
{
    return x + y;
});

module.exports = {};

module.exports.testPartial = function(test)
{
    test.ok(Function.prototype.constructor === add(1).constructor, 'Should return a function');
    test.ok(Number.prototype.constructor === add(1, 2).constructor, 'Should return a number');
    test.ok(Function.prototype.constructor === add(_, 1).constructor, 'Should return a function');
    test.ok(Number.prototype.constructor === add(1)(2).constructor, 'Should return a number');
    test.ok(Number.prototype.constructor === add(_, 1)(2).constructor, 'Should return a number')
    test.done();
};

module.exports.testPartialWithCurry = function(test)
{
    var curryAdd = curry(2, add);

    test.ok(Function.prototype.constructor === curryAdd(1).constructor, 'Should return a function');
    test.ok(Function.prototype.constructor === curryAdd(2)(_).constructor, 'Should return a function');
    test.ok(Number.prototype.constructor === curryAdd(2)(5).constructor, 'Should return a number');
    test.ok(Number.prototype.constructor === curryAdd(2, 4).constructor, 'Should return a number');
    test.done();
}
