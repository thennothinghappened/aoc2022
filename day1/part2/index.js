const fs = require('fs');
const {parse} = require('path');

const data = fs.readFileSync('../input', 'utf-8');
const lines = data.split(/\r?\n/);

let elves = [];
let cal = 0;

lines.forEach(line => {
	if (line === '') {
		elves.push(cal);
		cal = 0;
		return;
	}

	cal += parseInt(line);
});

cal = 0;

for (let i = 0; i < 3; i ++) {
	const max = Math.max(...elves);
	const max_ind = elves.indexOf(max);
	elves.splice(max_ind, 1);
	cal += max;
	console.log(max)
}

console.log(cal);

