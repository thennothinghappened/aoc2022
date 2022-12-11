const fs = require('fs');

const data = fs.readFileSync('../input', 'utf-8').trimEnd();
const lines = data.split(/\r?\n/);

class Vector2 {
	constructor (x, y) {
		this.x = x;
		this.y = y;
	}

	touches(v2) {
		if (v2.x >= this.x-1 &&
			v2.x <= this.x+1 &&
			v2.y >= this.y-1 &&
			v2.y <= this.y+1
		) return true;
		return false;
	}

	newpos(x, y) {
		this.x = x;
		this.y = y;
	}

	get_side(v2) {
		// get difference
		const diff = new Vector2(v2.x-this.x, v2.y-this.y);

		// if the x difference is bigger than the y difference
		if (Math.abs(diff.x) > Math.abs(diff.y)) {
			
			return (diff.x >= 0 ? 'L' : 'R');
		}

		// diagonal
		if (Math.abs(diff.x) === Math.abs(diff.y)) {
			// get corner
			let str = '';
			if (diff.y < 0) str += 'B'; else str += 'T';
			if (diff.x < 0) str += 'R'; else str += 'L';
			return str;
			
		}

		return (diff.y >= 0 ? 'U' : 'D');

	}
}

let pos_arr = [];

for (let i = 0; i < 10; i ++) {
	pos_arr.push(new Vector2(1000, 1000));
}

const dir_list = {
	'U': [0, -1],
	'D': [0, 1],
	'L': [-1, 0],
	'R': [1, 0],
	'TR': [1, -1],
	'TL': [-1, -1],
	'BR': [1, 1],
	'BL': [-1, 1]
}

function get_new_valid(prev, curr) {
	const d = dir_list[curr.get_side(prev)];
	curr.newpos(prev.x+d[0], prev.y+d[1]);
}

function update_positions(dir) {
	
	// +y = down
	// -y = up
	// +x = right
	// -x = left

	const d = dir_list[dir];

	// get the head
	const h = pos_arr[0];
	h.newpos(h.x+d[0], h.y+d[1]);
		
	for (let i = 1, len = pos_arr.length; i < len; ++ i) {
		const prev = pos_arr[i-1];
		const curr = pos_arr[i];

		if (!curr.touches(prev))
			get_new_valid(prev, curr);
	}

	for (let y = 0, str = ''; y < 6; ++ y) {
		for (let x = 0, char = '.'; x < 6; ++ x) {
			for (let i = pos_arr.length-1; i >= 0; -- i) {
				if (x === pos_arr[i].x && y === pos_arr[i].y) {
					char = (i > 0 ? (i < 9 ? i : 'T') : 'H');
				}
			}

			str += char;
			char = '.';
		}

		console.log(str);
		str = '';
	}
	
}

let visited_positions = [];

lines.forEach(line => {
	
	const l = line.split(' ');
	const dir = l[0];
	const num = parseInt(l[1]);

	console.log('\n==', dir, num, '==\n');

	for (let i = 0; i < num; i ++) {
		

		update_positions(dir);

		// add to visited positions
		const t = pos_arr[pos_arr.length-1];
		if (visited_positions[t.x] === undefined) visited_positions[t.x] = [];
		visited_positions[t.x][t.y] = true;
		
		console.log(pos_arr[0].x, ',', pos_arr[0].y, ' || ', t.x, ',', t.y);
	}
});

let n = 0;
let str = '';

// https://stackoverflow.com/questions/33577266/find-the-index-of-the-longest-array-in-an-array-of-arrays
const lengths = visited_positions.map(a=>a.length);
//
console.log(lengths)

for (let y = 0, height = visited_positions.length; y < height; ++ y) {
	
	if (visited_positions[y] !== undefined) {
		for (let x = 0, width = 5000; x < width; ++ x) {
			const vis = visited_positions[y][x] === true;
			n += vis === true;
			str += (vis === true) ? '#' : '.';
		}
	} else str = '..................................................'

	console.log(str);
	str = '';
}

console.log(n)
