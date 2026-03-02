console.log("admin.js loaded");

// DO NOT redeclare provider, signer, contract here
// They are already declared in web3.js

let selectedElectionType = null;
let selectedState = null;
let selectedDistrict = null;
let selectedMunicipality = null;

// ==================== INDIA DATA ====================
const demoPastElections = [
  {
    title: "State Election – Andhra Pradesh",
    parties: ["TDP", "YSRCP", "BJP"],
    votes: [420, 510, 130]
  },
  {
    title: "Municipal Election – Vijayawada",
    parties: ["TDP", "YSRCP", "Congress"],
    votes: [180, 220, 90]
  }
];

const indiaStatesDistricts = {
  "Andhra Pradesh": [
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "Guntur",
    "Kadapa",
    "Krishna",
    "Kurnool",
    "Nellore",
    "Prakasam",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari"
  ],
  "Arunachal Pradesh": [
    "Anjaw",
    "Changlang",
    "East Kameng",
    "East Siang",
    "Kurung Kumey",
    "Lohit",
    "Lower Dibang Valley",
    "Lower Subansiri",
    "Papum Pare",
    "Tawang",
    "Tirap",
    "Upper Dibang Valley",
    "Upper Siang",
    "Upper Subansiri",
    "West Kameng",
    "West Siang"
  ],
  "Assam": [
    "Baksa",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Dima Hasao",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup",
    "Kamrup Metropolitan",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Sivasagar",
    "Sonitpur",
    "South Salmara-Mankachar",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong"
  ],
  "Bihar": [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran"
  ],
  "Chhattisgarh": [
    "Balod",
    "Baloda Bazar",
    "Balrampur",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada",
    "Dhamtari",
    "Durg",
    "Gariaband",
    "Janjgir-Champa",
    "Jashpur",
    "Kabirdham",
    "Kanker",
    "Kondagaon",
    "Korba",
    "Koriya",
    "Mahasamund",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sukma",
    "Surajpur",
    "Surguja"
  ],
  "Goa": [
    "North Goa",
    "South Goa"
  ],
  "Gujarat": [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udaipur",
    "Dahod",
    "Dang",
    "Devbhoomi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad"
  ],
  "Haryana": [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurugram",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Nuh",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar"
  ],
  "Himachal Pradesh": [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul and Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur",
    "Solan",
    "Una"
  ],
  "Jharkhand": [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribagh",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahebganj",
    "Seraikela-Kharsawan",
    "Simdega",
    "West Singhbhum"
  ],
  "Karnataka": [
    "Bagalkot",
    "Ballari",
    "Belagavi",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikkaballapur",
    "Chikkamagaluru",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru",
    "Raichur",
    "Ramanagara",
    "Shivamogga",
    "Tumakuru",
    "Udupi",
    "Uttara Kannada",
    "Vijayapura",
    "Yadgir"
  ],
  "Kerala": [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad"
  ],
  "Madhya Pradesh": [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Hoshangabad",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Mandla",
    "Mandsaur",
    "Morena",
    "Narsinghpur",
    "Neemuch",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha"
  ],
  "Maharashtra": [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Aurangabad",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Osmanabad",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal"
  ],
  "Manipur": [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul"
  ],
  "Meghalaya": [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "North Garo Hills",
    "Ri-Bhoi",
    "South Garo Hills",
    "South West Garo Hills",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills"
  ],
  "Mizoram": [
    "Aizawl",
    "Champhai",
    "Hnahthial",
    "Khawzawl",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Saitual",
    "Serchhip"
  ],
  "Nagaland": [
    "Chumukedima",
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Niuland",
    "Noklak",
    "Peren",
    "Phek",
    "Tseminyu",
    "Tuensang",
    "Wokha",
    "Zunheboto"
  ],
  "Odisha": [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghpur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur",
    "Sundargarh"
  ],
  "Punjab": [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Ferozepur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Malerkotla",
    "Mansa",
    "Moga",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sangrur",
    "SAS Nagar",
    "Sri Muktsar Sahib",
    "Tarn Taran"
  ],
  "Rajasthan": [
    "Ajmer",
    "Alwar",
    "Banswara",
    "Baran",
    "Barmer",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Dholpur",
    "Dungarpur",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Kota",
    "Nagaur",
    "Pali",
    "Pratapgarh",
    "Rajsamand",
    "Sawai Madhopur",
    "Sikar",
    "Sirohi",
    "Sri Ganganagar",
    "Tonk",
    "Udaipur"
  ],
  "Sikkim": [
    "East Sikkim",
    "North Sikkim",
    "South Sikkim",
    "West Sikkim"
  ],
  "Tamil Nadu": [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar"
  ],
  "Telangana": [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem",
    "Mahabubabad",
    "Mahabubnagar",
    "Mancherial",
    "Medak",
    "Medchal-Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Ranga Reddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal Rural",
    "Warangal Urban",
    "Yadadri Bhuvanagiri"
  ],
  "Tripura": [
    "Dhalai",
    "Gomati",
    "Khowai",
    "North Tripura",
    "Sepahijala",
    "South Tripura",
    "Unakoti",
    "West Tripura"
  ],
  "Uttar Pradesh": [
    "Agra",
    "Aligarh",
    "Ambedkar Nagar",
    "Amethi",
    "Amroha",
    "Auraiya",
    "Ayodhya",
    "Azamgarh",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kasganj",
    "Kaushambi",
    "Kheri",
    "Kushinagar",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "Prayagraj",
    "Raebareli",
    "Rampur",
    "Saharanpur",
    "Sambhal",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shamli",
    "Shravasti",
    "Siddharthnagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi"
  ],
  "Uttarakhand": [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi"
  ],
  "West Bengal": [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Bardhaman",
    "Paschim Medinipur",
    "Purba Bardhaman",
    "Purba Medinipur",
    "South 24 Parganas",
    "Uttar Dinajpur"
  ],
  "Delhi": [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West Delhi",
    "West Delhi"
  ],
  "Jammu and Kashmir": [
    "Anantnag",
    "Bandipora",
    "Baramulla",
    "Budgam",
    "Doda",
    "Ganderbal",
    "Jammu",
    "Kathua",
    "Kishtwar",
    "Kupwara",
    "Poonch",
    "Pulwama",
    "Rajouri",
    "Ramban",
    "Reasi",
    "Samba",
    "Shopian",
    "Srinagar",
    "Udhampur"
  ],
  "Ladakh": [
    "Kargil",
    "Leh"
  ],
  "Chandigarh": [
    "Chandigarh"
  ],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Daman",
    "Diu",
    "Dadra and Nagar Haveli"
  ],
  "Lakshadweep": [
    "Lakshadweep"
  ],
  "Puducherry": [
    "Karaikal",
    "Mahe",
    "Puducherry",
    "Yanam"
  ],
  "Andaman and Nicobar Islands": [
    "Nicobar",
    "North and Middle Andaman",
    "South Andaman"
  ]
};

