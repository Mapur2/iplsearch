const options = document.getElementById("options")
const url = "http://192.168.0.10:3000/"
const suggest = document.getElementById("suggestion")
suggest.style.display = "none"
const data = [
    "Virat Kohli",
    "MS Dhoni",
    "Mustafizur Rahman",
    "Rachin Ravindra",
    "Manav Suthar",
    "Rasikh Dar",
    "Sushant Mishra",
    "Daryl Mitchell",
    "Avanish Rao Aravelly",
    "Manish Pandey",
    "Shardul Thakur",
    "Sameer Rizvi",
    "Shivam Mavi",
    "Shai Hope",
    "Spencer Johnson",
    "Mujeeb Rahman",
    "Nuwan Thushara",
    "Shivalik Sharma",
    "Chetan Sakariya",
    "Shreyas Gopal",
    "Alzarri Joseph",
    "Tanay Thyagarajann",
    "Shashank Singh",
    "Kumar Kushagra",
    "Sakib Hussain",
    "Naman Dhir",
    "Saurav Chuahan",
    "Angkrish Raghuvanshi",
    "Lockie Ferguson",
    "Anshul Kamboj",
    "Prince Choudhary",
    "Tom Kohler-Cadmore",
    "David Willey",
    "Vishwanath Pratap Singh",
    "Harshal Patel",
    "Nandre Burger",
    "Harry Brook",
    "Gus Atkinson",
    "Ashton Turner",
    "Arshin Kulkarni",
    "Tom Curran",
    "Sherfane Rutherford",
    "K.S. Bharat",
    "Dilshan Madushanka",
    "Ricky Bhui",
    "Mohd. Arshad Khan",
    "Gerald Coetzee",
    "Ashutosh Sharma",
    "Swastik Chhikara",
    "Jhye Richardson",
    "M. Siddharth",
    "Shubham Dubey",
    "Abid Mushtaq",
    "Rilee Rossouw",
    "Sumit Kumar",
    "Azmatullah Omarzai",
    "Mohammad Nabi",
    "Kartik Tyagi",
    "Robin Minz",
    "Umesh Yadav",
    "Ramandeep Singh",
    "Rovman Powell",
    "Tristan Stubbs",
    "Shahrukh Khan",
    "Mitchell Starc",
    "Chris Woakes",
    "Yash Dayal",
    "Pat Cummins",
    "Travis Head",
    "Jhathavedh Subramanyan",
    "Wanindu Hasaranga",
    "Akash Singh",
    "Jaydev Unadkat",
    "Swapnil Singh"
]

const teams = [
    'CSK', 'GT', 'DC',
    'KKR', 'LSG', 'MI',
    'RCB', 'PK', 'RR',
    'SH'
]

let option = ""
for (let i = 0; i < teams.length; i++) {
    option += `  <option value=${teams[i]}>${teams[i]}</option>`
}
options.innerHTML = option

function generate(res) {
    let pls = ""
    for (let i = 0; i < res.length; i++) {
        pls += ` <div class="player">
    <h3>${res[i].PLAYERS}</h3>
    <p>Nationality : ${res[i].NATIONALITY}</p>
    <p>Team: ${res[i].TEAM}</p>
    <p>Type: ${res[i].TYPE}</p>
    <p>Price Paid:<br> ${res[i]['PRICE PAID']}</p>
</div>
`
    }
    document.getElementById("players").innerHTML = pls
}

function search(name) {
    suggest.style.display = "none"
    document.getElementById("value").value = name
    const text = options.options[options.selectedIndex].text
    fetch(`/find?team=${text}&name=${name}`)
        .then(res => res.json())
        .then(res => {
            if (!res.success)
                return
            res = res.players
            console.log(res)
            generate(res)
        })
}

function searchPlayer() {
    suggest.style.display = "none"
    let name = document.getElementById("value").value
    search(name)

}

function teamPlayers() {
    document.getElementById("value").value = ""
    const text = options.options[options.selectedIndex].text
    let pls = ""
    fetch(`/find?team=${text}`)
        .then(res => res.json())
        .then(res => {
            if (!res.success)
                return
            res = res.players
            generate(res)
        })
}
teamPlayers()

function suggestions() {
    const searchval = document.getElementById("value").value
    if (searchval.trim() == "") {
        suggest.style.display = "none"
        return
    }
    pls = ""
    let results = data.filter(plys => plys.toLowerCase().includes(searchval.toLowerCase().trim()))
    if (results.length) {
        suggest.style.display = "flex"
        for (let i = 0; i < results.length; i++) {
            pls += `<div onclick="search('${results[i]}')">
            ${results[i]}
        </div>`
        }
        suggest.innerHTML = pls
    }
}