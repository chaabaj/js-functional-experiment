var type = require('./type.js');
var algorithm = require('./algorithm.js')

/**
 * if expr is an array run every sub expr inside with branchTestMatch
 * if expr is an object run a expr match between them
 * if expr is a value (not a function function matching is forbidden)
 */
function branchTestMatch(expr, value)
{
    if (type.isSameType(Array, true, expr))
    {
        return algorithm.every(expr, function(subExpr, index)
        {
            return branchTestMatch(subExpr, value[index]);
        });
    }
    else if (type.isSameType(Object, true, expr))
    {
        return algorithm.every(Object.keys(expr), function(key)
        {
            return branchTestMatch(expr[key], value[key]);
        });
    }
    else if (type.isType(expr)) // it's a type
    {
        return type.isSameType(expr, true, value);
    }
    return expr === value;
}

function branchSelector(branches, value)
{
    return algorithm.find(branches, function(branch)
    {
        return branchTestMatch(branch.expr, value);
    });
}

function match(whenFn)
{
    var _otherwise;
    var _branches = [];
    var selector = {
        when : function(expr, fn)
        {
            _branches.push({
                expr : expr,
                fn : fn
            });
        },
        otherwise : function(fn)
        {
            _otherwise = fn;
        }
    };

    whenFn.apply(selector);
    return function(value)
    {
        var selectedBranch = branchSelector(_branches, value);

        if (selectedBranch)
        {
            return selectedBranch.fn(value)
        }
        else if (_otherwise)
        {
            return _otherwise(value);
        }
        throw new Error('No branch selected and otherwise case is not defined');
    }
}

module.exports = match;