// ---------- Andhra Pradesh Municipal Data ----------

const apDistrictMunicipalities = {
  "Anantapur": ["Anantapur", "Dharmavaram", "Gooty", "Hindupur", "Kadiri", "Rayadurg", "Tadipatri"],
  "Chittoor": ["Chittoor", "Madanapalle", "Puttur", "Srikalahasti", "Tirupati"],
  "East Godavari": ["Amalapuram", "Kakinada", "Mandapeta", "Peddapuram", "Rajamahendravaram", "Ramachandrapuram"],
  "Guntur": ["Bapatla", "Chilakaluripet", "Guntur", "Macherla", "Narasaraopet", "Piduguralla", "Tenali"],
  "Kadapa": ["Badvel", "Kadapa", "Jammalamadugu", "Mydukur", "Proddatur", "Pulivendula", "Rayachoti"],
  "Krishna": ["Gudivada", "Jaggaiahpet", "Machilipatnam", "Nandigama", "Nuzvid", "Pedana", "Vijayawada"],
  "Kurnool": ["Adoni", "Dhone", "Kurnool", "Nandyal", "Yemmiganur"],
  "Nellore": ["Atmakur", "Gudur", "Kavali", "Nellore", "Sullurpeta", "Venkatagiri"],
  "Prakasam": ["Chirala", "Markapur", "Ongole", "Podili"],
  "Srikakulam": ["Amadalavalasa", "Ichchapuram", "Palasa", "Srikakulam"],
  "Visakhapatnam": ["Anakapalle", "Bheemunipatnam", "Gajuwaka", "Visakhapatnam"],
  "Vizianagaram": ["Bobbili", "Parvathipuram", "Vizianagaram"],
  "West Godavari": ["Bhimavaram", "Eluru", "Narasapuram", "Palakollu", "Tadepalligudem", "Tanuku"]
};

