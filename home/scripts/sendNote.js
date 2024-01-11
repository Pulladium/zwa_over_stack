let  sendNote_btn = document.getElementById('sendNotebook');
if(sendNote_btn === null) {
    sendNote_btn.addEventListener('click', sendQustionToPHP);
}
// import { block, noteBook, question } from './Qustion_class.js';
function verifyNotebook() {
    var codelist = [];
    var markdownlist=[];

    let codeElements = window.editorsAndmarks
        .map((element, index) => ({type: element.type, index: index, value: element.value})) // Map each element to an object with the element type, its index and its value
        .filter(element => element.type === 'code'); // Filter out the elements that are not of type 'code'

    // console.log(codeElements);

    let markdownElements = window.editorsAndmarks
    .map((element, index) => ({type: element.type, index: index, value: element.value})) // Map each element to an object with the element type, its index and its value
    .filter(element => element.type === 'markdown'); // Filter out the elements that are not of type 'markdown'

    // console.log(markdownElements);

    if(codeElements.length !== 0) {
        codeElements.forEach(curr_code => {
            // var textarea = curr_code.value.getTextArea();
            var editor_value = curr_code.value.getValue('\n');
            // console.log(editor_value);
            if (editor_value.trim() === '') {
                curr_code.remove();
            }
            else {
                codelist.push({
                    type: 'code',
                    index: curr_code.index,
                    value: editor_value
                });
            }

        });
    }

    if(markdownElements.length !== 0) {
        markdownElements.forEach(curr_markdown => {
            var markdown_value = curr_markdown.value.value;
            // console.log(markdown_value);
            if (markdown_value.trim() === '') {
                markdownElements.slice(markdownElements.indexOf(curr_markdown), 1);
            }
            else {
                markdownlist.push({
                    type: 'markdown',
                    index: curr_markdown.index,
                    value: markdown_value
                });
            }

        });
    }


    // If both lists are empty, return null
    if (codelist.length === 0 && markdownlist.length === 0) {
        return null;
    }
    else{
        // Возвращаем codelist и markdownlist как массив из двух элементов
        return [codelist, markdownlist];
    }
}

function sendQustionToPHP(isOverwrite) {
    var title = document.getElementById('questionTitle').value;

    var qustion_notebook_data = verifyNotebook();
    let urlParams = new URLSearchParams(window.location.search);
    let thisId;
    if(urlParams.has('qustion')) {
        thisId = urlParams.get('qustion');
    }else {
        thisId = 1;
    }
    if(qustion_notebook_data === null){
        alert('Notebook is empty!');
        return;
    }else {
        // var jdata = {
        //     title: title,
        //     qustion_notebook_data: qustion_notebook_data
        // };
        console.log(qustion_notebook_data);
        function formatData(title, blocks) {
            var formattedData = {
                qustions: [
                    {
                        id: 1, // Замените на реальный ID
                        title: title,
                        qustion_notebook: {
                            notebook_id: 0, // Замените на реальный ID ноутбука
                            blocks: blocks.flat().map((block) => ({
                                block_id: block.index,
                                type: block.type,
                                content: block.value
                            }))
                        },
                        notebooks: [] // Пустой массив, так как нет данных для notebooks
                    }
                ]
            };

            return formattedData;
        }


        var formData = formatData(title, qustion_notebook_data);
        // console.log(formData);
        var newjson = JSON.stringify(formData);
        // console.log('main json = ')
        // console.log(newjson);
        let xmlhttp= window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200){
                console.log(this.responseText);
                // location.href = 'home.php';
            }
            else{
                console.log(this.responseText);
            }
        }


        if(isOverwrite) {
            console.log('Try Overwrite');
            xmlhttp.open("POST", "phps/overwrite_qustion.php", true);
        }else {
            console.log('Try Send new');
            xmlhttp.open("POST", "phps/send_qustion.php", true);
        }
        xmlhttp.setRequestHeader("Content-Type", "application/json");

        xmlhttp.send(newjson); // Отправка данных в формате JSON


    }

}

