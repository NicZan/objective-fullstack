import React, { useEffect, useState } from "react"
import questionsResource from "../../resources/questions";
import Button from "../../components/button";
import Input from "../../components/input";
import styles from "./styles.module.scss";

const Main = () => {
    const [initialDialog, setInitialDialog] = useState("");
    const [dialog, setDialog] = useState("");
    const [sequence, setSequence] = useState([]);
    const [isOver, setIsOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(false);
    const [hasToAddNewQuestion, setHasToAddNewQuestion] = useState(false);
    const [showFeature, setShowFeature] = useState(false);
    const [feature, setFeature] = useState("");
    const [food, setFood] = useState("");
    const [lastFood, setLastFood] = useState("");

    const clearState = () => {
        setDialog(initialDialog);
        setSequence([]);
        setIsOver(false);
        setLoading(false);
        setStart(false);
        setHasToAddNewQuestion(false);
        setShowFeature(false);
        setFeature("");
        setFood("");
        setLastFood("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const response = await questionsResource.start();
        setDialog(response.data.result);
        setInitialDialog(response.data.result);
    }, []);

    const handleUpdateFood = (event) => {
        setFood(event.target.value);
    };

    const handleUpdateFeature = (event) => {
        setFeature(event.target.value);
    };

    const getNextQuestion = async (direction) => {

        try {
            if (loading) {
                return;
            }

            if (direction === "left" || direction === "right") {
                sequence.push(direction)
            }

            isOver && direction === "left" ? setStart(false) : setStart(true);

            if (isOver && direction === "right") {
                setHasToAddNewQuestion(true);
            }

            setLoading(true);

            let response = await questionsResource.nextQuestion({ sequence, isOver });
            console.log(response);

            if (response.data.success) {
                setLoading(false);
                setIsOver(response.data.finish);
                setDialog(response.data.result);
                if (response.data.food)
                    setLastFood(response.data.food)


            } else {
                throw new Error(response.data.message)
            }
        } catch (err) {
            setLoading(false);
            alert(err.message);
        }
    }

    const putNewQuestion = async () => {
        try {
            if (loading) {
                return;
            }

            sequence.pop();
            setLoading(true);

            let response = await questionsResource.addQuestion({ sequence, feature, food });
            console.log(response);

            if (response.data.success) {
                setLoading(false);
                clearState();
            } else {
                throw new Error(response.data.message)
            }
        } catch (err) {
            setLoading(false);
            alert(err.message);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <h1 className={styles.title}>Jogo Gourmet</h1>
                <p  className={styles.text}>{dialog}</p>
                {!start && <div className={styles.containerButton}>
                    <Button
                        onClick={() => { isOver ? clearState() : getNextQuestion(sequence) }}
                        className={`confirm`}
                    >
                        {'ok'}
                    </Button></div>
                }

                {start && !hasToAddNewQuestion && <div className={styles.containerButton}>
                    <Button
                        onClick={() => { getNextQuestion("left") }}
                        className={`left`}
                    >
                        {'sim'}
                    </Button>
                    <Button
                        onClick={() => { getNextQuestion("right") }}
                        className={`right`}
                    >
                        {'não'}
                    </Button>
                </div>}

                {hasToAddNewQuestion && !showFeature && <div>
                    <Input
                        placeholder={""}
                        onChange={handleUpdateFood}
                    />

                    <div className={styles.containerButton}>
                        <Button
                            disabled={!food}
                            onClick={() => {
                                setDialog(food + " é ______ mas " + lastFood + " não.");
                                setShowFeature(true)
                            }}
                            className={`setFood`}
                        >
                            {'ok'}
                        </Button>
                        <Button
                            onClick={() => { clearState() }}
                            className={`cancel`}
                        >
                            {'cancelar'}
                        </Button>
                    </div>
                </div>}
                {hasToAddNewQuestion && showFeature && <div>
                    <Input
                        placeholder={""}
                        onChange={handleUpdateFeature}
                    />

                    <div className={styles.containerButton}>
                        <Button
                            disabled={!feature}
                            onClick={() => { putNewQuestion() }}
                            className={`createNewQuestion`}
                        >
                            {'ok'}
                        </Button>
                        <Button
                            onClick={() => { clearState() }}
                            className={`cancel`}
                        >
                            {'cancelar'}
                        </Button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Main