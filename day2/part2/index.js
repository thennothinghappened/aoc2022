const fs = require('fs');

const data = fs.readFileSync('../input', 'utf-8');
/*const data = 
`A Y
B X
C Z`;*/
const lines = data.split(/\r?\n/);

/*
A =		Rock		= 1
B =		Paper		= 2
C =		Scissors	= 3

X =		Lose
Y =		Draw
Z =		Win

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

	switch (opp) {
		// versing rock
		case 'A':
			if (you === 'X') return values['C'];
			if (you === 'Y') return values['A'] + 3;
			if (you === 'Z') return values['B'] + 6;

		// versing paper
		case 'B':
			if (you === 'X') return values['A'];
			if (you === 'Y') return values['B'] + 3;
			if (you === 'Z') return values['C'] + 6;
			
		// versing scissors
		case 'C':
			if (you === 'X') return values['B'];
			if (you === 'Y') return values['C'] + 3;
			if (you === 'Z') return values['A'] + 6;
			

	}
}

let score = 0;

lines.forEach(line => {

	if (line === '') return;

	const opp = line.charAt(0);
	const you = line.charAt(2);

	score += getVal(opp, you);
	console.log(opp, you, score);
});


