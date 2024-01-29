import dishesConst from './dishesConst.js';
import { assert, expect, should } from 'chai';
const utils= await import(`../src/${TEST_PREFIX}utilities.js`);
const {isKnownTypeCB, dishType}=utils;

import cloneModel from "./cloneModel.js";

function getDishConst(x){ return dishesConst.find(function(d){ return d.id===x;});}


describe("TW1.1.3 filter(CB) exercises: dishType and removeFromMenu", function tw1_1_3() {
    this.parent.setMaxListeners(200); // prevent EventEmitter "too many listeners" warning

    this.timeout(200000);  // increase to allow debugging during the test run

    let model;
    
    
    before(async function tw1_1_3_before(){
        if(!utils || !isKnownTypeCB || !dishType)
            this.skip();
        const modelTemplate= cloneModel((await import(`../src/${TEST_PREFIX}DinnerModel.js`)).model);
        
        try{
            model= cloneModel(modelTemplate);
        }catch(e){
            console.error(e);
        }
    });

    it("isKnownTypeCB recognizes only starter, main course, dessert (export isKnownTypeCB and dishType to enable)", function tw1_1_3_1(){
        this._runnable.title= "isKnownTypeCB recognizes only starter, main course, dessert";
        expect(isKnownTypeCB("starter"), "starter is a known type, so we should return truthy").to.be.ok;
        expect(isKnownTypeCB("main course"), "main course is a known type, so we should return truthy").to.be.ok;
        expect(isKnownTypeCB("dessert"), "dessert is a known type, so we should return truthy").to.be.ok;
        expect(isKnownTypeCB("appetizer"), "appetizer is not a known type, so we should return falsy").to.not.be.ok;
    });
    
    it("dishType returns a known dish type", function tw1_1_3_2(){ expect(dishType(dishesConst[4])).to.equal("main course");});
    //    it("should recognize starter in first position", function(){ return assert.equal(dishType(dishesConst[1]), "starter");});
    //    it("should recognize starter in other position", function(){ return assert.equal(dishType(dishesConst[2]), "starter");});
    //    it("should recognize dessert in first position", function(){ return assert.equal(dishType(dishesConst[6]), "dessert");});
    //    it("should recognize dessert in other position", function(){ return assert.equal(dishType(dishesConst[5]), "dessert");});
    it("dishType returns empty string if starter, main course, dessert not present", function tw1_1_3_3(){ expect(dishType(dishesConst[0])).to.equal("");});
    it("dishType returns empty string if dishTypes property not present", function  tw1_1_3_4(){ expect(dishType(dishesConst[7])).to.equal("");})

    ;

    it("can remove dishes", function  tw1_1_3_5(){
        // we force a few dishes in the menu, then try to remove one
        model.dishes=[getDishConst(100), getDishConst(1), getDishConst(200)];        
        model.removeFromMenu({id:1});        
        expect(model.dishes.length, "after removing a dish from a menu with 3 dishes, length of dishes expcted to be 2").to.equal(2);
        
        // should now be removed
        expect(model.dishes, "The model properly removes dish when given {id:1} as an argument").to.not.include(getDishConst(1));
        expect(model.dishes, "inserted dish with ID 100 expected to be in the menu after another dish was removed").to.include(getDishConst(100));
        expect(model.dishes, "inserted dish with ID 200 expected to be in the menu after another dish was removed").to.include(getDishConst(200));
        
        // remove non-existing dish
        model.removeFromMenu({id:256});
        expect(model.dishes.length, "The model should not remove dishes that do not exist").to.equal(2);
        expect(model.dishes, "inserted dish with ID 100 expected to be in the menu").to.include(getDishConst(100));
        expect(model.dishes, "inserted dish with ID 200 expected to be in the menu").to.include(getDishConst(200));
    });
});

