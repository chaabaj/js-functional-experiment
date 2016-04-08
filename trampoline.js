function trampoline(fn)
{
    var args = Array.prototype.slice.call(arguments, 1);
    var result = fn.apply(this, args);

    while (typeof result === 'function')
    {
        result = result();
    }
    return result;
}


module.exports = trampoline;