// ==================== EXPOSE GLOBALS ====================

window.showSection = showSection;
window.addCandidate = addCandidate;
window.registerVoter = registerVoter;
window.startElection = startElection;
window.stopElection = stopElection;

// ---------------- INIT ----------------
document.addEventListener("DOMContentLoaded", async () => {
  if (!window.ethereum) {
    alert("MetaMask not detected");
    return;
  }

  // Hide dashboard initially
  document.getElementById("adminContent").classList.add("hidden");
  document.getElementById("loginScreen").style.display = "flex";

  populateStatesDropdown();
});

// ==================== STATE DROPDOWN ====================

function populateStatesDropdown() {
  const select = document.getElementById("stateSelect");
  if (!select) return;

  select.innerHTML = `<option value="">Select State</option>`;

  Object.keys(indiaStatesDistricts)
    .sort()
    .forEach(state => {
      const opt = document.createElement("option");
      opt.value = state;
      opt.innerText = state;
      select.appendChild(opt);
    });
}

// ---------------- ADMIN LOGIN ----------------
window.adminLogin = async function() {
  localStorage.removeItem("registeredVoters");

  try {
    await connectWallet();
    if (!window.contract) throw new Error("Contract not loaded");

    const adminAddr = await contract.admin();
    const user = await signer.getAddress();
    document.getElementById("wallet").innerText = user;

    if (adminAddr.toLowerCase() !== user.toLowerCase()) {
      alert("Access denied: You are NOT Admin");
      window.location.href = "../index.html";
      return;
    }

    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("adminContent").classList.remove("hidden");

    await refreshDashboard();
    await loadCandidates();
    await loadVoters();

    // Remove old listeners to avoid duplicates
    contract.removeAllListeners();

    // 🔴 Live vote updates (only if event exists)
    try {
      contract.on("Voted", async () => {
        console.log("🗳 Vote detected → updating chart");
        await loadResultsChart();
        await refreshDashboard();
      });
    } catch (err) {
      console.warn("Voted event not in ABI. Skipping live updates.");
    }

    // Load chart safely
    await loadResultsChart();

    alert("Admin login successful");

  } catch (err) {
    console.error(err);
    alert("Admin login failed: " + err.message);
  }
};

