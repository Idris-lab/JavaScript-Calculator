let display = document.getElementById("display").textContent = 0;
const equal = document.getElementById('equals');
const multiply = document.getElementById("multiply");
const decimal = document.getElementById("decimal");
const zero = document.getElementById("zero");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");



clear.addEventListener('click', () => {
	display = document.getElementById("display").textContent = 0;

});

zero.addEventListener('click', () => {
	display = document.getElementById("display");

	let expression = display.textContent;

	if (expression[0] == 0 && expression.length == 1) {
		//return true;
	} else {
		display.textContent += '0';
	}


	display.textContent.split(' ').forEach(element => {
		console.log(display.textContent.indexOf(element));
		if (element[0] == 0 && element[1] == 0) {
			//const index = display.textContent.indexOf(element)
			//element.replace
		}
	});

});

one.addEventListener("click", () => {

	display = document.getElementById("display");

	shallNotBeginWithZero(display, one);

});

two.addEventListener("click", () => {
	display = document.getElementById("display");

	shallNotBeginWithZero(display, two);

});

three.addEventListener("click", () => {

	display = document.getElementById("display");

	shallNotBeginWithZero(display, three);

});

four.addEventListener("click", () => {

	display = document.getElementById("display");

	shallNotBeginWithZero(display, four);

});

five.addEventListener("click", () => {

	display = document.getElementById("display");
	shallNotBeginWithZero(display, five);

});

six.addEventListener("click", () => {

	display = document.getElementById("display");
	shallNotBeginWithZero(display, six);

});

seven.addEventListener("click", () => {
	display = document.getElementById("display");
	let seven = document.getElementById("seven");
	shallNotBeginWithZero(display, seven);


});

eight.addEventListener("click", () => {

	display = document.getElementById("display");
	let eight = document.getElementById("eight");
	shallNotBeginWithZero(display, eight);


});

nine.addEventListener("click", () => {
	display = document.getElementById("display");
	let nine = document.getElementById("nine");
	shallNotBeginWithZero(display, nine);


});

add.addEventListener("click", () => {

	display = document.getElementById("display");
	let add = document.getElementById("add");
	display.textContent += ' + ';

});

subtract.addEventListener("click", () => {

	display = document.getElementById("display");
	let subtract = document.getElementById("subtract");
	display.textContent += ' - ';

});

divide.addEventListener("click", () => {

	display = document.getElementById("display");
	let divide = document.getElementById("divide");
	display.textContent += ' / ';

});

multiply.addEventListener("click", () => {

	display = document.getElementById("display");
	display.textContent += ' * ';

});

equal.addEventListener("click", () => {

	display = document.getElementById("display");

	cal = new Calculator();
	display.textContent = cal.calculate(display.textContent);

});

decimal.addEventListener('click', () => {

	display = document.getElementById("display");

	const displayContent = display.textContent + event.target.value;

	// Prevents two consecutive decimal points 
	// And also prevent two decimal points in one number
	// from being entered.
	const arr = displayContent.split(' ');
	const lastElement = arr.slice(arr.length - 1).join(' ');
	const firstIndex = lastElement.indexOf('.');
	const lastIndex = lastElement.lastIndexOf('.');


	if (firstIndex !== lastIndex) {
		return false;
	}
	display.textContent += '.';

	//Prevent two consecutive dots.
	//let preValue = event.target.value;
	//console.log('previous value:'+preValue);
	//console.log('current value: '+curValue);
	// if (preValue === curValue){
	// 	return false;
	// }else{
	// 	display.textContent += '.';
	// 	curValue = event.target.value;
	// }	

});



// document.addEventListener('keydown', (event) => {
// 	console.log(event.keyCode);
// 	display = document.getElementById("display");
// 	display.textContent += '.';
// 	let decimal = document.getElementById("decimal");
// 	if (event.keyCode === 190 && display.textContent.indexOf('.') !== -1) {
// 		return false;
// 	}


//});


//Ensure that first input does not begin with a zero
//And replace the existing zero when a number > 0 is pressed
function shallNotBeginWithZero(displayArgument, input) {

	if (displayArgument.textContent[0] == 0 && displayArgument.textContent.length === 1) {
		displayArgument.textContent = input.value;
	} else {
		displayArgument.textContent += input.value;
	}

}


function revomeEmptyStrings(arr){
	arr.forEach((element, index) => {
		if (element === "") {
			arr.splice(index, 1);
		}
	})
}

function performLastOperationForMul(arr, mulIndex){
	
	let arr2 = [];

	if (arr[mulIndex + 1] === '+') {


		arr.splice(mulIndex + 1, 1);
		mulIndex = arr.indexOf('*');
		arr2 = arr.slice(mulIndex - 1, mulIndex + 2);


	} else if (arr[mulIndex + 1] === '-') {

		arr.splice(mulIndex, 2, '*-');
		mulIndex = arr.indexOf('*-');
		arr2 = arr.slice(mulIndex - 1, mulIndex + 2);

	} else {

		arr2 = arr.slice(mulIndex - 1, mulIndex + 2);
	}

	return arr2;
}

