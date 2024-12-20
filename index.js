console.log(document.body.innerText)

let check = [1,2] == [1,2]
console.log( check)
console.log([1,2]==[1,2])

let a = +"10"+"20"
console.log(a)
console.log(typeof a)


const p1 = Promise.resolve("Resolved")
const p2 = Promise.reject("Rejected")

Promise.allSettled([p1,p2]).then(reses=>{
    reses.forEach(res=>{
        console.log(res)
        console.log(res.status,res.value||res.reason)
    })
})