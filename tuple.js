/// clone, pipe

var partial = require('./partial.js');

var tupleProto = {
    '@@functional/tuple' : true,
    unpack : partial(1, function(fn)
    {
        return fn.apply(this, this._values);
    }),
    toString : function()
    {
        return ['(', this._values.join(', '), ')'].join('');
    },
    at : partial(1, function(index)
    {
        return this._values[index];
    })
};

function tuple()
{
    var obj = Object.create(tupleProto);

    obj._values = Array.prototype.slice.call(arguments);
    return obj;
}

module.exports = tuple;
