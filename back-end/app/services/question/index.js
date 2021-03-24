const questions = require("../../config/questions");
const answers = require("../../config/answers");

exports.getQuestion = async (sequence, isOver) => {

    let antQuestion; 

    //Final da Arvore esquerda representa que encontrou a resposta, direita adiciona uma nova folha
    if(isOver){
        return sequence[sequence.length - 1] === "left" ?{
            result: questions.getEndTalk(),
            finish: true
        } : {
            result: questions.getNegativeQuestion(),
            finish: true
        }
    }  

    let question = answers;

    //Navegando pela arvore de acordo com as respostar do usuário
    for (let value of sequence) {
        if (question[0][value].length !== 0)
            antQuestion = question[0];

        if (question[0][value].length === 0 && value === "left") {
            return {
                result: questions.getPositiveQuestion() + " " + question[0]['food'] + "?",
                finish: true,
                food: question[0]['food'],
            }
        } else if (question[0][value].length === 0 && value === "right") {
           return !isOver ? {
                result: questions.getPositiveQuestion() + " " + antQuestion['food'] + "?",
                finish: true,
                food: antQuestion['food'],
            } : {
                result: questions.getNegativeQuestion(),
                finish: true
            }
        }
        
        question = question[0][value];
    }

    //retorna uma nova pergunta para o usuário
    return !question[0]['feature'] ? {
        result: questions.getPositiveQuestion() + " " + question[0]['food'] + "?",
        finish: true, 
            finish: true, 
        finish: true, 
        food: question[0]['food'],
    } : {
        result: questions.getPositiveQuestion() + " " + question[0]['feature'] + "?",
        finish: false
    };
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

    let updatedAnswers = answers;

    for(let value of sequence){
        updatedAnswers = updatedAnswers[0][value];
    }

    updatedAnswers.push({ feature: feature, food: food, left: [], right: lastAnswer ? [lastAnswer] : [] });

    return answers;
};
