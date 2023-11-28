document.getElementById('askButt').onclick = openAsk;
document.getElementById('add_code').onclick = createCodeDiv;
document.getElementById('add_markdown').onclick = createMarkdownDiv ;

let uniq_code_div = 0; 
function createCodeDiv() {
    var noteBook = document.querySelector('.notebook');
    uniq_code_div++;
    let div = document.createElement('div');
    div.className = 'code';
    div.id = 'code' + uniq_code_div;
    noteBook.appendChild(div);
}
let uniq_mkDown = 0;
function createMarkdownDiv() {
    var noteBook = document.querySelector('.notebook');
    uniq_mkDown++; 
    let div = document.createElement('div');
    div.className = 'markdown';
    div.id = 'markdown' + uniq_mkDown;
    noteBook.appendChild(div);
}



// let noteBook = document.querySelector('.notebook');



function openAsk(){

    document.querySelector('.top-questions').style.display = 'none';
    document.querySelector('.new-questions').style.display = 'none';

    // var add_code = document.getElementById('add_code');
    // var add_markdown = document.getElementById('add_markdown');

    // var main = document.getElementById('mainCont');
    // main.insertAdjacentHTML('afterbegin',`
        // <form action="submit_question.php" method="post" class="notebook"> 
        //     <label for="questionTitle">Question Title:</label>
        //     <br> <input type="text" id="questionTitle" name="questionTitle" required><br> 
        //     <label for="questionBody">Question Body:</label>
        //     <br> <textarea id="questionBody" name="questionBody" required></textarea><br> 
        //     <input type="submit" value="Submit Question"> 
        // </form> 
        // `);
    var noteBook = document.querySelector('.notebook');
    noteBook.style.display = 'flex';


    noteBook.innerHTML = '';

    noteBook.insertAdjacentHTML('afterbegin',` 
        <label for="questionTitle">Question Title:</label>
        <br> <input type="text" id="questionTitle" name="questionTitle" required><br> 
        <label for="questionBody">Question Body:</label>
        <br> <textarea id="questionBody" name="questionBody" required></textarea><br> 
        <div class="code" id="code1"></div>
        <input type="submit" value="Submit Question"> 
        `);
    var notebookTools = document.getElementById('notebook-tools');
    notebookTools.style.display = 'flex';


    var codeInput = CodeMirror(document.querySelector('.code'), {
        lineNumbers: true,
        mode: "javascript"
    });


    codeInput.getWrapperElement().style.position = 'relative';
    codeInput.getWrapperElement().style.zIndex = '1';
    codeInput.setValue("\nfunction example() {\n  // ...only JavaScript...\n}");

    var noteBook = document.querySelector('.notebook');
    noteBook.style.display = 'flex';
    noteBook.style.flexDirection = 'column';
    noteBook.style.justifyContent = 'space-between';
    noteBook.style.gap = '0.5vh';
}



