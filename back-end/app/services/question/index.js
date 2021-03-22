const questions = require("../../config/questions");
const answers = require("../../config/answers");

exports.getQuestion = async (sequence, isOver) => {

    //Final da Arvore esquerda representa que encontrou a resposta, direita adiciona uma nova folha
    if (isOver && sequence[sequence.length - 1] === "left") {
        return {
            result: questions.getEndTalk(),
            finish: true
        }
    }
    if (isOver && sequence[sequence.length - 1] === "right") {
        return {
            result: questions.getNegativeQuestion(),
            finish: true
        }
    }

    let question = answers;

    //Navegando pela arvore de acordo com as respostar do usuário
    for (let value of sequence) {

        if (question[0][value].length === 0 && value === "left") {
            return {
                result: questions.getPositiveQuestion() + " " + question[0]['food'] + "?",
                finish: true
            }
        }
        if (question[0][value].length === 0 && value === "right") {
            return {
                result: questions.getNegativeQuestion(),
                finish: true
            }
        }

        question = question[0][value];
    }

    //retorna uma nova pergunta para o usuário
    if (!question[0]['feature']) {
        return {
            result: questions.getPositiveQuestion() + " " + question[0]['food'] + "?",
            finish: true
        }
    } else {
        return {
            result: questions.getPositiveQuestion() + " " + question[0]['feature'] + "?",
            finish: false
        }
    }

};

exports.postQuestion = async (feature, food, sequence) => {

    let reference = answers;
    let lastAnswer;
    
    for (let i = 0; i < sequence.length; i++) {
        if(i === sequence.length -1){
            lastAnswer = reference[0][sequence[i]].pop();
        }else{
            reference = reference[0][sequence[i]];
        }
    }

    for(let value of sequence){
        reference = reference[0][value];
    }

    reference.push({ feature: feature, food: food, left: [], right: [lastAnswer] });

    return answers;
};
