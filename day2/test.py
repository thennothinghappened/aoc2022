import os


# A = X = ROCK : 1
# B = Y = PAPER : 2
# C = Z = SCISSORS: 3
# win = 6
# draw = 3
# lost = 0

# get the value of the move
def getValues(you, opp, score = 0):
    # convert your move into the same format
    u = moves[you]
    if (opp == u):
        score += 3 + values[you]
    elif (opp == wins[you]):
        score += 6 + values[you]
    else:
        score += values[you]
    return score

file = open("input", "r")

roundlist = file.read().replace(" ", "").splitlines()
print(roundlist)

values = {
    "A": 1,
    "B": 2,
    "C": 3
}


moves = {
    "A": "X",
    "B": "Y",
    "C": "Z"
}

wins = {
    "A": "Z",
    "B": "X",
    "C": "Y"
}

score = 0

# 
for rounds in range(len(roundlist)):
    you = roundlist[rounds][0]
    opp = roundlist[rounds][1]
    score += getValues(you, opp)
    print(getValues(you, opp))

print(score)
