let name ="keshav";
console.log("hello"+name);
console.log(10+20);

let a= 10;
let b= 20;
console.log(a+b); 

let str ="hello";
let reversed =
str.split("").reverse().join("");
console.log(reversed);

let arr = [10,5,25,8,15];
let max = arr[0];
for (let i =1; i< arr.length; i++){
    if (arr[i] >max){
        max = arr[i];
    }
}
console.log(max);


let arr2 = [1,2,3,2,4,1];
for (let i = 0; i< arr2.length; i++){
    for (let j = i+1; j< arr2.length; j++){
        if (arr2[i]===arr2[j]){
            console.log(arr2[i]);
        }
    }
}
