const enhancer = require('./enhancer.js');
// test away!

describe('enhancer module', () => {
    describe('repair function', () => {
        test('repair function returns an object', () => {
            expect(enhancer.repair()).toBeInstanceOf(Object)
        })
        test('repair function returns a durability property', () => {
            expect(enhancer.repair({durability: 50})).toHaveProperty("durability")
        })
        test('repair function returns an object with durability property with value 100', () => {
            expect(enhancer.repair({durability: 20})).toMatchObject({durability: 100})
        })
    })

    describe('success function', () => {
        test('success function returns an object', () => {
            expect(enhancer.success({durability: 20, name: 'wow', enhancement: 2})).toBeInstanceOf(Object)
        })
        test('success function returns an object with name, durability, and enhancement properties', () => {
            const object = {durability: 20, name: 'wow', enhancement: 2};
            expect(enhancer.success(object)).toHaveProperty('durability');
            expect(enhancer.success(object)).toHaveProperty('name');
            expect(enhancer.success(object)).toHaveProperty('enhancement')
        })
        test('success function returns an object with durability property value being between 0-100', () => {
            const object = enhancer.success({durability: 100, name: 'wow', enhancement: 3});
            expect(object.durability).toBeLessThan(101);
            expect(object.durability).toBeGreaterThan(-1);
        })
        test('success function returns an object with enhacement property between 0 and 20', () => {
            const object = enhancer.success({durability: 88, enhancement: 20, name: 'wow'});
            expect(object.enhancement).toBeLessThan(21);
            expect(object.enhancement).toBeGreaterThan(-1);
        })
        test('success function retuns an object with name property having type string', () => {
            const object = enhancer.success({durability: 44, enhancement: 18, name: 'wow'})
            const actualType = typeof(object.name);
            const expectedType = 'string';
            expect(actualType).toEqual(expectedType);
        })
        test('success function increases enhancement level by one when enhancement property is not originally equal to 20', () => {
            const object = {name: 'wow', durability: 20, enhancement: 19};
            const {enhancement: originalEnhancement} = object;
            const newObject = enhancer.success(object);
            const {enhancement: updatedEnhancement} = newObject;
            expect(updatedEnhancement).toEqual(originalEnhancement + 1);
        })
        test('success function does not increase enhance property value when it is equal to 20', () => {
            const object = {name: 'wow', durability: 55, enhancement: 20};
            const {enhancement: originalEnhancement} = object;
            const newObject = enhancer.success(object);
            const {enhancement: updatedEnhancement} = newObject;
            expect(updatedEnhancement).toEqual(originalEnhancement);
        })
    })
    describe('fail function', () => {
        test('fail function returns an object', () => {
            expect(enhancer.fail({})).toBeInstanceOf(Object)
        })
        test('fail function returns an object with name, enhancement, and durability properties', () => {
            const object = {name: 'wow', durability: 45, enhancement: 10};
            expect(enhancer.fail(object)).toHaveProperty('name');
            expect(enhancer.fail(object)).toHaveProperty('durability');
            expect(enhancer.fail(object)).toHaveProperty('enhancement');
        })
        test('fail function decreases objects durability by 5 when its enhancement property has a value less than 15', () => {
            const object = {name: 'wow', durability: 50, enhancement: 14};
            const {durability} = object;
            const newObject = enhancer.fail(object);
            const {durability: newDurability} = newObject;
            expect(durability).toEqual(newDurability + 5);
        })
        test('fail function decreases objects durability by 10 and does not decrease enhancement when its enhancement property has a value of 15 or 16', () => {
            const object = {name: 'wow', durability: 25, enhancement: 16};
            const {durability: originalDurability, enhancement: originalEnhancement} = object;
            const newObject = enhancer.fail(object);
            const {durability: newDurability, enhancement: newEnhancement} = newObject;
            expect(newDurability).toEqual(originalDurability - 10);
            expect(newEnhancement).toEqual(originalEnhancement);
        })
        test('fail function decreases objects enhancement value by 1 and objects durability value by 10 if objects enhancement level is greater than 16', () => {
            const object = {name: 'wow', durability: 25, enhancement: 18};
            const {enhancement: originalEnhancement, durability: originalDurability} = object;
            const newObject = enhancer.fail(object);
            const {enhancement: newEnhancement, durability: updatedDurability} = newObject;
            expect(newEnhancement).toEqual(originalEnhancement - 1);
            expect(updatedDurability).toEqual(originalDurability - 10);
        })
    })
    
})
 