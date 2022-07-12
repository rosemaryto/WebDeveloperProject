//UNHIDE WAIVER
function hideWaiver() {
    let consent = document.getElementById('consent');
    let waiverText = document.getElementById('waiver');
    if (consent.checked == true) {
        waiverText.style.display = 'block';
    } else {
        waiverText.style.display = 'none';
    }
}

//ARRAY OF WAIVERS
let arrWaivers = [
["Ross", "Gellar", "rgellar@gmail.com", 1234567890, 1],
["Monica", "Gellar", "mgellar@gmail.com", 1234567890, 1],
["Chandler", "Bing", "cbing@gmail.com", 1234567890, 1]
]

//CHECK LOCAL STORAGE & RETURN STORAGE OBJECT INTO ARRAY
if (localStorage.getItem('waivers') !== null) {
    arrWaivers = JSON.parse(localStorage.getItem('waivers'));
}
//GET DOM ELEMENTS
let form = document.getElementById('waiverForm');
let table = document.getElementById ('waiverTable');

//BUILD WAIVER TABLE WHEN PAGE LOADS
buildTable()

function buildTable() {
    table.lastElementChild.remove()
    let tbody = document.createElement('tbody')
    for (let waiver of arrWaivers) {
        tbody.innerHTML += 
        `
        <tr>
            <td>${waiver[0]}</td>
            <td>${waiver[1]}</td>
            <td>${waiver[2]}</td>
            <td>${waiver[3]}</td>
            <td>${waiver[4]}</td>
            <td><button class="delete">X</button></td>
        </tr>
        `
    }
    table.appendChild(tbody);
    localStorage.setItem('waivers', JSON.stringify(arrWaivers));
}

//ADD WAIVER
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let fName = document.getElementById('fName').value
    let lName = document.getElementById('lName').value
    let email = document.getElementById('email').value
    let tel = document.getElementById('tel').value;
    let consent = document.getElementById('consent').value;
    let arrNewWaiver = [fName, lName, email, tel, consent]
    arrWaivers.push(arrNewWaiver)
    buildTable()
    form.reset()
    form.fName.focus()
})

//DELETE WAIVER
table.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete?')) {
            let rowIndex = e.target.parentNode.parentNode.rowIndex
            arrWaivers.splice(rowIndex -1,1)
            buildTable()
        }
    }
})