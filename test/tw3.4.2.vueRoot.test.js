import {testVue, testSuspense} from "./rootUtils";

describe("TW3.4.2 Vue root initial suspense [test](/vue.html)", function tw3_4_2_vue() {
    this.timeout(200000);

    it("VueRoot displays app if the model is ready", async function tw3_4_2_vue_1(){
        if(!await testVue(testSuspense)) this.skip();;
    });
});
