import { assert, expect } from "chai";
import {withMyFetch, checkFetchUrl, myDetailsFetch} from "./mockFetch.js";

import getModule from "./filesToTest.js";
const X= TEST_PREFIX;
const dishSource= await getModule(`/src/${X}dishSource.js`);

let getDishDetails, getMenuDetails;

if (dishSource?.getDishDetails) getDishDetails = dishSource.getDishDetails;

if (dishSource?.getMenuDetails) getMenuDetails = dishSource.getMenuDetails;


describe("TW2.1.3 API call: getMenuDetails [vue](/tw2.1.3.html) [react](/tw2.1.3-react.html)", function tw2_1_3() {
  this.timeout(200000);

    function testMenuPromise(text, p, expectedIdsAndHash, expectedQueryString, expectedQueryStringCommasEncoded) {
        it(text, async function tw2_1_3_testDishPromise(){
            if (!getMenuDetails ) this.skip();
            this._runnable.title=this._runnable.title.replace("(export to enable)", "");
            const dishes= await withMyFetch(myDetailsFetch, p);
            expect(dishes, "getMenuDetails expected to return a Promise that resolves to an array of dishes").to.be.an('array');
            // deep equal ok, small array:
            expect(dishes.map(d=>d.id),"getMenuDetails array expected to contain dishes with the given ids").to.deep.equal(expectedIdsAndHash.ids);
            try{
                checkFetchUrl(myDetailsFetch.lastFetch, myDetailsFetch.lastParam, [expectedIdsAndHash.hash], expectedQueryString);
            }catch(e){
                if(e.message.indexOf("unexpected query string parameter-value ids=")!=-1)
                    checkFetchUrl(myDetailsFetch.lastFetch, myDetailsFetch.lastParam, [expectedIdsAndHash.hash], expectedQueryStringCommasEncoded);
                else
                    throw e;
            }
        }).timeout(4000);
    }
    
    testMenuPromise("getMenuDetails test (export to enable)",  function tw2_1_3_testMenuPromise1(){return getMenuDetails([1445969, 601651]);}, {
        ids: [1445969,601651],
        hash:  -1115178555
    }, [870248148], [-3987170]);
    
    it("getMenuDetails promise rejects if the underlying fetch() rejects", async function tw2_1_3_3(){
        if(!getMenuDetails)
            this.skip();
        let error;
        let fetchErr;
        try{
            await withMyFetch(function myFetch(url, param){
                try{
                    checkFetchUrl(url, param, [ -1115178555, ], [-1350703509]);
                }catch(e){
                    fetchErr=e;
                }
                if(!fetchErr)
                    return  Promise.resolve({
                        ok:false,
                        status:404,
                        json(){
                            return Promise.resolve({ msg: "dummy error dish not found"});
                        }
                    });
                else return Promise.resolve({
                    ok:true,
                    status:200,
                    json(){
                        return Promise.resolve({ id:-1});
                    }
                });
            },
                              function returnPromise(){
                                  return getMenuDetails(["undefined"]);
                              }
                             );
        }catch (e) {
            error=e;
        }
        if(fetchErr)
            throw fetchErr;
        expect(error, "getMenuDetails(bad_param) must reject").to.be.ok;
    }).timeout(4000);


    

});


describe("TW2.1.4 API call:  getDishDetails [vue](/tw2.1.4.html) [react](/tw2.1.4-react.html)", function tw2_1_4() {
  this.timeout(200000);
    function testDishPromise(text, p, expectedIdAndHash, expectedQueryString) {
        it(text, async function tw2_1_4_testDishPromise(){
            if (!getDishDetails ) this.skip();
            const dish= await withMyFetch(myDetailsFetch, p);
            expect(dish, "getDishDetails expected to return a Promise that resolves to a dish object").to.be.ok;
            expect(dish.id, "getDishDetails expected to return a dish with the given id").to.equal(expectedIdAndHash.id);
            checkFetchUrl(myDetailsFetch.lastFetch, myDetailsFetch.lastParam, [expectedIdAndHash.hash], expectedQueryString);
        }).timeout(4000);
    }

    testDishPromise("getDishDetails promise #1",  function tw2_1_4_testDishPromise1(){return getDishDetails(1445969);}, {
        id: 1445969,
        hash: -1115178555,
    }, [1436951091]);
    
    testDishPromise("getDishDetails promise #2", function tw2_1_4_testDishPromise2(){return  getDishDetails(601651);}, {
        id: 601651,
        hash: -1115178555
    }, [-1061209600]);
});