function performLastOperationForDiv(arr, divIndex){
	let arr2 = [];

	if (arr[divIndex + 1] === '+') {

		arr.splice(divIndex + 1, 1);
		divIndex = arr.indexOf('/');
		arr2 = arr.slice(divIndex - 1, divIndex + 2);

	} else if (arr[divIndex + 1] === '-') {

		arr.splice(divIndex + 1, 2, '/-');
		divIndex = arr.indexOf('/-');
		arr2 = arr.slice(divIndex - 1, divIndex + 2);

	} else {
		arr2 = arr.slice(divIndex - 1, divIndex + 2);
	}

	return arr2
}


function Calculator() {
	this.methods = {
		'+': (a, b) => a + b,
		'-': (a, b) => a - b,
		'*': (a, b) => a * b,
		'/': (a, b) => a / b,
		'*+': (a, b) => a * b,
		'*-': (a, b) => -a * b,
		'/+': (a, b) => a / b,
		'/+': (a, b) => -a / b
	}

	this.calculate = function (str) {
		let arr = str.split(' ');
		let index, result, newArr = [];
		let arrCpy = [...arr];

		
		revomeEmptyStrings(arrCpy);


		for (let i = 0; i < arr.length; i++) {
			let mul, div, add, sub;



			if (arrCpy.includes('*') && arrCpy.includes('/')) {

				
				mul = arrCpy.indexOf('*');
				div = arrCpy.indexOf('/');

				
				if (mul < div) {

					newArr = performLastOperationForMul(arrCpy, mul);
					index = mul;

				} else if (div < mul) {

					newArr = performLastOperationForDiv(arrCpy, div);
					index = div;

				}

			} else if (arrCpy.includes('*')) {

				mul = arrCpy.indexOf('*');

				let i = mul, count = 0, op3, indexOfOp3;

				while (!isFinite(arrCpy[i])) {
					count++;
					i++;
				}

				if (count === 3) {

					op3 = arrCpy[i - 1];
					indexOfOp3 = arrCpy.indexOf(op3);
					arrCpy.splice(indexOfOp3 - 2, 2);
					indexOfOp3 = arrCpy.indexOf(op3);
					newArr = arrCpy.slice(indexOfOp3 - 1, indexOfOp3 + 2);
					
				}else if (arrCpy[mul + 1] === '+') {

					arrCpy.splice(mul + 1, 1);
					mul = arrCpy.indexOf('*');
					index = mul;
					newArr = arrCpy.slice(mul - 1, mul + 2);

				} else if (arrCpy[mul + 1] === '-') {

					arrCpy.splice(mul, 2, '*-');
					mul = arrCpy.indexOf('*-');
					index = mul;
					newArr = arrCpy.slice(mul - 1, mul + 2);

				} else {

					index = arrCpy.indexOf('*');
					newArr = arrCpy.slice(index - 1, index + 2);
				}
			} else if (arrCpy.includes('/')) {

				div = arrCpy.indexOf('/');


				if (arrCpy[div + 1] === '+') {

					arrCpy.splice(div + 1, 1);
					div = arrCpy.indexOf('/');
					index = div;
					newArr = arrCpy.slice(div - 1, div + 2);

				} else if (arrCpy[div + 1] === '-') {

					arrCpy.splice(div, 2, '/-');
					div = arrCpy.indexOf('/-');
					index = div;
					newArr = arrCpy.slice(div - 1, div + 2);

				} else {

					index = arrCpy.indexOf('/');
					newArr = arrCpy.slice(index - 1, index + 2);
				}

			} else if (arrCpy.includes('+') && arrCpy.includes('-')) {

				add = arrCpy.indexOf('+');
				sub = arrCpy.indexOf('-');

				if (add < sub) {
					index = add;
					newArr = arrCpy.slice(add - 1, add + 2)
				} else {
					index = sub;
					newArr = arrCpy.slice(sub - 1, sub + 2);
				}

			} else if (arrCpy.includes('+')) {

				add = arrCpy.indexOf('+');

				if (arrCpy[add + 1] === '+') {

					arrCpy.splice(add, 1);
					add = arrCpy.indexOf('+');
					index = add;
					newArr = arrCpy.slice(add - 1, add + 2);

				}else{
					index = arrCpy.indexOf('+');
					newArr = arrCpy.slice(index - 1, index + 2);
				}
				

			} else if (arrCpy.includes('-')) {

				index = arrCpy.indexOf('-');
				newArr = arrCpy.slice(index - 1, index + 2);

			} else {
				break;
			}

			let a = +newArr[0],
				op = newArr[1],
				b = +newArr[2];


			if (!this.methods[op] || isNaN(a) || isNaN(b)) {
				return NaN;
			}

			result = this.methods[op](a, b);
			arrCpy.splice(index - 1, 3, result);


		}
		return result
	}
	// this.addMethods = function(name, func){
	// 	this.methods[name] = func;
	// }
}

