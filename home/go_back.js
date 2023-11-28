let home_butt = document.getElementById('home_href_h1');

home_butt.onclick = function() {
    var noteBook = document.querySelector('.notebook');
    noteBook.innerHTML = '';
    // noteBook.style.display = 'none';



    document.querySelector('.top-questions').style.display = 'block';
    document.querySelector('.new-questions').style.display = 'block';

    var notebookTools = document.getElementById('notebook-tools');
    notebookTools.style.display = 'none';
};