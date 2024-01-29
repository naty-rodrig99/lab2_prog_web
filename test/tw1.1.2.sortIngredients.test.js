import { assert, expect, should } from 'chai';

const ingredientsConst= [
    {aisle:"Produce", name:"pumpkin"},
    {aisle:"Frozen", name:"icecream"},
    {aisle:"Produce", name:"parsley"},
    {aisle:"Frozen", name:"frozen broccoli"},
];

const ingredientConst2=[
    {name: 'Italian seasoning', aisle: 'Spices', amount: 0.5, unit: 'g', id: 1119},
    {name: 'garlic salt', aisle: 'Spices', amount: 0.5, unit: 'g', id: 1118} ,
];

const utilities= await import(`../src/${TEST_PREFIX}utilities.js`);

describe("TW1.1.2 sort(CB) exercise: sortIngredients", function tw1_1_2() {
    before(function tw1_1_2_before(){
        if(!utilities || !utilities.compareIngredientsCB || !utilities.sortIngredients)
            this.skip();
    });
    
    this.timeout(200000);  // increase to allow debugging during the test runxs
    

    it("compareIngredientsCB compares by aisle, then by name (export compareIngredientsCB and sortIngredients from utilities.js to enable)", function tw1_1_2_0(){
        this._runnable.title="compareIngredientsCB compares by aisle, then by name";
        const {compareIngredientsCB}= utilities;

        expect(compareIngredientsCB(ingredientsConst[0], ingredientsConst[1]), "if first aisle is bigger than second aisle, reverse order (return a positive number)").to.be.gt(0);
        expect(compareIngredientsCB(ingredientsConst[1], ingredientsConst[0]), "if first aisle is smaller than second aisle, do not reverse order (return a negative number)").to.be.lt(0);
        expect(compareIngredientsCB(ingredientsConst[0], ingredientsConst[2]), "if aisle is the same and first name is bigger than second name, reverse order (return a positive number)").to.be.gt(0);
        expect(compareIngredientsCB(ingredientsConst[2], ingredientsConst[0]), "if aisle is the same and first name is smaller than second name, do not reverse order (return a negative number)").to.be.lt(0);
        
        expect(compareIngredientsCB({name: 'milk', aisle:'dairy'}, {name: 'milk', aisle:'Dairys'}),  "aisle comparison should be case-sensitive").to.be.gt(0);
        expect(compareIngredientsCB({name: 'Egg', aisle:'mock'},  {name: 'eggs', aisle:'mock'}),  "name comparison shold be case-sensitive").to.be.lt(0);

    });
    
    it("should sort by aisle first, then by name", function  tw1_1_2_2(){
        const {sortIngredients}= utilities;

        // Check that it sorts by aisle first and then by name
        const ingredients= [...ingredientsConst];
        const sorted= sortIngredients(ingredients);
        expect(sorted, "sortIngredients should return an array").to.be.an("array"); 
        assert.equal(sorted.length, ingredientsConst.length, "sorted array should have same length as array provided");
        assert.equal(sorted[0], ingredientsConst[3], "Frozen aisle should come before Produce aisle, frozen brocolli before icecream");
        assert.equal(sorted[1], ingredientsConst[1], "Frozen aisle should come before Produce aisle, icecream after frozen brocolli");
        assert.equal(sorted[2], ingredientsConst[2], "Produce aisle should come after Frozen aisle, parsley before pumpkin");
        assert.equal(sorted[3], ingredientsConst[0], "Produce aisle should come after Frozen aisle, parsley before pumpkin");

        const ingr2= [...ingredientConst2];
        const sorted2= sortIngredients(ingr2);
        assert.equal(sorted2[0], ingr2[0], "sorting should not convert strings to lower case: 'Italian seasoning' comes before 'garlic salt'")
        
    });

    it("sorted array should not be the same object as original array. Use e.g. spread syntax [...array]", function  tw1_1_2_1(){
        const {sortIngredients}= utilities;
        const ingredients= [...ingredientsConst];
        const sorted= sortIngredients(ingredients);
        expect(sorted, "sortIngredients should return an array").to.be.an("array");
        
        assert.equal(sorted.length, ingredients.length);
        expect(sorted, "sorted array should create a copy").to.not.equal(ingredients);
        ingredients.forEach(function  tw1_1_2_1_checkIngrCB(i, index){
            expect(i).to.equal(
                ingredientsConst[index],
                "do not sort the original array, copy/spread the array, then sort the copy");
        });
    });


});
