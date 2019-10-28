var db = firebase.firestore();
var data = "";
db.collection("events").orderBy('timestamp', 'desc').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var event = doc.data();
        data += `
        
        <div class="col-md-4" data-id="${doc.id}" onclick="showEventDetails(this)">
            <div class="e-card">
                <div class="e-card-top" style="background-image:url('${event.image}')">
                </div>
                <div class="e-card-bottom">
                    <h5 class="strong">${event.name}</h5>
                    <p><i class="far fa-calendar-alt"></i>&nbsp;&nbsp;&nbsp;&nbsp;${event.date}</p>
                </div>
            </div>
        </div>`;
        document.getElementById('area').innerHTML = data;
    });

});


function showEventDetails(event) {
    var id = event.getAttribute("data-id");
    db.collection("events").where('id', "==", id).get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
}