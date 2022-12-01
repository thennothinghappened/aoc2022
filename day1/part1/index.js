const fs = require('fs');

const data = fs.readFileSync('../input', 'utf-8');
const lines = data.split(/\r?\n/);

let cal = 0;
let max = 0;

lines.forEach(line => {
	if (line === '') {
		cal = 0;
		return;
	}

	cal += parseInt(line);
	if (cal > max) max = cal;
});

console.log(max);
