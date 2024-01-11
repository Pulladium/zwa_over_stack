


let url = new URL(window.location.href);

function deleteAllParams(){
    url.searchParams.delete('qustion');
    url.searchParams.delete('askQustion');
    url.searchParams.delete('ShowQustion');
    window.history.pushState({}, '', url);
}


function createNotebook(IsEdit){
    // Получить элемент #mainCont
    let mainCont = document.getElementById('mainCont');

    // Проверить существование элемента .notebook
    let notebook = document.querySelector('.notebook');
    if (!notebook) {
        // Создать элемент .notebook, если он не существует
        notebook = document.createElement('div');
        notebook.className = 'notebook';
        mainCont.appendChild(notebook); // Добавить .notebook в #mainCont

        // Создать элемент #notebook-tools
        let notebookTools = document.createElement('div');
        notebookTools.id = 'notebook-tools';
        mainCont.appendChild(notebookTools); // Добавить #notebook-tools в #mainCont


        // Создать элементы внутри #notebook-tools
        let addCode = document.createElement('span');
        addCode.className = 'material-symbols-outlined';
        addCode.id = 'add_code';
        addCode.textContent = 'add_circle';
        addCode.onclick = createCodeDiv;
        notebookTools.appendChild(addCode);

        let addMarkdown = document.createElement('span');
        addMarkdown.className = 'material-symbols-outlined';
        addMarkdown.id = 'add_markdown';
        addMarkdown.textContent = 'add_box';
        addMarkdown.onclick = createMarkdownDiv;
        notebookTools.appendChild(addMarkdown);

        let sendNotebook = document.createElement('span');
        sendNotebook.className = 'material-symbols-outlined';
        sendNotebook.id = 'sendNotebook';
        sendNotebook.textContent = 'check_circle';
        // sendNotebook.onclick = sendNotebookToServer;
        // sendNotebook.addEventListener('click', sendNotebook);
        sendNotebook.onclick = function() {
            sendQustionToPHP(IsEdit); // Замените 'argument' на ваш аргумент
        };
        notebookTools.appendChild(sendNotebook);
    }
}







if(document.getElementById('askButt')!=null) {
    document.getElementById('askButt').onclick = openAsk;
}
// document.getElementById('add_code').onclick = createCodeDiv;
// document.getElementById('add_markdown').onclick = createMarkdownDiv ;


let uniq_code_div = 1;
window.editorsAndmarks = [];





function createCodeDiv() {
    var noteBook = document.querySelector('.notebook');
    uniq_code_div++;
    let div = document.createElement('textarea');
    div.className = 'code';
    div.id = String(uniq_code_div);
    noteBook.appendChild(div);
    var codeInput = CodeMirror.fromTextArea(div, {
        lineNumbers: true,
        mode: "javascript"
    });
    codeInput.getWrapperElement().style.position = 'relative';
    codeInput.getWrapperElement().style.zIndex = '1';
    codeInput.setValue("\nfunction example() {\n  // ...only JavaScript...\n}");

    // Сохраняем ссылку на экземпляр CodeMirror в глобальной переменной
    window.editorsAndmarks.push({type: 'code', value: codeInput});
}
let uniq_mkDown = 0;
function createMarkdownDiv() {
    var noteBook = document.querySelector('.notebook');
    uniq_mkDown++;
    let textarea = document.createElement('textarea');
    textarea.className = 'markdown';
    textarea.id = 'markdown' + uniq_mkDown;
    noteBook.appendChild(textarea);


    // Добавляем обработчик событий input к только что созданному элементу textarea
    textarea.addEventListener('input', () => autoResize(textarea));
    // Save the textarea as an object with type and value properties
    window.editorsAndmarks.push({
        type: 'markdown',
        value: textarea,
   });
}



function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Применяем функцию autoResize к каждому элементу textarea при вводе текста




function openAsk(){
    deleteAllParams();
    url.searchParams.set('askQustion', 'true');
    window.history.pushState({}, '', url);

    var mainCont = document.getElementById('mainCont');
    mainCont.innerHTML = '';
    createNotebook(false);
    let add_code = document.getElementById('add_code');
    let add_markdown = document.getElementById('add_markdown');


    var noteBook = document.querySelector('.notebook');

    noteBook.style.display = 'flex';
    noteBook.innerHTML = '';

    noteBook.insertAdjacentHTML('afterbegin',` 
        <label >Question Title:</label>
        <br> <input type="text" id="questionTitle" name="questionTitle" required><br> 
        <textarea class="code" id="1"></textarea> 
        `);



    var notebookTools = document.getElementById('notebook-tools');
    notebookTools.style.display = 'flex';


    var codeInput = CodeMirror.fromTextArea(document.querySelector('.code'), {
        lineNumbers: true,
        mode: "javascript"
    });
    window.editorsAndmarks.push({
        type: 'code',
        value: codeInput
    });


    codeInput.getWrapperElement().style.position = 'relative';
    codeInput.getWrapperElement().style.zIndex = '0';
    codeInput.setValue("\nfunction example() {\n  // ...only JavaScript...\n}");

}

function showQustion(qustion_data){
    // deleteAllParams();
    // url.searchParams.set('ShowQustion', 'true');
    var mainCont = document.getElementById('mainCont');
    mainCont.innerHTML = '';
    createNotebook(true);
    var notebookTools = document.getElementById('notebook-tools');

    notebookTools.style.display = 'flex';
    // Очистка содержимого блокнота
    var noteBook = document.querySelector('.notebook');
    noteBook.innerHTML = '';

    // Добавление заголовка вопроса
    noteBook.insertAdjacentHTML('afterbegin',`
        <label >Question Title:</label>
        <br> <input type="text" id="questionTitle" name="questionTitle" required><br>
    `);
    document.getElementById('questionTitle').value = qustion_data.title;
    console.log(qustion_data);
    // Проход по каждому блоку в блокноте вопроса
    qustion_data.qustion_notebook.blocks.forEach(block => {
        if(block.type === 'code') {
            // Создание блока кода
            createCodeDiv();
            // Получение последнего созданного редактора кода
            let lastEditor = window.editorsAndmarks[window.editorsAndmarks.length - 1].value;
            // Установка содержимого блока кода
            lastEditor.setValue(block.content);
        } else if(block.type === 'markdown') {
            // Создание блока markdown
            createMarkdownDiv();
            // Получение последнего созданного элемента textarea
            let lastTextarea = window.editorsAndmarks[window.editorsAndmarks.length - 1].value;
            // Установка содержимого блока markdown
            lastTextarea.value = block.content;
            // Вызов функции autoResize для обновления высоты textarea
            autoResize(lastTextarea);
        }
    });
}

