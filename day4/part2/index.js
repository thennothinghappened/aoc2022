const {time} = require('console');
const fs = require('fs');

const data = fs.readFileSync('../input', 'utf-8');
const lines = data.split(/\r?\n/);

let times_contain = 0;

lines.forEach(line => {
	if (line === '') return;
	
	const pairs = line.split(',').map(nums => nums.split('-').map(n => parseInt(n)));
	console.log(pairs);

	// overlap
	// <---> <---> = no overlap
	// <--<--->--> = overlap (one contains the other)
	// <---<=>---> = overlap (ends touch)
	
	// low1 is lower or same as low2
	// <---< or <=<---
	if (pairs[0][0] <= pairs[1][0]) {
		// high1 is higher or same as low2
		if (pairs[0][1] >= pairs[1][0]) {
			times_contain ++;
			return;
		}
	}

	// high2 is higher or same as low1
	if (pairs[1][1] >= pairs[0][0]) {
		// low2 is lower or same as high1
		if (pairs[1][0] <= pairs[0][1]) {
			times_contain ++;
			return;
		}
	}
});

console.log(times_contain);