// ---------------- CANDIDATES TABLE ----------------
async function loadCandidates() {
  const tbody = document.getElementById("candidatesTable");
  tbody.innerHTML = "";

  const count = Number(await contract.getCandidatesCount());
  const parties = JSON.parse(localStorage.getItem("candidateParties") || "{}");

  for (let i = 1; i <= count; i++) {
    const c = await contract.candidates(i);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i}</td>
      <td>${c.name}</td>
      <td>${parties[i] || "N/A"}</td>
    `;
    tbody.appendChild(row);
  }
}

// ---------------- NAVIGATION ----------------
function showSection(section, el) {
  document.querySelectorAll(".nav-link").forEach(n => n.classList.remove("active"));
  if (el) el.classList.add("active");

  ["dashboard", "candidates", "voters", "controls", "results"].forEach(id => {
    const sec = document.getElementById(id + "Section");
    if (sec) sec.classList.add("hidden");
  });

  const target = document.getElementById(section + "Section");
  if (target) target.classList.remove("hidden");

  if (section === "dashboard") {
  refreshDashboard();
  loadCandidates();
  loadVoters();
}

if (section === "results") {
  loadResultsSection();
}

}

// ---------------- ADMIN CHECK ----------------
async function checkAdmin() {
  const user = await signer.getAddress();
  const admin = await contract.admin();
  if (user.toLowerCase() !== admin.toLowerCase()) {
    alert("Admin only action");
    return false;
  }
  return true;
}

// ---------------- DASHBOARD ----------------
async function refreshDashboard() {
  try {
    const cCount = await contract.getCandidatesCount();
    document.getElementById("statCandidates").innerText = cCount;

    let totalVotes = 0;
    for (let i = 1; i <= cCount; i++) {
      const c = await contract.candidates(i);
      totalVotes += Number(c.voteCount);
    }
    document.getElementById("statVotes").innerText = totalVotes;

    const started = await contract.electionStarted();
    document.getElementById("statStatus").innerText = started ? "Active" : "Inactive";

    const voters = JSON.parse(localStorage.getItem("registeredVoters") || "[]");
    document.getElementById("statVoters").innerText = voters.length;
  } catch (err) {
    console.error("Dashboard refresh failed:", err);
  }
}

// ---------------- CANDIDATES ----------------
async function addCandidate() {
  if (!(await checkAdmin())) return;

  const name = document.getElementById("candidateName").value.trim();
  const party = document.getElementById("partyName").value.trim();

  if (!name || !party) {
    alert("Enter candidate name and party");
    return;
  }

  try {
    const tx = await contract.addCandidate(name);
    await tx.wait();

    const count = await contract.getCandidatesCount();
    const parties = JSON.parse(localStorage.getItem("candidateParties") || "{}");
    parties[count] = party;
    localStorage.setItem("candidateParties", JSON.stringify(parties));

    document.getElementById("candidateName").value = "";
    document.getElementById("partyName").value = "";

    alert("✅ Candidate added");

    await refreshDashboard();
    await loadCandidates();
    await loadResultsChart();

  } catch (err) {
    console.error("Add candidate failed:", err);
    alert("Failed to add candidate");
  }
}

// ---------------- VOTERS ----------------
async function registerVoter() {
  if (!(await checkAdmin())) return;

  const started = await contract.electionStarted();
  if (started) {
    alert("❌ Cannot register voters after election has started");
    return;
  }

  const wallet = document.getElementById("voterAddress").value.trim();
  const name = prompt("Enter voter name:");

  if (!wallet || !ethers.utils.isAddress(wallet)) {
    alert("Enter valid wallet address");
    return;
  }
  if (!name) return;

  try {
    const tx = await contract.registerVoter(wallet);
    await tx.wait();

    const voters = JSON.parse(localStorage.getItem("registeredVoters") || "[]");
    if (voters.find(v => v.wallet.toLowerCase() === wallet.toLowerCase())) {
      alert("Voter already registered");
      return;
    }

    voters.push({ name, wallet, registered: true });
    localStorage.setItem("registeredVoters", JSON.stringify(voters));

    document.getElementById("voterAddress").value = "";

    alert("✅ Voter registered");
    await refreshDashboard();
    await loadVoters();
  } catch (err) {
    console.error("Register voter failed:", err);
    alert("Failed to register voter");
  }
}

async function loadVoters() {
  const tbody = document.getElementById("votersTable");
  tbody.innerHTML = "";

  const voters = JSON.parse(localStorage.getItem("registeredVoters") || "[]");

  voters.forEach((v, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${v.name}</td>
      <td>${v.wallet}</td>
      <td>${v.registered ? "Registered" : "Pending"}</td>
    `;
    tbody.appendChild(row);
  });
}

