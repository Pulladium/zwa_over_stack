let myquButton =  document.getElementById("myQust");
let topButt = document.getElementById("topQust");

let pole_href = document.querySelectorAll('.href_more');

pole_href.forEach(function(element) {
    element.onclick = createEx;
});

myquButton.onclick = createEx;
topButt.onclick = createEx;

function createEx() {
    var notebookTools = document.getElementById('notebook-tools');
    notebookTools.style.display = 'none';

    document.querySelector('.top-questions').style.display = 'none';
    document.querySelector('.new-questions').style.display = 'none';


    var noteBook = document.querySelector('.notebook');

    noteBook.innerHTML = '';
    noteBook.style.display = 'flex';
    noteBook.insertAdjacentHTML('afterbegin',` 
        <h1>DU po ZAlu shoorom 7 chci udelat pomoci cyclometricky list ale vlastni?</h1>
        <p>pleez help</p>
        `);

    noteBook.insertAdjacentHTML('beforeend',`
        <h1>Broo try this out...</h1>
        <div class="code" id="code1"></div>
        `);
    
    // var notebookTools = document.getElementById('notebook-tools');
    // notebookTools.style.display = 'flex';


    var codeInput = CodeMirror(document.querySelector('.code'), {
        lineNumbers: true,
        mode: "javascript"
    });

    codeInput.setValue("document.getElementById('askButt').onclick = openAsk;\n" +
"document.getElementById('add_code').onclick = createCodeDiv;\n" +
"document.getElementById('add_markdown').onclick = createMarkdownDiv ;\n\n" +
"let uniq_code_div = 0; \n" +
"function createCodeDiv() {\n" +
"    var noteBook = document.querySelector('.notebook');\n" +
"    uniq_code_div++;\n" +
"    let div = document.createElement('div');\n" +
"    div.className = 'code';\n" +
"    div.id = 'code' + uniq_code_div;\n" +
"    noteBook.appendChild(div);\n" +
"}");

    codeInput.getWrapperElement().style.position = 'relative';
    codeInput.getWrapperElement().style.zIndex = '1';


    var noteBook = document.querySelector('.notebook');
    noteBook.style.display = 'flex';
    noteBook.style.flexDirection = 'column';
    noteBook.style.justifyContent = 'space-between';
    noteBook.style.gap = '0.5vh';
}