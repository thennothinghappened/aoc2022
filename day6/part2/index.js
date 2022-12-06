const fs = require('fs');

const data = fs.readFileSync('../input', 'utf-8').trimEnd();
const num_len = 14;

for (let i = 0, len = data.length; i < len; i ++) {

	// this is a weird way of doing this...
	let obj = {};
	let valid = true;

	for (let num = 0; num < num_len; num ++) {
		const l = data[i+num];
		if (obj[l] === undefined)
			obj[l] = true;
		else {
			valid = false;
			break;
		}
	}

	if (valid) {
		console.log(i+num_len)
		break;
	}
}
