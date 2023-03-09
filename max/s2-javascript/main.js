//Javascript
/*
Weakly typed language - no explicit type needed, data types can be switched dynamically
Object oriented
Versatile - runs in browser as well as outside (node.js) on server
*/

const { getEnvironmentData } = require("worker_threads");

var name = 'Max';
var age = 29;
var hasHobbies = true;

//anonymous function
function summarizeUser(uname, uage, usrHasHobby) {
    return `Name is ${uname}, age is ${uage}, and has hobbies: ${usrHasHobby}`;
};

console.log(summarizeUser(name, age, hasHobbies));

//var is outdated syntax, use let / const instead
//const - makes clear we never planned changing variable value

let name2 = 'Rod';
const age2 = 30;
name2 = 'Rob';
age = 35;

console.log(name2, age2);

//named function
const namedSummarizeFunction = function(uname, uage, usrHasHobby) {
    return `Name is ${uname}, age is ${uage}, and has hobbies: ${usrHasHobby}`;
};

console.log(namedSummarizeFunction(name2, age2, hasHobbies));

//ARROW function
//name of function = args => body
const arrowSummarizeFunction = (uname, uage, usrHasHobby) => {
    return `Name is ${uname}, age is ${uage}, and has hobbies: ${usrHasHobby}`;
};

console.log(arrowSummarizeFunction(name, age2, hasHobbies));

const add1 = (a,b) => {
    return a + b;
};

//if function has just one statement in body it can be rewritten as
const add2 = (a,b) => a + b;

const addOne = a => a + 1; //one arg, so no need of ()

const addRandom = () => 1 + 2; //<- an empty () is needed as no args are required

console.log(add1(1,2), add2(1,2), addOne(1), addRandom());

//OBJECT
//group data together
const person = {
    name: 'Max',
    age: 26,
    greet() {
        console.log('Hello, I am ' + this.name);
    }
};

console.log(person);
person.greet();

//Object Destructuring

//pass the property name in curly brace and only that is passed
console.log('object destructuring');
const printName = ({ name }) => {
    console.log('my name is : ' + name);
}

printName(person);
//Arrays

const hobbies = ['sports', 'cooking', 1, true, person, [1,2,3]];
console.log(hobbies);

for(let hobby of hobbies) {
    console.log(hobby);
}

//or use forEach
hobbies.forEach((hobby) => console.log(hobby));

console.log(hobbies.map( h => 'Hobby: ' + h));

hobbies.push('More');
console.log(hobbies);

//Spread and Rest
const copiedArray = hobbies.slice(); //copies an array

//NOT a copy, just a nested array
const copiedArray2 = [hobbies]; //not a copy - just an aray with 1 element that is hobbies

//copies an arry
const copiedArray3 = [...hobbies]; //... is spread op; expan out all the elements next to ...

const copiedPerson = {...person};
console.log(copiedPerson);

//Rest op - opposite of spread
const toArray = (arg1, arg2, arg3) => {
    return [arg1, arg2, arg3];
};

console.log(toArray(1,2,3));

//the above is not flexible, what if we want to pass 4 args
//Rest is to rescue

const toArray2 = (...args) => {
    return args;
};

console.log(toArray2(1,2,3,4));

//destructure subjects to individual ones
const subjects = ['math', 'physics'];
const [sub1, sub2] = subjects;

console.log(sub1);
console.log(sub2);

const print = (...args) => {
    console.log(args);
};

print(1,2,3,4,"hello");

//Async code

//timer

setTimeout(()=>{
    print('timer is done after 2 secs');
}, 2000); //runs at 2sec

console.log('prints before timer above'); 

const fetchData = (callback) => {
    setTimeout(() => {
        callback('Done');
    }, 3000);
};

setTimeout(()=>{
    print('timer is done');
    fetchData(text => {
        console.log(text);
    });
}, 2000); //runs at 2sec

//how promises are implmented internally
const fetchData2 = () => {
    const promise = new Promise((resolve, reject) => { //resolve, reject are callbacks, can be any name
        setTimeout(() => {
            resolve('Done 2');
        }, 1500);
    });

    return promise;
};

setTimeout(()=>{
    print('timer 2 is done');
    fetchData2().then(text => {
        console.log(text);
    });
}, 2000); //runs at 2sec
