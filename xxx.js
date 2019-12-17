console.log('xxx')

var arr = Array.from('foo');
console.log(arr);  // [ 'f', 'o', 'o' ]

function xx(a) {
  return new Promise((resolve, reject) => {
    resolve('test')
  })
}

xx().then((data) => {
  console.log(data)
})

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: 'resolved'
}

asyncCall();
