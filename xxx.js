import test from "./css/xxx.css"
import img1 from "./img/img3.png"
console.log(img1)
var img = new Image()
img.src=img1
document.getElementById('J_testModule').appendChild(img)
console.log(test)
document.getElementById('J_testModule').setAttribute('class', test.locZzz)

console.log('xxx')