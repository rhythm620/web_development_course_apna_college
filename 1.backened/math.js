const  sum = (a,b) => a+ b;
const mul = (a,b) => a*b;
const g = 9.8;
const pi = 3.14;

let obj ={
    sum:sum,
    mul:mul,
    g:g,
    pi:pi,
}

module.exports  = obj;

// agar neeche wali line ko chalana chahte ho successfully then package.json mei jaakr "type": "modules" likho

// export const  sum = (a,b) => a+ b;
// export const mul = (a,b) => a*b;
// export const g = 9.8;
// export const  pi = 3.14;


