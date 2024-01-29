import {testReact, testSuspense} from "./rootUtils";

describe("TW3.4.2 React root initial suspense [test](/react.html)", function tw3_4_2_react() {
    this.timeout(200000);

    it("ReactRoot displays app if the model is ready", async function tw3_4_2_react_1(){
        if(!await testReact(testSuspense))
            this.skip();
    });
});

