import dishesConst from './dishesConst.js';
import { assert, expect, should } from 'chai';

const utilities= await import(`../src/${TEST_PREFIX}utilities.js`);

describe("TW1.1.4 sort(CB) recap exercise: sortDishes", function tw1_1_4() {
    this.timeout(200000);  // increase to allow debugging during the test run
    before(function tw1_1_4_before(){
        if(!utilities || !utilities.compareDishesCB || !utilities.sortDishes)
            this.skip();
    });

    it("compareDishesCB, export it and sortDishes from utilities.js to enable", function  tw1_1_4_1(){
        this._runnable.title="compareDishesCB";
        const {compareDishesCB}= utilities;

        expect(compareDishesCB(dishesConst[0], dishesConst[1]), "no known type comes before starter").to.equal(-1);
        expect(compareDishesCB(dishesConst[1], dishesConst[0]), "no known type comes before starter").to.equal(1);

        expect(compareDishesCB(dishesConst[1], dishesConst[4]), "starter comes before main course").to.equal(-1);
        expect(compareDishesCB(dishesConst[4], dishesConst[1]), "starter comes before main course").to.equal(1);

        expect(compareDishesCB(dishesConst[4], dishesConst[6]), "main course comes before dessert").to.equal(-1);
        expect(compareDishesCB(dishesConst[6], dishesConst[4]), "main course comes before dessert").to.equal(1);

        expect(compareDishesCB(dishesConst[0], dishesConst[7]), "zero (keep order) is returned for two dishes with no known type").to.equal(0);
        expect(compareDishesCB(dishesConst[1], dishesConst[2]), "zero (keep order) is returned for two starters").to.equal(0);
        expect(compareDishesCB(dishesConst[4], dishesConst[4]), "zero (keep order) is returned for two main courses").to.equal(0);
        expect(compareDishesCB(dishesConst[6], dishesConst[6]), "zero (keep order) is returned for two desserts").to.equal(0);
        
    }),
    
    it("sort order should be: 'no known type', starter, main course, dessert (export sortDishes to enable)", function  tw1_1_4_2(){
        this._runnable.title="sort order should be: 'no type', starter, main course, dessert";
        const {sortDishes}= utilities;

        // test case: 
        // main course, dessert, starter1, starter2, no known type. Order of the two starters should be kept as in original array
        const array= [dishesConst[4], dishesConst[6], dishesConst[1], dishesConst[2], dishesConst[7]];  
        const sorted= sortDishes(array);
        expect(sorted, "sortDishes should return an array").to.be.an("array");

        let wasReverse=true;
        try{
            expect(sorted).to.deep.equal([array[1], array[0], array[3], array[2], array[4]]);
            // deep equal here ^ is caught so no confusing message to the students
        }catch(e){ wasReverse=false;}
        if(wasReverse)
            assert.fail("Your sort is almost correct but in reverse. Consider reversing the logic of your sort() callback");

        let notZero=true;
        try{
            expect(sorted).to.deep.equal([array[4], array[3], array[2], array[0], array[1]]);
            // deep equal here ^ is caught so no confusing message to the students
        }catch(e){ notZero=false;}
        if(notZero)
            assert.fail("Your sort is almost correct but has not considered the case when two objects have the same dish types");
        assert.equal(sorted.length, 5, "sorted array should have same length as array provided");
        assert.equal(sorted[0], array[4], "no type should be first");
        assert.equal(sorted[1], array[2], "starter1 should be second");
        assert.equal(sorted[2], array[3], "starter2 should be third");
        assert.equal(sorted[3], array[0], "main course should be fourth");
        assert.equal(sorted[4], array[1], "dessert should be fifth");

        // another test case: 
        // dessert, main course, starter, no known type
        const array1= [dishesConst[5], dishesConst[4], dishesConst[1], dishesConst[0] ];
        const sorted1= sortDishes(array1);

        assert.equal(sorted1.length, 4, "sorted array should have same length as array provided");
        assert.equal(sorted1[0], dishesConst[0], "no type should be first");
        assert.equal(sorted1[1], dishesConst[1], "starter should be second");
        assert.equal(sorted1[2], dishesConst[4], "main course should be third");
        assert.equal(sorted1[3], dishesConst[5], "dessert should be fourth");

        // another test case: 
        // main course, dessert, no known type, starter
        const array2= [dishesConst[4], dishesConst[5], dishesConst[0], dishesConst[1],  ];
        const sorted2= sortDishes(array1);

        assert.equal(sorted2.length, 4, "sorted array should have same length as array provided");
        assert.equal(sorted2[0], dishesConst[0], "no type should be first");
        assert.equal(sorted2[1], dishesConst[1], "starter should be second");
        assert.equal(sorted2[2], dishesConst[4], "main course should be third");
        assert.equal(sorted2[3], dishesConst[5], "dessert should be fourth");

        
    });
    
    it("sorted array should not be the same object as original array. Use e.g. spread syntax [...array]", function tw1_1_4_1(){
        const {sortDishes}= utilities;
        
        const array= [dishesConst[4], dishesConst[6], dishesConst[2], dishesConst[7]];
        const arrayCopy=[...array];
        const sorted= sortDishes(array);
        expect(sorted, "sortDishes should return an array").to.be.an("array");
        
        expect(sorted, "sorted array should create a copy").to.not.equal(array);
        array.forEach(function tw1_1_4_1_checkDishCB(dish, index){
            expect(dish).to.equal(
                arrayCopy[index],
                "do not sort the original array, copy/spread the array, then sort the copy");
        });
    });

});
