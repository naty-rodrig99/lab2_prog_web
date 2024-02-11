export function resolvePromise(prms, promiseState){
    promiseState.promise= prms;
    promiseState.data= null;
    promiseState.error= null;

    function dataACB(result){promiseState.data=result;}
    function errorACB(err){promiseState.error=err;}
    prms.then(dataACB).catch(errorACB)

}