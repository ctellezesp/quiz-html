import React, {Component} from 'react';
import {QUESTIONS} from './questions.data';
import swal from 'sweetalert';
import './game.styles.css';

export default class Game extends Component {
    constructor() {
        super();
        this.state = {
            questions: QUESTIONS,
            currentQuestion: 0,
            questionDisplay: QUESTIONS[0],
            currentAnswer: '',
            finish: false
        }
    }

    setAnswers = (event) => {
        this.setState({
            currentAnswer: event.target.value
        });
    }

    handleEnter = (event) => {
        console.log('key: ', event.key);
        if(event.key === 'Enter') {
            this.verify();
        }
    }

    verify = () => {
        if(this.state.questionDisplay.answer === this.state.currentAnswer) {
            swal("Respuesta Correcta", "Bien hecho", "success")
                .then(() => {
                    let nextQuest = this.state.currentQuestion + 1;
                    if(nextQuest === this.state.questions.length) {
                        this.setState({
                            finish: true
                        });
                    } else {
                        this.setState({
                            questionDisplay: this.state.questions[this.state.currentQuestion + 1],
                            currentQuestion: this.state.currentQuestion + 1,
                            currentAnswer: ''
                        });
                    }
                })
        } else {
            swal("Respuesta incorrecta", "Intenta otra vez", "error");
        }
    }

    render() {
        const {questionDisplay, currentAnswer, finish} = this.state;
        return(
            <div className="game">
                {!finish && 
                    <div className="game-card">
                        <span><b>Introduce la palabra que falta para completar la sentencia</b></span>
                        <p className="question">{questionDisplay.question}</p>
                        <input className="custom-input" type="text" placeholder="Escribe aquí tu respuesta..." value={currentAnswer} onChange={this.setAnswers} onKeyDown={this.handleEnter} />
                        <button className="custom-btn" type="button" onClick={this.verify}>Verificar</button>
                    </div>
                }
                {finish && 
                    <div className="game-card centering">
                        <h1>Terminado</h1>
                        <img className="img-finish" src="http://assets.stickpng.com/thumbs/5aa78e207603fc558cffbf19.png" alt="Finished" />
                    </div>
                }
            </div>
        );
    }
}