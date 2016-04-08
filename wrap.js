
function wrap(fn)
{
    var args = Array.prototype.slice.call(arguments, 1);

    return function()
    {
        fn.apply(this, args);
    };
}

module.exports = wrap;
