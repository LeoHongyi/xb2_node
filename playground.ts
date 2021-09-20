// const nature = () => {
//   console.log('... ')
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('🦖 ')
//     }, 2000)
//   })
// }

// const demo = async () => {
//   const data = await nature();
//   console.log('data', data)
// }
// demo()
// console.log('🐦')


const arr = [
  { name: 'test', age: 12 },
  { name: 'test', age: 11 },
  {name: 'test', age: 14}
]

const test = arr.reduce((pre, next, index) => {
  if (pre[0].age > next.age) {
    pre.unshift(next)
  } else if (pre[0].age == next.age || !phasOwnPropertyre[0].) {

  } else {
    pre.push(next)
  }
  return pre;
}, [])
console.log('test', test)
