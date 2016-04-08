var curry = require('./curry.js');

function generate(size, value)
{
    var array = [];

    for (var i = 0; i < size; ++i)
    {
        if (typeof value === 'function')
        {
            array.push(value())
        }
        else
        {
            array.push(value);
        }
    }
    return array;
}

module.exports = curry(2, generate);
