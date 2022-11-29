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
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const add = document.getElementById("add");
const subtract = document.getElementById("subtract");
const divide = document.getElementById("divide");
const thousand = document.getElementById("thousand");


function dontBeginWithZero(exp){

	if (exp[0] == 0 && exp.length == 1) {
		return false;
	} 
	display.textContent += '0';
}

function dontBeginWithThousand(exp){
	
	if (exp[0] == 0 && exp.length == 1) {
		return false;
	} 
	display.textContent += '000';
}

thousand.addEventListener('click', () => {
	display = document.getElementById("display");

	let expression = display.textContent;

	dontBeginWithThousand(expression);
	
});

clear.addEventListener('click', () => {
	display = document.getElementById("display").textContent = 0;

});

zero.addEventListener('click', () => {
	display = document.getElementById("display");

	let expression = display.textContent;

	dontBeginWithZero(expression);
	


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
	shallNotBeginWithZero(display, seven);


});

eight.addEventListener("click", () => {

	display = document.getElementById("display");
	shallNotBeginWithZero(display, eight);


});

nine.addEventListener("click", () => {
	display = document.getElementById("display");
	shallNotBeginWithZero(display, nine);


});

add.addEventListener("click", () => {

	display = document.getElementById("display");
	display.textContent += ' + ';

});

subtract.addEventListener("click", () => {

	display = document.getElementById("display");
	display.textContent += ' - ';

});

