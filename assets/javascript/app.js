function click(){

    var question1 = document.quiz.question1.value;
    var question2 = document.quiz.question2.value;
    var question3 = document.quiz.question1.value;
    var question4 = document.quiz.question1.value;
    var correct = 0;

    if (question1 === "kaj") {
        correct++;
    }

    if (question2 === "kbwc") {
        correct++;
    }

    if (question3 === "bc") {
        correct++;
    }

    if (question4 === "dn") {
        correct++;
    }
    document.getElementById("results").style.visibility = "visible";
    }