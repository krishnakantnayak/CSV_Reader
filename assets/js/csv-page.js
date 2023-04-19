let searchform = $('#search-form');
let searchbtn=$('#search-btn');
let tabformat=document.getElementById('results-table').innerHTML;
let recieved = {}

//ajax request will be sent on click of query btn 
searchbtn.live('click',async function (e) {
    e.preventDefault();
    
    console.log('search clicked' ,searchform.serializeArray());
    let datum = { vals: searchform.serializeArray(), 'loc': $('#loc').val() };
    await $.ajax({
        type: 'post',
        url: '/show_csv',

        data: datum,
        success: function (rcvdData) {
            recieved = rcvdData;
            console.log(rcvdData);

        },
        error: function (err) {
            console.log(err);
        }
    });

    drawtable(recieved);
    
    
});

//function to draw result data
function drawtable(recieved){
    let ihtml = ``;

    for (let i = 0; i < recieved.data.length; i++) {
        ihtml += `<tr>
            <td>${i}</td>
            `
        for (let cols = 0; cols < recieved.headers.length; cols++) {
            ihtml += `<td>${recieved.data[i][recieved.headers[cols]]}</td>
                `
        }
        ihtml += `</tr>`
        // console.log(recieved.data[i]);
    }
    $('.search-fields').text('');
    document.getElementById('results-table').innerHTML=tabformat+ihtml;
    recieved = {};
}
