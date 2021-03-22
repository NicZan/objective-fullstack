const express = require("express");
const router = express.Router();
const auth = require("../services/auth")();
const questions = require("../config/questions");

const { applyValidators } = require("../utils/validators");

const { asyncMiddleware} = require("../middlewares/middleware.js");

const questionService = require("../services/question");

router.get("/start", asyncMiddleware(async (req, res) => {

    res.json({
        success: true,
        message: "Conversa iniciada",
        result: questions.getInitialTalk()
    });
}));

router.get("/end", asyncMiddleware(async (req, res) => {

    res.json({
        success: true,
        message: "Conversa encerrada",
        result: questions.getEndTalk()
    });
}));

router.post("/next/question", asyncMiddleware(async (req, res) => {
    const sequence = req.body.sequence;
    const isOver = req.body.isOver;

    applyValidators([
        { params: { sequence, isOver } },
    ]);

    let {result, finish} = await questionService.getQuestion(sequence, isOver);

    res.json({
        success: true,
        message: "Próxima pergunta buscada.",
        finish,
        result
    });
}));

router.post("/question", asyncMiddleware(async (req, res) => {
    const feature = req.body.feature;
    const food = req.body.food;
    const sequence = req.body.sequence;

    applyValidators([
        { params: { feature, food, sequence } },
    ]);

    let questions = await questionService.postQuestion(feature, food, sequence);

    res.json({
        success: true,
        message: "Pergunta adicionada.",
        result: questions
    });
}));


module.exports = router;