// ---------------- CONTROLS ----------------
async function startElection() {
  if (!(await checkAdmin())) return;

  try {
    const tx = await contract.startElection();
    await tx.wait();
    alert("🟢 Election started");
    await refreshDashboard();
  } catch (err) {
    console.error("Start election failed:", err);
    alert("Failed to start election");
  }
}

async function stopElection() {
  if (!(await checkAdmin())) return;

  try {
    const tx = await contract.stopElection();
    await tx.wait();
    alert("🔴 Election stopped");
    await saveCurrentElectionResult();
    await refreshDashboard();
  } catch (err) {
    console.error("Stop election failed:", err);
    alert("Failed to stop election");
  }
}

// ---------------- RESULTS ----------------
async function loadResultsChart() {
  try {
    const canvas = document.getElementById("resultsChart");
    if (!canvas || typeof Chart === "undefined") return;

    const count = Number(await contract.getCandidatesCount());
    const labels = [];
    const votes = [];

    for (let i = 1; i <= count; i++) {
      const c = await contract.candidates(i);
      labels.push(c.name);
      votes.push(Number(c.voteCount));
    }

    // Destroy existing chart properly
    if (window.resultsChart instanceof Chart) {
      window.resultsChart.destroy();
    }

    const ctx = canvas.getContext("2d");
    window.resultsChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Votes",
          data: votes,
          backgroundColor: "#3b82f6",
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 400 },
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        }
      }
    });

  } catch (err) {
    console.error("❌ Chart update failed:", err);
  }
}

// ==================== ELECTION FLOW UI ====================

window.selectElectionType = function(type) {
  selectedElectionType = type;

  document.getElementById("typeState").classList.remove("active");
  document.getElementById("typeMunicipal").classList.remove("active");

  if (type === "STATE") document.getElementById("typeState").classList.add("active");
  else document.getElementById("typeMunicipal").classList.add("active");

  // Reset UI
  document.getElementById("stateGroup").classList.remove("hidden");
  document.getElementById("districtGroup").classList.add("hidden");
  document.getElementById("municipalityGroup")?.classList.add("hidden");
  document.getElementById("startElectionBtn").classList.add("hidden");

  selectedState = null;
  selectedDistrict = null;
  selectedMunicipality = null;

  // If MUNICIPAL → force Andhra Pradesh
  if (type === "MUNICIPAL") {
    const select = document.getElementById("stateSelect");
    select.value = "Andhra Pradesh";
    select.disabled = true;
    onStateSelect();
  } else {
    document.getElementById("stateSelect").disabled = false;
  }
};

window.onStateSelect = function() {
  const state = document.getElementById("stateSelect").value;
  if (!state) return;

  selectedState = state;

  const districts = indiaStatesDistricts[state] || [];
  const container = document.getElementById("districtChips");
  container.innerHTML = "";

  districts.forEach(d => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.innerText = d;
    chip.onclick = () => selectDistrict(d, chip);
    container.appendChild(chip);
  });

  document.getElementById("districtGroup").classList.remove("hidden");
  document.getElementById("municipalityGroup")?.classList.add("hidden");
  document.getElementById("startElectionBtn").classList.add("hidden");
  selectedDistrict = null;
  selectedMunicipality = null;
};

function selectDistrict(district, el) {
  selectedDistrict = district;
  document.querySelectorAll("#districtChips .chip").forEach(c => c.classList.remove("active"));
  el.classList.add("active");

  if (selectedElectionType === "MUNICIPAL") {
    showMunicipalities(district);
  } else {
    document.getElementById("startElectionBtn").classList.remove("hidden");
    document.getElementById("startElectionBtn").innerText =
      `🚀 Start ${selectedState} – ${selectedDistrict} Election`;
  }
}

