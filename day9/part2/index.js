const fs = require('fs');

const data = fs.readFileSync('../inputold', 'utf-8').trimEnd();
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
}

let pos_arr = [];

for (let i = 0; i < 10; i ++) {
	pos_arr.push(new Vector2(0, 4));
}

const dir_list = {
	'U': [0, -1],
	'D': [0, 1],
	'L': [-1, 0],
	'R': [1, 0]
};

console.log(pos_arr)

function update_positions(dir) {

	const d = dir_list[dir];

	const h = pos_arr[0];
	let prev_prev = new Vector2(h.x, h.y);
	h.newpos(h.x+d[0], h.y+d[1]);

	for (let i = 1, len = pos_arr.length; i<len; ++ i) {
		
		const prev = pos_arr[i-1];
		const curr = pos_arr[i];
		const tmp = new Vector2(curr.x, curr.y);
		
		if (!curr.touches(prev))
			curr.newpos(prev_prev.x, prev_prev.y);
		
		pos_arr[i] = curr;
		prev_prev = tmp;

	}

	console.table(pos_arr)
}

let visited_positions = {'0': {'4': true}};

lines.forEach(line => {
	
	const l = line.split(' ');
	const dir = l[0];
	const num = parseInt(l[1]);

	console.log('\n==', dir, num, '==\n');

	for (let i = 0; i < num; i ++) {
		

		update_positions(dir);

		// add to visited positions
		const t = pos_arr[pos_arr.length-1];
		if (visited_positions[t.x] === undefined) visited_positions[t.x] = {};
		visited_positions[t.x][t.y] = true;
		
		console.log(pos_arr[0].x, ',', pos_arr[0].y, ' || ', t.x, ',', t.y);
	}
});

let n = 0;

Object.keys(visited_positions).forEach(k => {
	Object.keys(visited_positions[k]).forEach(k2 => {
		n ++;
	});
});

console.log(visited_positions);
console.log(n)
