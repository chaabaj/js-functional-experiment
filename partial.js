var _ = require('./placeholder.js');
var find = require('./algorithm.js').find;
var generate = require('./generate.js');

function _updateArgs(args1, args2)
{
    var dest = args1.concat([]);
    var idx2 = 0;

    for (var i = 0; i < args1.length && idx2 < args2.length; ++i)
    {
        if (args1[i]['@@functional/placeholder'])
        {
            dest[i] = args2[idx2];
            idx2++;
        }
    }
    return dest;
}

function _partial(fn)
{
    var args = Array.prototype.slice.call(arguments, 1);

    var __partialFn = function()
    {
        var args2 = Array.prototype.slice.call(arguments);
        var hasMissingArgs = false;
        var newArgs = _updateArgs(args, args2);

        hasMissingArgs = find(newArgs, function(arg)
        {
            return arg['@@functional/placeholder'];
        });
        if (!hasMissingArgs)
        {
            return fn.apply(this, newArgs);
        }
        return _partial.apply(this, [fn].concat(newArgs));
    };
    return __partialFn.bind(this);
}

function partial(nbArgs, fn)
{
    var args = generate(nbArgs, _);

    return _partial.apply(this, [fn].concat(args));
}

module.exports = partial;
