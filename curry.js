
function _curry(nbArg, fn)
{
    var args = Array.prototype.slice.call(arguments, 2);

    return function()
    {
        var args2 = Array.prototype.slice.call(arguments);
        var toApply;

        if (args.length + args2.length < nbArg)
        {
            toApply = [nbArg, fn].concat(args.concat(args2));

            return _curry.apply(this, toApply);
        }
        return fn.apply(this, args.concat(args2));
    }
}

function curry(nbArg, fn)
{
    if (nbArg === 0)
    {
        return fn;
    }
    return _curry.apply(this, [nbArg, fn]);
}

module.exports = curry;
