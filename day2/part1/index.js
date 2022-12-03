const fs = require('fs');

const data = fs.readFileSync('../input', 'utf-8');
/*const data = 
`A Y
B X
C Z`;*/
const lines = data.split(/\r?\n/);

/*
A = X =		Rock		= 1
B = Y =		Paper		= 2
C = Z =		Scissors	= 3

loss = 0
draw = 3
win  = 6
*/

const values = {
	'A': 1,
	'B': 2,
	'C': 3,
};

const standard = {
	'X': 'A',
	'Y': 'B',
	'Z': 'C'
};

getVal = (opp, you) => {
	const u = standard[you];

	// draw
	if (u === opp) return 3 + values[u];
	
	let victory;

	switch (u) {
		case 'A':
			// if they chose scissors, you win
			victory = (opp === 'C' ? true : false);
			break;
		case 'B':
			// if they chose rock, you win
			victory = (opp === 'A' ? true : false);
			break;
		case 'C':
			// if they chose paper, you win
			victory = (opp === 'B' ? true : false);
			break;

	}

	return (victory * 6) + values[u];
}

let score = 0;

lines.forEach(line => {

	if (line === '') return;

	const opp = line.charAt(0);
	const you = line.charAt(2);

	score += getVal(opp, you);
	console.log(opp, you, score);
});


