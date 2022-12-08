const fs = require('fs');

const data = fs.readFileSync('../input', 'utf-8').trimEnd();
const lines = data.split(/\r?\n/);
let rows = [];

lines.forEach(line => {
	rows.push(line.split('').map(t => [parseInt(t), [0, 0, 0, 0]]));
});

for (let i = 0, len = rows.length; i < len; ++ i) {

	const r = rows[i];

	// go over each tree individually
	for (let j = 0, len2 = r.length; j < len2; ++ j) {
		
		// go over each of the 4 directions

		// left
		console.log('going on num', j);
		for (let k = j-1; k >= 0; k --) {
			
			r[j][1][0] ++;
			if (r[k][0] >= r[j][0]) {
				console.log(r[j][0], 'blocked by', r[k][0])
				break;
			}

			console.log(k)
		}

		// right
		for (let k = j+1; k < len2; k ++) {
			
			r[j][1][1] ++;
			if (r[k][0] >= r[j][0]) {
				console.log(r[j][0], 'blocked by', r[k][0])
				break;
			}

			console.log(k)
		}

		
		// up
		for (let k = i-1; k >= 0; k --) {
			
			r[j][1][2] ++;
			if (rows[k][j][0] >= r[j][0]) {
				console.log(r[j][0], 'blocked by', rows[k][j][0])
				break;
			}

			console.log(k)
		}

		// down
		for (let k = i+1; k < len; k ++) {
			
			r[j][1][3] ++;
			if (rows[k][j][0] >= r[j][0]) {
				console.log(r[j][0], 'blocked by', rows[k][j][0])
				break;
			}

			console.log(k)
		}
	}
}

rows.forEach(r => console.log(r))


// get number of 'true'
let highest_score = 0;
rows.forEach(r => r.forEach(t => {
	const score = t[1][0] * t[1][1] * t[1][2] * t[1][3];
	if (score > highest_score) highest_score = score;
}))

console.log(highest_score);
