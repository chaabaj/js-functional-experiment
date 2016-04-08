
function compose()
{
    var fns = Array.prototype.slice.call(arguments);

    return function()
    {
        var args = Array.prototype.slice.call(arguments);
        var result = fns[fns.length - 1].apply(this, args);

        for (var i = fns.length - 2; i >= 0; --i)
        {
            result = fns[i].apply(this, [result]);
        }
        return result;
    };
}

module.exports = compose;
