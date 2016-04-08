var partial = require('./partial.js');
var algorithm = require('./algorithm.js');

var isSameStruct = partial(3, function(type, strict, value)
{
    var result = false;

    for (var key in type)
    {
        if (type.hasOwnProperty(key))
        {
            result = isSameType(type[key], strict, value[key]);
            if (typeof value[key] !== 'undefined'  && !result)
            {
                return false;
            }
            else if (strict && !result)
            {
                return false;
            }
        }
    }
    return true;
});

var isSameType = partial(3, function(type, strict, value)
{
    if (type.isSame)
    {
        return type.isSame(value);
    }
    else if (type.prototype)
    {
        return type.prototype.constructor === value.constructor;
    }
    return isSameStruct(type, strict, value);
});

var type = partial(2, function(usrType, strict)
{
    return {
        '@@functional/type' : true,
        isSame : isSameType(usrType, strict)
    };
});

var fromNumber = partial(2, function(min, max)
{
    return {
        '@@functional/type' : true,
        isSame : function(value)
        {
            return value >= min && value <= max;
        }
    };
});

var fromPattern = function(pattern)
{
    return {
        '@@functional/type' : true,
        isSame : function(value)
        {
            return pattern.test(value);
        }
    };
};

var fromArray = partial(2, function(type, strict)
{
    return {
        '@@functional/type' : true,
        isSame : function(array)
        {
            return algorithm.every(array, function(obj)
            {
                return isSameType(type, strict, obj);
            });
        }
    };
});

var union = function()
{
    var _types = Array.prototype.slice.call(arguments);

    return {
        '@@functional/type' : true,
        isSame : function(value)
        {
            return algorithm.some(_types, function(type)
            {
                return isSameType(type, true, value);
            });
        }
    };
};

var sequence = function()
{
    var _types = Array.prototype.slice.call(arguments);

    return {
        '@@functional/type' : true,
        isSame : function(array)
        {
            if (array.length !== _types.length)
            {
                return false;
            }
            return algorithm.every(_types, function(type, index)
            {
                return isSameType(type, true, array[index]);
            });
        }
    };
};

var any = {
    '@@functional/type' : true,
    isSame : function()
    {
        return true;
    }
};

var isType = function(param)
{
    return (param.prototype && param.prototype.constructor) || param['@@functional/type'];
};

module.exports = {
    define : type,
    number : fromNumber,
    arrayOf : fromArray,
    pattern : fromPattern,
    union : union,
    any : any,
    sequence : sequence,
    isSameType : isSameType,
    isSameStruct : isSameStruct,
    isType : isType
};
