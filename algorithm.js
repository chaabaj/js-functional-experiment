var partial = require('./partial.js');

var map = partial(2, function(array, fn)
{
    return Array.prototype.map.apply(array, [fn]);
});

var forEach = partial(2, function(array, fn)
{
    return Array.prototype.forEach.apply(array, [fn]);
});

var reduce = partial(2, function(array, fn)
{
    return Array.prototype.reduce.apply(array, [fn]);
});

var keys = partial(1, function(obj)
{
    return Object.keys(obj);
});

var find = partial(2, function(array, fn)
{
    var length = array.length;

    for (var i = 0; i < length; ++i)
    {
        if (fn.apply(this, [array[i], i , array]))
        {
            return array[i];
        }
    }
});

var every = partial(2, function(array, fn)
{
    return Array.prototype.every.apply(array, [fn]);
});

var some = partial(2, function(array, fn)
{
    return Array.prototype.some.apply(array, [fn]);
});

var getField = partial(2, function(obj, field)
{
    var fields = field.split('.');

    var _getField = function(index, val)
    {
        if (index < fields.length - 1)
        {
            return _getField(index + 1, val[fields[index]]);
        }
        return val[fields[index]];
    }
    return _getField(0, obj);
});

module.exports = {
    map : map,
    forEach : forEach,
    reduce : reduce,
    keys : keys,
    getField : getField,
    find : find,
    every : every,
    some : some,
    getField : getField
};
