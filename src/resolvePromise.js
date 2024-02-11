export function resolvePromise(prms, promiseState){
    promiseState.promise= prms;
    promiseState.data= null;
    promiseState.error= null;

    function dataACB(result){
        //race condition - make sure get the result for promise requested
        if(promiseState.promise==prms){
            promiseState.data=result;
        }
    }
    function errorACB(err){
        if(promiseState.promise==prms){
            promiseState.error=err;
        }
    }
    if (prms!=null){
        prms.then(dataACB).catch(errorACB)
    }
    

}