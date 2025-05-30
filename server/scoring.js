const express = require('express');
const cors = require('cors');
const app = express();
const port = 5823;

app.use(cors());
app.use(express.json());

let scoreState = {
    message: '',
    score: 0,
    streak: 0
};

app.put('/check/:id', (req, res) => {
    const challengeId = req.params.id;
    const { body } = req;

    if (body.roundNumber === 1) resetScore(scoreState)

    if (body.roundNumber > 5) {
        return res.status(400).send({message: 'Bad Request. Max round number is 5.'})
    }

    fetch('http://localhost:5723/daily/' + challengeId)
        .then(async dbRes => {
            const c = await dbRes.json()
            let round;
            try {
                round = c['round' + body.roundNumber]
            } catch(err) {
                return res.status(500).send({message: 'Incorrect round number.'})
            }


            if (body.selectedAnswer === round['edited']) {
                return res.status(200).send({...updateScore(scoreState), message: 'Correct!'});
            } else {
                return res.status(200).send({...resetScore(scoreState), message: 'Incorrect!'});
            }
        }).catch(err => {
            return res.status(404).send({message: `Daily challenge with id ${challengeId} could not be found.`, err});
        });
});

app.listen(port, () => {
    console.log(`Scoring Service listening at http://localhost:${port}`);
});

function updateScore(state) {
    state.streak++;
    state.score += 10 * (state.streak );
    return state;
}

function resetScore(state) {
    state.streak = 0;
    state.score = 0;
    return state;
}