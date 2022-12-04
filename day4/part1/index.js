const fs = require('fs');

const data = fs.readFileSync('../input', 'utf-8');
const lines = data.split(/\r?\n/);

let times_contain = 0;

lines.forEach(line => {
	if (line === '') return;
	
	const pairs = line.split(',').map(nums => nums.split('-').map(n => parseInt(n)));
	console.log(pairs);

	// if the first one encompasses a larger range than the 2nd...
	if (pairs[0][0] <= pairs[1][0] && pairs[0][1] >= pairs[1][1]) {
		times_contain ++;
		return;
	}

	// if the second one encompasses a larger range than the 1st...
	if (pairs[1][0] <= pairs[0][0] && pairs[1][1] >= pairs[0][1]) {
		times_contain ++;
		return;
	}
});

console.log(times_contain);
