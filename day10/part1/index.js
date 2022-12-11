const fs = require('fs');

const data = fs.readFileSync('../input', 'utf-8').trimEnd();
const lines = data.split(/\r?\n/);

// cycle count
let cycle_count = 0;
const cycle_interval = 40;
const cycle_offset = 20;

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

isOnInterval = () => {
	return ((((cycle_count || 1) + cycle_offset) % cycle_interval) === 0);
}

runOp = (opname, val) => {
	const op = ops[opname];
	
	// check if we are on the interval
	for (let i = 0; i < op.cycles; i ++) {
		cycle_count ++;

		if (isOnInterval())
			signal_strength += (cycle_count * registers.X);
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
