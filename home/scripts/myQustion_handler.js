if(document.getElementById("myQust") != null) {
    let myquButton = document.getElementById("myQust");

    myquButton.onclick = DisplayMyQustions;
}
let topButt = document.getElementById("topQust");




// let url = new URL(window.location.href);

function showAllQustions(qustions){
    var mainCont = document.getElementById("mainCont");
    mainCont.innerHTML = '';
    var div = document.createElement('div');
    // div.className = 'container'
    div.style = 'display: flex; flex-direction: column;';
    mainCont.appendChild(div);
    for (let key in qustions) {
        if (qustions.hasOwnProperty(key)) {
            let qustion = qustions[key];
            console.log(qustion);
            console.log('tabulator');
            var p = document.createElement('a');
            // p.href = 'https://zwa.toad.cz/~vozhoart/home/home.php?qustion=' + qustion.id;
            p.onclick = function() {
                //novy kod
                url = new URL(window.location.href);
                deleteAllParams();
                url.searchParams.set('qustion', '#');
                url.searchParams.set('qustion', qustion.id);
                window.history.pushState({}, '', url);
                //novy kod
                showQustion(qustion);
            };
            p.className = 'href_more_about_qustion';
            p.innerHTML = qustion.title;
            div.appendChild(p);
            // lastqustion = qustion;
        }

    }


}

function DisplayMyQustions(){
    console.log('trying to fetch  user qusts');
    fetch('phps/userQustions.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'function_name': 'GetUserQustions', // Имя функции, которую вы хотите вызвать
            // 'arguments': arguments // Аргументы, которые вы хотите передать функции
        })
    })
        .then(response => response.json())
        .then(data => {
            // console.log(typeof data);
            // console.log(data);

            let value;
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    value = data[key];
                    // console.log(value);
                    // console.log('tabulator');
                }
            }
            let lastqustion;
            for (let key in value) {
                if (value.hasOwnProperty(key)) {
                    let qustion = value[key];
                    // console.log(qustion);
                    // console.log('tabulator');
                    lastqustion = qustion;
                }
            }
            deleteAllParams();
            url.searchParams.set('qustion', '#');
            window.history.pushState({}, '', url);
            showAllQustions(value);

        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