// ---------- MUNICIPAL FLOW ----------

function showMunicipalities(district) {
  const municipalities = apDistrictMunicipalities[district] || [];
  const container = document.getElementById("municipalityChips");
  container.innerHTML = "";

  municipalities.forEach(m => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.innerText = m;
    chip.onclick = () => selectMunicipality(m, chip);
    container.appendChild(chip);
  });

  document.getElementById("municipalityGroup").classList.remove("hidden");
  document.getElementById("startElectionBtn").classList.add("hidden");
  selectedMunicipality = null;
}

function selectMunicipality(municipality, el) {
  selectedMunicipality = municipality;
  document.querySelectorAll("#municipalityChips .chip").forEach(c => c.classList.remove("active"));
  el.classList.add("active");

  document.getElementById("startElectionBtn").classList.remove("hidden");
  document.getElementById("startElectionBtn").innerText =
    `🚀 Start ${selectedDistrict} – ${selectedMunicipality} Municipal Election`;
}

// ---------------- START ELECTION (NEW FLOW) ----------------
window.startElectionFlow = async function() {
  if (!(await checkAdmin())) return;

  if (!selectedElectionType || !selectedState || !selectedDistrict) {
    alert("Please complete election setup");
    return;
  }

  if (selectedElectionType === "MUNICIPAL" && !selectedMunicipality) {
    alert("Please select municipality");
    return;
  }

  try {
    console.log("Election Setup:", {
      type: selectedElectionType,
      state: selectedState,
      district: selectedDistrict,
      municipality: selectedMunicipality
    });

    const tx = await contract.startElection();
    await tx.wait();

    if (selectedElectionType === "STATE") {
      alert(`🟢 ${selectedState} – ${selectedDistrict} State Election Started`);
    } else {
      alert(`🟢 ${selectedDistrict} – ${selectedMunicipality} Municipal Election Started`);
    }

    await refreshDashboard();
  } catch (err) {
    console.error("Start election failed:", err);
    alert("Failed to start election");
  }
};

async function loadResultsSection() {
  const container = document.getElementById("resultsCardsContainer");
  if (!container) return;

  container.innerHTML = "";

  const elections = JSON.parse(localStorage.getItem("pastElections") || "null") || demoPastElections;

  elections.forEach((election, index) => {
    const card = document.createElement("div");
    card.className = "result-card";

    const winnerIndex = election.votes.indexOf(Math.max(...election.votes));
    const winner = election.parties[winnerIndex];

    const canvasId = `resultChart_${index}`;

    card.innerHTML = `
      <h4>${election.title}</h4>
      <p>🏆 Winning Party: <b>${winner}</b></p>
      <div style="height:220px;">
        <canvas id="${canvasId}"></canvas>
      </div>
    `;

    container.appendChild(card);

    const ctx = document.getElementById(canvasId).getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: election.parties,
        datasets: [{
          label: "Votes",
          data: election.votes,
          borderColor: "#2563eb",
          backgroundColor: "rgba(37,99,235,0.15)",
          tension: 0.35,
          fill: true,
          pointRadius: 4
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  });
}
async function saveCurrentElectionResult() {
  const count = await contract.getCandidatesCount();
  const partiesMap = JSON.parse(localStorage.getItem("candidateParties") || "{}");

  const parties = [];
  const votes = [];

  for (let i = 1; i <= count; i++) {
    const c = await contract.candidates(i);
    parties.push(partiesMap[i] || c.name);
    votes.push(Number(c.voteCount));
  }

  const elections = JSON.parse(localStorage.getItem("pastElections") || "[]");

  const title =
    selectedElectionType === "STATE"
      ? `State Election – ${selectedState || "Unknown"}`
      : `Municipal Election – ${selectedMunicipality || "Unknown"}`;

  elections.unshift({ title, parties, votes }); // newest first
  localStorage.setItem("pastElections", JSON.stringify(elections.slice(0, 5))); // keep only last 5
}