const fs = require('fs');

const data = fs.readFileSync('../input', 'utf-8');
const lines = data.split(/\r?\n/);

// dumb stupid dont look
// seriously please dont
const alphabet_map = {
	'a': 1,
	'b': 2,
	'c': 3,
	'd': 4,
	'e': 5,
	'f': 6,
	'g': 7,
	'h': 8,
	'i': 9,
	'j': 10,
	'k': 11,
	'l': 12,
	'm': 13,
	'n': 14,
	'o': 15,
	'p': 16,
	'q': 17,
	'r': 18,
	's': 19,
	't': 20,
	'u': 21,
	'v': 22,
	'w': 23,
	'x': 24,
	'y': 25,
	'z': 26
};

let total = 0;

lines.forEach(line => {
	if (line === '') return;
	const _a = line.split('');
	
	const half_len = Math.ceil(_a.length / 2);
	const h1 = _a.slice(0, half_len);
	const h2 = _a.slice(half_len);

	const common = h1.filter(val => h2.includes(val))[0];

	const value = alphabet_map[common.toLowerCase()] + (common.toUpperCase() === common) * 26;
	total += value;
});

console.log(total);