divide.addEventListener("click", () => {

	display = document.getElementById("display");
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




//Ensure that first input does not begin with a zero
//And replace the existing zero when a number > 0 is pressed
function shallNotBeginWithZero(displayArgument, input) {

	if (displayArgument.textContent[0] == 0 && displayArgument.textContent.length === 1) {
		displayArgument.textContent = input.value;
	} else {
		displayArgument.textContent += input.value;
	}

}


function revomeEmptyStrings(arr) {
	if (!arr.includes("")) return false;

	arr.forEach((element, index) => {
		if (element === "")
			arr.splice(index, 1);

	})
}

function performLastOperationForMul(arr, mulIndex) {

	let arr2 = [], index;

	if (arr[mulIndex + 1] === '+') {


		arr.splice(mulIndex + 1, 1);
		mulIndex = arr.indexOf('*');
		index = mulIndex;
		arr2 = arr.slice(mulIndex - 1, mulIndex + 2);


	} else if (arr[mulIndex + 1] === '-') {

		arr.splice(mulIndex, 2, '*-');
		mulIndex = arr.indexOf('*-');
		index = mulIndex;
		arr2 = arr.slice(mulIndex - 1, mulIndex + 2);

	} else {
		index = mulIndex;
		arr2 = arr.slice(mulIndex - 1, mulIndex + 2);
	}

	return [arr2, index];
}

function performLastOperationForDiv(arr, divIndex) {

	let arr2 = [], index;

	if (arr[divIndex + 1] === '+') {

		arr.splice(divIndex + 1, 1);
		divIndex = arr.indexOf('/');
		index = divIndex;
		arr2 = arr.slice(divIndex - 1, divIndex + 2);

	} else if (arr[divIndex + 1] === '-') {

		arr.splice(divIndex + 1, 2, '/-');
		divIndex = arr.indexOf('/-');
		index = divIndex;
		arr2 = arr.slice(divIndex - 1, divIndex + 2);

	} else {
		index = divIndex;
		arr2 = arr.slice(divIndex - 1, divIndex + 2);
	}

	return [arr2, index];

}

function trackConsecutiveOperators(mulIndex, count, arr, recorder) {
	recorder = mulIndex;
	while (!isFinite(arr[recorder])) {
		count++;
		recorder++
	}

	return [count, recorder];
}

function performLastOperationForMul2(count, arr, j, mulIndex) {
	let indexOfOp3, op3, arr2, index;

	if (count === 3) {

		op3 = arr[j - 1];
		indexOfOp3 = arr.indexOf(op3);
		arr.splice(indexOfOp3 - 2, 2);
		indexOfOp3 = arr.indexOf(op3);
		arr2 = arr.slice(indexOfOp3 - 1, indexOfOp3 + 2);

	} else if (arr[mulIndex + 1] === '+') {

		arr.splice(mulIndex + 1, 1);
		mulIndex = arr.indexOf('*');
		index = mulIndex;
		arr2 = arr.slice(mulIndex - 1, mulIndex + 2);

	} else if (arr[mulIndex + 1] === '-') {

		arr.splice(mulIndex, 2, '*-');
		mulIndex = arr.indexOf('*-');
		index = mulIndex;
		arr2 = arr.slice(mulIndex - 1, mulIndex + 2);

	} else {

		index = arr.indexOf('*');
		arr2 = arr.slice(index - 1, index + 2);
	}

	return [arr2, index];
}

function performLastOperationForDiv2(arr, divIndex) {

	let arr2, index;

	if (arr[divIndex + 1] === '+') {

		arr.splice(divIndex + 1, 1);
		divIndex = arr.indexOf('/');
		index = divIndex;
		arr2 = arr.slice(divIndex - 1, divIndex + 2);

	} else if (arr[divIndex + 1] === '-') {

		arr.splice(divIndex, 2, '/-');
		divIndex = arr.indexOf('/-');
		index = divIndex;
		arr2 = arr.slice(divIndex - 1, divIndex + 2);

	} else {

		index = arr.indexOf('/');
		arr2 = arr.slice(index - 1, index + 2);
	}

	return [arr2, index];
}

function performOrderOfOperationForAddAndSub(arr, addIndex, subIndex) {

	let arr2, index;

	if (addIndex < subIndex) {

		index = addIndex;
		arr2 = arr.slice(addIndex - 1, addIndex + 2);

	} else {
		index = subIndex;
		arr2 = arr.slice(subIndex - 1, subIndex + 2);
	}

	return [arr2, index];
}


function performAddition(arr, addIndex) {

	let arr2, index;

	if (arr[addIndex + 1] === '+') {

		arr.splice(addIndex, 1);
		addIndex = arr.indexOf('+');
		index = addIndex;
		arr2 = arr.slice(addIndex - 1, addIndex + 2);

	} else {
		index = arr.indexOf('+');
		arr2 = arr.slice(index - 1, index + 2);
	}

	return [arr2, index];
}


function performSubtraction(arr, subIndex) {

	let arr2, index;

	subIndex = arr.indexOf('-');
	arr2 = arr.slice(subIndex - 1, subIndex + 2);
	index = subIndex;

	return [arr2, index];
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

					[newArr, index] = performLastOperationForMul(arrCpy, mul);


				} else if (div < mul) {

					[newArr, index] = performLastOperationForDiv(arrCpy, div);


				}

			} else if (arrCpy.includes('*')) {

				mul = arrCpy.indexOf('*');
				let count = 0, j;

				[count, j] = trackConsecutiveOperators(mul, count, arrCpy, j);

				[newArr, index] = performLastOperationForMul2(count, arrCpy, j, mul);

			} else if (arrCpy.includes('/')) {

				div = arrCpy.indexOf('/');

				[newArr, index] = performLastOperationForDiv2(arrCpy, mul);

			} else if (arrCpy.includes('+') && arrCpy.includes('-')) {

				add = arrCpy.indexOf('+');
				sub = arrCpy.indexOf('-');

				[newArr, index] = performOrderOfOperationForAddAndSub(arrCpy, add, sub);

			} else if (arrCpy.includes('+')) {

				add = arrCpy.indexOf('+');

				[newArr, index] = performAddition(arrCpy, add);

			} else if (arrCpy.includes('-')) {

				sub = arrCpy.indexOf('-');

				[newArr, index] = performSubtraction(arrCpy, sub);

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
	
}

