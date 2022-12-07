const fs = require('fs');

const data = fs.readFileSync('../input', 'utf-8').trimEnd();
const lines = data.split(/\r?\n/);

let d = {};

function removeLeadingSlash(path) {
	return (path.startsWith('/') ? path.substring(1) : path);
}

function getNestedValue(obj, key) {
	key = removeLeadingSlash(key);
	if (key === '') return obj;
	if (key.indexOf('/') === -1) return (obj[key] ?? undefined);

	return key.split('/').reduce((result, k) => {
		if (result === undefined) return undefined;
		return result[k];
	}, obj);
}

function setNestedValue(obj, key, val) {

	key = removeLeadingSlash(key);
	const path = key.split('/');
	const limit = path.length-1;

	for (let i = 0; i < limit; ++ i) {
		const name = path[i];
		obj = obj[name] || (obj[name] == {});
	}

	const name = path[limit];
	obj[name] = val;
}

function createNode(path, data={}) {
	
	if (getNestedValue(d, path) === undefined) {
		console.log(typeof data !== 'number' ? 'DIR' : 'FILE', path, 'does not exist, creating...');
		setNestedValue(d, path, data);
		console.log('fs = ', d);

	}
}

let current_dir = '';

lines.forEach(line => {
	
	const l = line.split(' ');

	// get the type (lines beginning with $ are commands)
	if (l[0] === '$') {
		
		const cmd = l[1];
		
		// we're getting the contents of local folder so skip to next line
		if (cmd === 'ls') return;

		const folder = l[2];
		
		// go to top level
		if (folder === '/') {
			current_dir = '';
			console.log('\nmoving to -- TOP LEVEL --');

			return;
		}

		// go up a level
		if (folder === '..') {
			if (current_dir === '') return;
			current_dir = current_dir.slice(0, current_dir.lastIndexOf('/'));
			console.log('\nmoving --UP-- to DIR:', current_dir);

			return;
		}

		// move into folder
		current_dir += '/' + folder;
		console.log('\n---- moving to DIR:', current_dir);
		createNode(current_dir, {});

		return;
	}

	
	// we must be reading output of ls
	console.log('\nname:', current_dir + '/' + l[1], '\nsize or dir:', l[0]);

	const node_data = isNaN(l[0]) ? {} : parseInt(l[0]);
	createNode(current_dir + '/' + l[1], node_data);
});

console.log(JSON.stringify(d))

// recurse over every folder!!!!!!!
// we are the borg
// resistance is futile

// basically
// keep searching down the tree to the bottom folder levels and get their sizes, work the way up the tree

let used_size = 0;
let smallest_possible = Infinity;
const disk_size = 70000000;
const needed_free = 30000000;

function rec(obj, threshold) {

	let size = 0;

	Object.keys(obj).forEach(node => {
		const o = obj[node];
		if (typeof o === 'object') {
			size += rec(o, threshold);
			return;
		}

		size += o;
	})
	
	if (size < smallest_possible && size >= threshold) smallest_possible = size;
	return size;
}
// did some stuff manually because my brain small
// basically fed the output back into the input to get here
used_size = rec(d, needed_free-22947560);
console.log(disk_size - used_size);
console.log(smallest_possible)
