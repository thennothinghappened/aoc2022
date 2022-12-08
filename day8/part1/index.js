const fs = require('fs');

const data = fs.readFileSync('../input', 'utf-8').trimEnd();
const lines = data.split(/\r?\n/);
let rows = [];

lines.forEach(line => {
	rows.push(line.split('').map(t => [parseInt(t), false]));
});

// top, bottom, left and right trees are visible
rows[0] = rows[0].map(t => [t[0], true]);
rows[rows.length-1] = rows[rows.length-1].map(t => [t[0], true]);

for (let i = 1, len = rows.length-1; i < len; ++ i) {
	rows[i][0][1] = true;
	rows[i][rows[i].length-1][1] = true;
}

// recurse over horizontally first
for (let i = 1, len = rows.length-1; i < len; ++ i) {

	let r = rows[i];

	// start indexed 1 in already since outer is always visible
	for (let j = 1, len2 = r.length, min_height = 0; j < len2; ++ j) {
		if (r[j-1][0] > min_height) min_height = r[j-1][0];
		if (min_height < r[j][0]) r[j][1] = true;
	}

	// start going back the other way
	for (let j = r.length-2, min_height = 0; j > 0; j --) {
		if (r[j+1][0] > min_height) min_height = r[j+1][0];
		if (min_height < r[j][0]) r[j][1] = true;
	}
}

// recurse over vertically
for (let i = 1, len = rows[0].length-1; i < len; ++ i) {

	// where things get a bit silly...
	for (let j = 1, len2 = rows.length-1, min_height = 0; j < len2; ++ j) {
		if (rows[j-1][i][0] > min_height) min_height = rows[j-1][i][0];
		if (min_height < rows[j][i][0]) rows[j][i][1] = true;
	}

	// and the other way...
	for (let j = rows.length-2, min_height = 0; j > 0; j --) {
		if (rows[j+1][i][0] > min_height) min_height = rows[j+1][i][0];
		if (min_height < rows[j][i][0]) rows[j][i][1] = true;
	}

}


console.log(rows.map(r => r.map(t => t[1])))


// get number of 'true'
let seen_trees = 0;
rows.forEach(r => r.forEach(t => {
	if (t[1]) seen_trees ++;
}))

console.log(seen_trees);
