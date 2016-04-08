var match = require('./match.js');
var type = require('./type.js');

module.exports = {
    testWithFactorial : function(test)
    {
        var factorial = match(function()
        {
            this.when(0, function()
            {
                return 1;
            });

            this.when(Number, function(n)
            {
                return n * factorial(n - 1);
            });

            this.otherwise(function()
            {
                return 0;
            });
        });
        test.ok(factorial(0) === 1, "Should equal 1");
        test.ok(factorial(3) === 6, "Should equal 6");
    },
    testWithPoint : function(test)
    {
        var p = {
            x : 2,
            y : 4
        };

        var p2 = {
            x : 1,
            y : 3,
            z : 5
        };

        var fn = match(function()
        {
            this.when({x : Number, y : Number}, function()
            {
                return 1;
            });

            this.when({x : 1, y : 3, z : 3}, function()
            {
                return 2;
            });

            this.otherwise(function()
            {
                return -1;
            });
        });

        test.ok(fn(p) === 1, "Should match a 2d point");
        test.ok(fn(p2) === 2, "Should match a 3d point");
        test.ok(fn(null) === -1, "Should match nothing");
    }
};
