const fs = require('fs');

const data = fs.readFileSync('../input', 'utf-8').trimEnd();

for (let i = 0, len = data.length; i < len; i ++) {

	// this is a weird way of doing this...
	let obj = {};
	let valid = true;

	for (let num = 0; num < 4; num ++) {
		const l = data[i+num];
		if (obj[l] === undefined)
			obj[l] = true;
		else {
			valid = false;
			break;
		}
	}

	if (valid) {
		console.log(data[i] + data[i+1] + data[i+2] + data[i+3], i+4)
		break;
	}
}
