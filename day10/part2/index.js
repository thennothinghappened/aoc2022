// this is complete overengineering but i had fun :D

const fs = require('fs');

const data = fs.readFileSync('../input', 'utf-8').trimEnd();
const lines = data.split(/\r?\n/);

// cycle count
let cycle_count = 0;
const cycle_interval = 40;
const cycle_offset = 0;

// signal strength
let signal_strength = 0;

// register list
const registers = {
	'X': 1
};

// for our purposes, the function is executed on the last cycle.
const ops = {
	'noop': {
		'cycles': 1,
	},
	'addx': {
		'cycles': 2,
		'func': (val) => {
			registers.X += parseInt(val);
		}
	}
}

getIntervalMod = () => {
	return (((cycle_count || 1) + cycle_offset) % cycle_interval);
}

isOnInterval = () => {
	return (getIntervalMod() === 0);
}

sprVisible = () => {
	const x = registers.X;
	const i = getIntervalMod()-1;

	return (
		x   === i ||
		x-1 === i ||
		x+1 === i
	)
}

// crt output string
let str = '';

runOp = (opname, val) => {
	const op = ops[opname];
	
	// check if we are on the interval
	for (let i = 0; i < op.cycles; i ++) {
		cycle_count ++;
		
		str += (sprVisible() ? '#' : '.');
		
		if (isOnInterval()) {
			// flush the draw buffer
			console.log(str);
			str = '';
		}
	}

	if (op.func)
		op.func(val);

}

parseLine = (line) => {
	const l = line.split(' ');
	runOp(l[0], l[1]);
}

lines.forEach(line => parseLine(line));

console.log(signal_strength);
