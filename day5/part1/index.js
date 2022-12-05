const fs = require('fs');
const {start} = require('repl');

const data = fs.readFileSync('../input', 'utf-8');
const lines = data.split(/\r?\n/);

// change point from input to instructions
let changeover_point = lines.indexOf('');

// get number of stacks (we only need to worry about up to 9 of them...)
const _ns = lines[changeover_point-1].trimEnd();
const num_stacks = parseInt(_ns.charAt(_ns.length-1));
console.log(num_stacks);

// create the stack array.
// values at the end of the nested arrays are at the *top*
let stack_arr = [];
for (let i = 0; i < num_stacks; i ++) {
	stack_arr.push([]);
}

console.log(stack_arr);

// loop over each line in the input and sort them into the stacks
for (let i = changeover_point-2; i >= 0; i --) {

	const _str = lines[i];
	const stacks = _str.match(/.{1,4}/g) ?? [];

	console.log(stacks);

	for (let j = 0; j < num_stacks; j ++) {
		const s = stacks[j].charAt(1);
		console.log(s)
		if (s === ' ') continue;
		stack_arr[j].push(s);
	}
}

// empty spaces are not occupied
console.log(stack_arr);


// parse instructions
for (let i = changeover_point+1; i < lines.length-1; i ++) {
	const inst = lines[i].split(' ');

	const num_to_move = parseInt(inst[1]);
	const start_stack = parseInt(inst[3]);
	const end_stack   = parseInt(inst[5]);

	console.log(num_to_move, start_stack, end_stack);

	// make sure to remove 1 from stack nums when in arrays
	// we take from the 'top' of the stack by taking from the end of the array.
	
	// repeat the number of containers we move
	for (let num = 0; num < num_to_move; num ++) {
	
		const ele = stack_arr[start_stack-1].pop();
		stack_arr[end_stack-1].push(ele);

		console.log(`moved element ${ele} from stack ${start_stack} to ${end_stack}:\n${stack_arr[end_stack-1]}`);
	};
}

let msg = '';

stack_arr.forEach(s => {
	if (s.length === 0) return;
	msg += s[s.length-1];
});

console.log(msg);
