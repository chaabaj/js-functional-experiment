var type = require('../type');

var shortInt = type.number(0, 65356);

var Vector2DType = type.define({
    x : Number,
    y : Number
}, true);

var Vector2DShortInt = type.define({
    x : shortInt,
    y : shortInt
}, true);

var sampleVector = {
    x : 2,
    y : 1
};

var sampleVector2 = {
    x : 50,
    y : 1000
};

var invalidVector = {
    x : 2,
    y : 'Toto'
};

var arrayOfNumber = type.arrayOf(Number)

module.exports = {
    testType : function(test)
    {
        test.ok(Vector2DType.isSame(sampleVector), 'Should be the same type');
        test.ok(!Vector2DType.isSame(invalidVector), 'should not be the same type');
        test.ok(Vector2DShortInt.isSame(sampleVector2), 'should be ok for short int 2d vector');
        test.done();
    },
    testUnion : function(test)
    {
        var unionType = type.union(Number, String, Date);
        var unionType2 = type.union(Vector2DType, Number, String);

        test.ok(unionType.isSame("Test"), "should be ok with a string");
        test.ok(unionType.isSame(5), "should be ok with a number");
        test.ok(unionType.isSame(new Date()), 'should be ok with a date');
        test.ok(unionType2.isSame(sampleVector), 'should work with a vector');
        test.ok(!unionType.isSame(sampleVector), 'should not work with a vector');
        test.done();
    },
    testSequence : function(test)
    {
        var sequenceType = type.sequence(String, Number, Date);
        var validSequence = ['Test', 1, new Date()];
        var invalidSequence = ['Test', 'Toto', 1];

        test.ok(sequenceType.isSame(validSequence), 'Should be a valid sequence value for the sequence type');
        test.ok(!sequenceType.isSame(invalidSequence), 'Should not be a valid sequence for the sequenceType');
        test.done();
    },
    testNumberSubType : function(test)
    {
        var charType = type.number(0, 255);

        test.ok(charType.isSame(50), 'Should be the ok for this value');
        test.ok(!charType.isSame(2555), 'Should fail because the value overflow the number sub type');
        test.ok(!charType.isSame(-1), 'Should fail because the value underflow the number sub type');
        test.done();
    },
    testArrayTyped : function(test)
    {
        var arrayType = type.arrayOf(String, true);
        var sampleArray = ['Toto', 'Test', 'Hello'];
        var invalidArray = [1, 2, 3];

        test.ok(arrayType.isSame(sampleArray), 'Should be ok for array type of string');
        test.ok(!arrayType.isSame(invalidArray), 'Should not be ok because array is an array of number');
        test.done();
    },
    testPattern : function(test)
    {
        var stringSubType = type.pattern(/test[0-9]{1,}/);

        test.ok(stringSubType.isSame('test0123'), 'The value should match the pattern');
        test.ok(!stringSubType.isSame('Test0', 'The value should\'t match the pattern'));
        test.done();
    }
};
