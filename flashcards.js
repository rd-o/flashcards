const generatePDFButton = document.getElementById('generate-pdf');
const { jsPDF } = window.jspdf;
const doc = new jsPDF('p', 'mm', 'letter');
const xSize = 90;
const ySize = 40;
const xSpace = 16;
const ySpace = 5;

generatePDFButton.addEventListener('click', generatePDF);

let generateFullList = (flashcards) => {
  let q = [];
  let a = [];
  let pages = [];

  for(let i = 0; i < flashcards.length; i ++) {
    q.push(flashcards[i].question);
    a.push(flashcards[i].answer);
    if((i + 1) % 12 === 0) {
        pages.push({flashcards: q, isQuestion: true});
        pages.push({flashcards: a, isQuestion: false});
        q = [];
        a = [];
    }

  }
  pages.push({flashcards: q, isQuestion: true});
  pages.push({flashcards: a, isQuestion: false});
  console.log(pages);
    return pages;
};
function generatePDF() {
    const flashcards = [
      {
        "question": "What is the difference between abstract classes and interfaces in Java?",
        "answer": "Abstract classes can have both abstract and concrete methods, while interfaces can only have abstract methods. A class can extend only one abstract class, but it can implement multiple interfaces."
      },
      {
        "question": "Explain the concept of method overloading in Java.",
        "answer": "Method overloading allows a class to have multiple methods with the same name but different parameters. The compiler determines which method to call based on the arguments' types and number."
      },
      {
        "question": "What is a Java thread, and how is it created?",
        "answer": "A thread is the smallest unit of execution in Java. Threads can be created by extending the Thread class or implementing the Runnable interface and passing it to a Thread object."
      },
      {
        "question": "What is the Java Virtual Machine (JVM)?",
        "answer": "The JVM is an integral part of Java execution, responsible for interpreting and executing Java bytecode. It provides platform independence by running Java programs on different platforms."
      },
      {
        "question": "How does garbage collection work in Java?",
        "answer": "Garbage collection automatically reclaims memory by identifying and deleting objects that are no longer reachable. The JVM's garbage collector manages memory and frees up space for new objects."
      },
      {
        "question": "What is the difference between the `equals()` method and the `==` operator in Java?",
        "answer": "The `equals()` method is used to compare the content (values) of objects, while the `==` operator compares object references to check if they point to the same memory location."
      },
      {
        "question": "Explain the 'final' keyword in Java.",
        "answer": "In Java, 'final' can be applied to variables, methods, and classes. A final variable cannot be reassigned, a final method cannot be overridden, and a final class cannot be subclassed."
      },
      {
        "question": "What is the purpose of the 'static' keyword in Java?",
        "answer": "The 'static' keyword is used to define class-level members that belong to the class itself rather than instances of the class. Static members can be accessed using the class name."
      },
      {
        "question": "What is exception handling in Java?",
        "answer": "Exception handling is the process of handling runtime errors to prevent program termination. Java provides a mechanism to catch, handle, and throw exceptions using try-catch blocks."
      },
      {
        "question": "Explain the concept of multithreading and its advantages.",
        "answer": "Multithreading is the concurrent execution of multiple threads within a single process. It improves application responsiveness by utilizing multiple CPU cores, enhances performance, and allows for better resource utilization."
      }
    ];

    let pages = generateFullList(flashcards);

  // Set initial y-coordinate
  let y = 5;
  let questionCounter = 0;
  let flashCardIndex = 0;

    for(let i = 0; i < pages.length; i++){
        let flashcards = pages[i].flashcards;
        let isQuestion = pages[i].isQuestion;
        for(let j = 0; j < flashcards.length; j = j + 2){
            let x = 10;
            let fc1, fc2;
            if(isQuestion) {
                fc1 = j;
                fc2 = j + 1;
            } else {
                fc1 = j + 1;
                fc2 = j;
            }

            if(fc1 < flashcards.length) {
                generateFlashcard(x, y, flashcards[fc1], isQuestion);
            }

            x = x + xSize + xSpace;

            if(fc2 < flashcards.length) {
                generateFlashcard(x, y, flashcards[fc2], isQuestion);
            }
           
            y += ySpace + ySize; // Adjust this value based on your layout

            
        }
        y = 5;
        doc.addPage();
        console.log('add page');
    }
    
  doc.save('flashcards.pdf');
}

generateFlashcard = (x, y, text, isQuestion) => {
    if(isQuestion) {
        doc.rect(x, y, xSize, ySize, 'S'); // 'S' stands for stroke
    }
    var formatedText = doc.splitTextToSize(text, ySize * 2);
    doc.setFontSize(10);
    doc.text(x + 5, y + 10, formatedText);

}
