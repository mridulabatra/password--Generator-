/*https://net-comber.com/charset.html*/
/*DOM elements by this we r getting all elements*/
const resultEl = document.getElementById('result');/**/
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = {/*object*/
	/*key*/lower: getRandomLower,/*function*/
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');//text ar. ele. created
	const password = resultEl.innerText;//get pw from result
	
	if(!password) { return; }// if no pw return
	
	textarea.value = password;//if yes then keep textar value as pw
	document.body.appendChild(textarea);//append child it that will put it in a body
	textarea.select();// then select it 
	document.execCommand('copy');//to copy it to clipboard
	textarea.remove();//remove text ar
	alert('Password copied to clipboard');
});
/* generate password click event*/
generate.addEventListener('click', () => {/*this method sets up a function that will be called whenever the specific event is delivered in the target
	in this case we listen for click event n when that happens we will run a function (arrow fun) */
	const length = +lengthEl.value;/*this a const of length n from .value we get the value we add + sign to convert it to int coz it was giving a
	 string val *//*by this we r getting values n also check if they r checked or not*/
	const hasLower = lowercaseEl.checked;/*.checked prop for checking true or false*/
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);/*put in the result element set resultel text to fun.*/
});

function generatePassword(lower, upper, number, symbol, length) {/*genrate password function in which we pass all values*/
	let generatedPassword = '';/*initialized string variable which will cont. built on to create password*/
	const typesCount = lower + upper + number + symbol;//count the no. of checked items
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);/* array of objects which will let us know if true or false
	lower n upper ... are passed as key then filter out unchecked types using filter method */
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop (loop over length call gen. func. of each type)
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {/*using loop through each */
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();//add final pw to pw n return it 
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);// coz it give 4 length coz of loop so we have slice
	
	return finalPassword;
}

function getRandomLower() {/*function for lowercase req.*/
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);/*return string thought method fromcharcode(gives char of ascii value) lower 
	case are from 97 to 122 math.random generates a random decimal but we want whole no. so mul. by limit we want to set i.e 26 as their are 26 alp. 
	in alphab. but we want whole no. not decimal so we wrap it in math.floor which will round down and add 97 coz we want it to lie b/w 97 to 122*/
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);/*same as lower case but instead of 97 jst add 65(65-90) */
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);/*same as lower but instead of 97 jst add 48(48-57) and 10 instead of 26 as 0-9is a span of 10 nos.*/
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=<>/,.'
	return symbols[Math.floor(Math.random() * symbols.length)];
}