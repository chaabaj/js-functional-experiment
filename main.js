var match = require('./match.js');

var factorial = match(function()
{
    this.when(0, function(value)
    {
        return 1;
    });
    this.when(Number, function(value)
    {
        return value * factorial(value - 1);
    });
    this.otherwise(function()
    {
        console.log('This is not a number');
    });
});

console.log(factorial(5));
console.log(factorial(2));

var arrayMatch = match(function()
{
    this.when([1, 2, Number], function()
    {
        return 1;
    });
    this.when([4, 5, 6], function()
    {
        return 2;
    });
    this.otherwise(function()
    {
        console.log('Not a valid point');
    });
});

console.log(arrayMatch([4, 5, 6, 3]));
