const fs = require('fs');
const {stringify} = require('querystring');

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

let h = new Vector2(0, 4);
let t = new Vector2(0 ,4);

let visited_positions = {'0': {'4': true}};

lines.forEach(line => {
	
	const l = line.split(' ');
	const dir = l[0];
	const num = parseInt(l[1]);

	console.log('\n==', dir, num, '==\n');

	for (let i = 0; i < num; i ++) {
		switch (dir) {
			case 'D':
				h.y ++;
				if (!t.touches(h))
					t.newpos(h.x, h.y-1);
				break;

			case 'U':
				h.y --;
				if (!t.touches(h))
					t.newpos(h.x, h.y+1);
				break;

			case 'L':
				h.x --;
				if (!t.touches(h))
					t.newpos(h.x+1, h.y);
				break;

			case 'R':
				h.x ++;
				if (!t.touches(h))
					t.newpos(h.x-1, h.y);
				break;

		}

		// add to visited positions
		if (visited_positions[t.x.toString()] === undefined) visited_positions[t.x.toString()] = {};
		visited_positions[t.x.toString()][t.y.toString()] = true;
		
		console.log(h.x, ',', h.y, ' || ', t.x, ',', t.y);
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
