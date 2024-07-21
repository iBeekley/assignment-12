class Track {
    constructor(name){
        this.name = name;
        this.times = [];
    }
}
let tracks = [];

class Time {
    constructor(time, driver, car, date){
        this.time = time;
        this.driver = driver;
        this.car = car;
        this.date = date;
    }
}
let times = [];

function createTrack() {
    let trackName = document.getElementById('newTrack').value;

    for(let i = 0; i < tracks.length; i++){ // Check if track already exists
        if (tracks[i].name === trackName) {
            alert('Track \"' + trackName + '\" already exists');
            return;
        }
    }

    let newTrack = new Track(trackName);
    tracks.push(newTrack);
    let id = tracks.length - 1;
    console.log(`creating track ${newTrack.name} with id ${id}`);
    $(".card-body").append(`
        <div id= "track${id}" class="row card mt-2">
            <div class="d-flex justify-content-between align-items-center">
                <h2 class="mb-0">${newTrack.name}</h2>
                <button id="btn" class="btn btn-primary" onclick="deleteTrack(${id})">Delete</button>
            </div>
            <table class="table fs-4 sortable table-striped" id=timesList${id}>
                <tr>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Car</th>
                </tr>
            </table>
            <h3>Add Time</h3>
            <div class="col-sm">
                <label for="newDriver${id}"><b>Driver</b></label>
                <input type="text" placeholder="Driver Name" id="newDriver${id}" class="form-control">
            </div><div class="col-sm">
                <label for="newCar${id}"><b>Car</b></label>
                <input type="text" placeholder="year make model" id="newCar${id}" class="form-control">
            </div><div class="col-sm">
                <label for="newTime${id}"><b>Time</b></label>
                <input type="text" placeholder="mm:ss.xxx" id="newTime${id}" class="form-control">
            </div>
            <button id="btn" class="btn btn-primary" onclick="addTime(${id})">Submit</button>
        </div>`
    );
    console.log(tracks);
}

function addTime(local) {
    let createDate = new Date();
    let id = tracks[local].times.length;
    console.log(`adding time to id: ${id} ${tracks[local].name}`);
    let table = document.getElementById(`timesList${local}`);
    let row = table.insertRow(1);
    row.setAttribute('id', `item-${id}`);
    row.insertCell(0).innerHTML = document.getElementById(`newTime${local}`).value; //cell html is set to the corresponding form value
    row.insertCell(1).innerHTML = `${createDate.getFullYear()}-${createDate.getMonth() + 1}-${createDate.getDate()} ${createDate.getHours()}:${createDate.getMinutes()}`; //native date 
    row.insertCell(2).innerHTML = document.getElementById(`newDriver${local}`).value;
    row.insertCell(3).innerHTML = document.getElementById(`newCar${local}`).value;
    row.insertCell(4).innerHTML = `
        <button id="btn" class="btn btn-primary" onclick="editTime(${local}, ${id})">Edit</button>
        <button id="btn" class="btn btn-primary" onclick="deleteTime(${local}, ${id})">Delete</button>
    `;
    tracks[local].times[id] = 
        new Time(document.getElementById(`newTime${local}`).value, 
        document.getElementById(`newDriver${local}`).value, 
        document.getElementById(`newCar${local}`).value, 
        `${createDate.getFullYear()}-${createDate.getMonth() + 1}-${createDate.getDate()} ${createDate.getHours()}:${createDate.getMinutes()}`);
    console.log(tracks[local].times.length);
}

function deleteTime(trackId, timeId) {
    let table = document.getElementById(`timesList${trackId}`);
    let row = document.getElementById(`item-${timeId}`);
    table.deleteRow(row.rowIndex);
    console.log(`deleting time ${timeId} from track ${trackId}`);
    tracks[trackId].times.splice(timeId, 1); // Remove the time from the array
}

function deleteTrack(trackId) {
    let element = document.getElementById(`track${trackId}`);
    element.parentElement.removeChild(element);
    tracks.splice(trackId, 1); // Remove the track from the array
    console.log(`deleting track ${trackId}`);
}

function editTime(trackId, timeId) {
    let time = tracks[trackId].times[timeId];
    document.getElementById(`newTime${trackId}`).value = time.time;
    document.getElementById(`newDriver${trackId}`).value = time.driver;
    document.getElementById(`newCar${trackId}`).value = time.car;

    // Update button visuals
    let submitButton = document.querySelector(`#track${trackId} button[onclick="addTime(${trackId})"]`);
    submitButton.textContent = 'Update';
    submitButton.onclick = function() {
        updateTime(trackId, timeId);
    };
}

function updateTime(trackId, timeId) {
    let createDate = new Date();
    let time = tracks[trackId].times[timeId];
    time.time = document.getElementById(`newTime${trackId}`).value;
    time.driver = document.getElementById(`newDriver${trackId}`).value;
    time.car = document.getElementById(`newCar${trackId}`).value;
    time.date = `${createDate.getFullYear()}-${createDate.getMonth() + 1}-${createDate.getDate()} ${createDate.getHours()}:${createDate.getMinutes()}`;

    let table = document.getElementById(`timesList${trackId}`);
    let row = document.getElementById(`item-${timeId}`);
    row.cells[0].innerHTML = time.time;
    row.cells[1].innerHTML = time.date;
    row.cells[2].innerHTML = time.driver;
    row.cells[3].innerHTML = time.car;

    // Change the Update button 
    let updateButton = document.querySelector(`#track${trackId} button[onclick="updateTime(${trackId}, ${timeId})"]`);
    updateButton.textContent = 'Submit';
    updateButton.onclick = function() {
        addTime(trackId);
    };
}
