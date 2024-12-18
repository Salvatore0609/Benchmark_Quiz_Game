let h2 = document.createElement("h2");
let main = document.querySelector("main");
main.appendChild(h2)

let answer = document.querySelectorAll(".answer");

/* funzione: array.questions tramite math.random ---> 
ciclo ancora sull'array.risposte(append ai bottom o p), --fin qua

--timer
--reset timer ad ogni domanda nuova

SE true && clicco(event) --> appare procedi = aggiungi percentuale (a pagina collegata), 
ALTRIMENTI SE false && clicco(event) --> appare procedi = aggiungi percentuale errore. 

-question 1/10 i++

*/

const  questions = [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does CPU stand for?",
      correct_answer: "Central Processing Unit",
      incorrect_answers: [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
      correct_answer: "Final",
      incorrect_answers: ["Static", "Private", "Public"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "The logo for Snapchat is a Bell.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question:
        "Pointers were not used in the original C programming language; they were added later on in C++.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the most preferred image format used for logos in the Wikimedia database?",
      correct_answer: ".svg",
      incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "In web design, what does CSS stand for?",
      correct_answer: "Cascading Style Sheet",
      incorrect_answers: [
        "Counter Strike: Source",
        "Corrective Style Sheet",
        "Computer Style Sheet",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the code name for the mobile operating system Android 7.0?",
      correct_answer: "Nougat",
      incorrect_answers: [
        "Ice Cream Sandwich",
        "Jelly Bean",
        "Marshmallow",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "On Twitter, what is the character limit for a Tweet?",
      correct_answer: "140",
      incorrect_answers: ["120", "160", "100"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "Linux was first created as an alternative to Windows XP.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
  ]

  function random(questionsArray) {
    const random = Math.floor(Math.random() * questionsArray.length);
    /* console.log(questionsArray[random]);  */
    let question = questionsArray[random].question
    /* console.log(question) */
    h2.textContent = question

    /* ------------------- */

    let correctAnswer = questionsArray[random].correct_answer
    /* console.log(correctAnswer)  */
    let incorrectAnswer = questionsArray[random].incorrect_answers
    /* console.log(incorrectAnswer) */

    let totAnswer = [...incorrectAnswer, correctAnswer]
    /* console.log(totAnswer) */
    for (let i = 0; i < answer.length; i++) {
      let p = document.createElement("p")
      p.textContent = totAnswer[i]
      answer[i].appendChild(p)                  //preso da fuori
      main.appendChild(answer[i])               
    }
  }
  random(questions);

  let footer = document.querySelector('footer')


for (let i=0; i < answer.length; i++){
  answer[i].addEventListener('click', () => {
  if (!footer.querySelector(".btnProceed")){
      let proceedBtn = document.createElement("button");
      proceedBtn.textContent = "Procedi";
      proceedBtn.classList.add("btnProceed");
      footer.appendChild(proceedBtn);

    proceedBtn.addEventListener('click', () => {
      for(let i=0; i < answer.length; i++){
        answer[i].textContent = ''
        let questionNumber = document.querySelector('#questionNumber')
        questionNumber.textContent = parseInt(questionNumber);
        
      }
    })
    nextQuestion()

    }
  });
}



function nextQuestion(){
  let button = document.querySelector('.btnProceed')
    button.addEventListener('click', () => {
    random(questions);
    button.remove()
  })
}

  



