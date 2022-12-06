const fs = require('fs');

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

// loop over each line in the input and sort them into the stacks
for (let i = changeover_point-2; i >= 0; i --) {

	const _str = lines[i];
	const stacks = _str.match(/.{1,4}/g) ?? [];

	for (let j = 0; j < num_stacks; j ++) {
		const s = stacks[j].charAt(1);
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


	const stack = stack_arr[start_stack-1];
	const take_from_pos = stack.length-1-(num_to_move-1);

	// make sure to remove 1 from stack nums when in arrays
	// we take from the 'top' of the stack by taking from the end of the array.
	
	// repeat the number of containers we move
	for (let num = num_to_move-1; num >= 0; num --) {
		
		console.log(stack);

		const ele = stack.splice(take_from_pos,1)[0];
		stack_arr[end_stack-1].push(ele);
	};

	console.log(`start stack: [ ${stack_arr[start_stack-1]} ]\nend stack: [ ${stack_arr[end_stack-1]} ]`);
}

let msg = '';

stack_arr.forEach(s => {
	if (s.length === 0) return;
	msg += s[s.length-1];
});

console.log(msg);
