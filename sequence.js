var partial = require('./partial');
var _ = require('./placeholder.js');

function sequence()
{
    var fns = Array.prototype.slice.call(arguments);

    return function()
    {
        var args = Array.prototype.slice.call(arguments);
        var result = fns[0].apply(this, args);

        for (var i = 1; i < fns.length; ++i)
        {
            result = fns[i](result);
        }
        return result;
    };
}
