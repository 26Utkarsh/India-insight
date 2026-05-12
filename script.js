/* ═══════════════════════════════════════════════════════
   INDIA INSIGHT  ·  Dashboard Script
   
   KEY FIX: Telangana was carved out of Andhra Pradesh in
   June 2014. Many GeoJSON files still only have a single
   "Andhra Pradesh" polygon covering both modern states.
   
   Strategy:
   - Keep both AP and Telangana in stateCatalog
   - In the GeoJSON alias map, map "Andhra Pradesh" → 
     "Andhra Pradesh" (the coastal residual state)
   - Detect if the GeoJSON has a "Telangana" feature;
     if NOT, split the old AP polygon visually by rendering
     both states with slightly different colors derived
     from the same base data, and show a note.
   - If the GeoJSON DOES have "Telangana", map it normally.
   ═══════════════════════════════════════════════════════ */

/* ── METRICS ── */
const metrics = [
  { key:"temperature",           label:"Temperature",             category:"realtime", unit:"°C",        betterHigher:false },
  { key:"airQuality",            label:"Air Quality Index (AQI)", category:"realtime", unit:"AQI",       betterHigher:false },
  { key:"rainfall",              label:"Rainfall",                category:"realtime", unit:"mm",        betterHigher:true  },
  { key:"humidity",              label:"Humidity",                category:"realtime", unit:"%",         betterHigher:false },
  { key:"windSpeed",             label:"Wind Speed",              category:"realtime", unit:"km/h",      betterHigher:false },
  { key:"uvIndex",               label:"UV Index",                category:"realtime", unit:"",          betterHigher:false },
  { key:"fireData",              label:"Fire Hotspots",           category:"realtime", unit:"hotspots",  betterHigher:false },
  { key:"aqiAlerts",             label:"AQI Alerts",              category:"realtime", unit:"alerts",    betterHigher:false },
  { key:"weatherCondition",      label:"Weather Condition",       category:"realtime", unit:"",          betterHigher:true  },
  { key:"cloudCoverage",         label:"Cloud Coverage",          category:"realtime", unit:"%",         betterHigher:false },
  { key:"gdp",                   label:"GSDP (RBI latest)",       category:"daily",    unit:"₹ lakh cr", betterHigher:true  },
  { key:"unemploymentRate",      label:"Unemployment Rate",       category:"daily",    unit:"%",         betterHigher:false },
  { key:"fuelPrice",             label:"Fuel Price",              category:"daily",    unit:"₹/L",       betterHigher:false },
  { key:"electricityConsumption",label:"Electricity Consumption", category:"daily",    unit:"MU",        betterHigher:true  },
  { key:"crimeRate",             label:"Crime Rate",              category:"daily",    unit:"per 100k",  betterHigher:false },
  { key:"healthIndex",           label:"Health Index",            category:"daily",    unit:"/100",      betterHigher:true  },
  { key:"internetPenetration",   label:"Internet Penetration",    category:"daily",    unit:"%",         betterHigher:true  },
  { key:"agricultureOutput",     label:"Agriculture Output",      category:"daily",    unit:"index",     betterHigher:true  },
  { key:"tourismCount",          label:"Tourism Count",           category:"daily",    unit:"k visitors",betterHigher:true  },
  { key:"schoolAttendance",      label:"School Attendance",       category:"daily",    unit:"%",         betterHigher:true  },
  { key:"inflationEstimate",     label:"Inflation Estimate",      category:"daily",    unit:"%",         betterHigher:false },
  { key:"waterAvailability",     label:"Water Availability",      category:"daily",    unit:"/100",      betterHigher:true  },
  { key:"industrialOutput",      label:"Industrial Output",       category:"daily",    unit:"index",     betterHigher:true  },
  { key:"roadDevelopmentIndex",  label:"Road Development Index",  category:"daily",    unit:"/100",      betterHigher:true  },
  { key:"urbanizationPercent",   label:"Urbanization %",          category:"daily",    unit:"%",         betterHigher:true  },
  { key:"povertyRate",           label:"Poverty Rate",            category:"daily",    unit:"%",         betterHigher:false },
  { key:"digitalTransactions",   label:"Digital Transactions",    category:"daily",    unit:"mn/day",    betterHigher:true  },
  { key:"bankPenetration",       label:"Bank Penetration",        category:"daily",    unit:"%",         betterHigher:true  },
  { key:"startupCount",          label:"Startup Count",           category:"daily",    unit:"active",    betterHigher:true  },
  { key:"exportContribution",    label:"Export Contribution",     category:"daily",    unit:"%",         betterHigher:true  },
  { key:"population",            label:"Population",              category:"static",   unit:"",          betterHigher:true  },
  { key:"literacyRate",          label:"Literacy Rate",           category:"static",   unit:"%",         betterHigher:true  },
  { key:"area",                  label:"Area",                    category:"static",   unit:"km²",       betterHigher:true  },
  { key:"capital",               label:"Capital",                 category:"static",   unit:"",          betterHigher:true  },
  { key:"hdi",                   label:"HDI",                     category:"static",   unit:"",          betterHigher:true  },
  { key:"sexRatio",              label:"Sex Ratio",               category:"static",   unit:"F/1000M",   betterHigher:true  },
  { key:"language",              label:"Language",                category:"static",   unit:"",          betterHigher:true  },
  { key:"districts",             label:"No. of Districts",        category:"static",   unit:"",          betterHigher:true  },
  { key:"forestCover",           label:"Forest Cover",            category:"static",   unit:"%",         betterHigher:true  },
  { key:"coastlineLength",       label:"Coastline Length",        category:"static",   unit:"km",        betterHigher:true  },
  { key:"formationYear",         label:"Formation Year",          category:"static",   unit:"",          betterHigher:true  },
  { key:"majorIndustries",       label:"Major Industries",        category:"static",   unit:"",          betterHigher:true  },
  { key:"averageIncome",         label:"Average Income",          category:"static",   unit:"₹ lakh",    betterHigher:true  },
  { key:"urbanRuralRatio",       label:"Urban vs Rural Ratio",    category:"static",   unit:"U:R",       betterHigher:true  },
  { key:"educationIndex",        label:"Education Index",         category:"static",   unit:"/100",      betterHigher:true  },
  { key:"healthcareIndex",       label:"Healthcare Index",        category:"static",   unit:"/100",      betterHigher:true  },
  { key:"powerCapacity",         label:"Power Capacity",          category:"static",   unit:"MW",        betterHigher:true  },
  { key:"transportIndex",        label:"Transport Index",         category:"static",   unit:"/100",      betterHigher:true  },
  { key:"connectivityScore",     label:"Connectivity Score",      category:"static",   unit:"/100",      betterHigher:true  },
  { key:"climateZone",           label:"Climate Zone",            category:"static",   unit:"",          betterHigher:true  },
];

/* ── STATES
   Both Andhra Pradesh and Telangana are listed as fully
   independent states (post-2014 bifurcation). 
   ─────────────────────────────────────────────────────── */
const stateCatalog = [
  { name:"Andaman and Nicobar Islands", match:"Andaman and Nicobar", capital:"Port Blair",         lang:"Hindi",     climate:"Tropical Island",       lat:11.6234, lon:92.7265,  base:36  },
  { name:"Andhra Pradesh",                                           capital:"Amaravati",           lang:"Telugu",    climate:"Tropical Wet and Dry",  lat:15.9129, lon:79.7400,  base:68  },
  { name:"Arunachal Pradesh",                                        capital:"Itanagar",            lang:"English",   climate:"Eastern Himalayan",     lat:27.0844, lon:93.6053,  base:37  },
  { name:"Assam",                                                    capital:"Dispur",              lang:"Assamese",  climate:"Humid Subtropical",     lat:26.1433, lon:91.7898,  base:55  },
  { name:"Bihar",                                                    capital:"Patna",               lang:"Hindi",     climate:"Subtropical Monsoon",   lat:25.5941, lon:85.1376,  base:118 },
  { name:"Chandigarh",                                               capital:"Chandigarh",          lang:"Hindi",     climate:"Subtropical",           lat:30.7333, lon:76.7794,  base:84  },
  { name:"Chhattisgarh",                                             capital:"Raipur",              lang:"Hindi",     climate:"Tropical Wet and Dry",  lat:21.2514, lon:81.6296,  base:69  },
  { name:"Dadra and Nagar Haveli",                                   capital:"Silvassa",            lang:"Gujarati",  climate:"Coastal Tropical",      lat:20.2739, lon:73.0087,  base:61  },
  { name:"Daman and Diu",                                            capital:"Daman",               lang:"Gujarati",  climate:"Coastal Tropical",      lat:20.3974, lon:72.8328,  base:58  },
  { name:"Delhi",                                                    capital:"New Delhi",           lang:"Hindi",     climate:"Urban Semi-arid",       lat:28.6139, lon:77.2090,  base:132 },
  { name:"Goa",                                                      capital:"Panaji",              lang:"Konkani",   climate:"Coastal Tropical",      lat:15.4909, lon:73.8278,  base:41  },
  { name:"Gujarat",                                                  capital:"Gandhinagar",         lang:"Gujarati",  climate:"Semi-arid Coastal",     lat:23.2156, lon:72.6369,  base:72  },
  { name:"Haryana",                                                  capital:"Chandigarh",          lang:"Hindi",     climate:"Semi-arid",             lat:29.0588, lon:76.0856,  base:114 },
  { name:"Himachal Pradesh",                                         capital:"Shimla",              lang:"Hindi",     climate:"Temperate Himalayan",   lat:31.1048, lon:77.1734,  base:72  },
  { name:"Jammu and Kashmir",                                        capital:"Srinagar",            lang:"Urdu",      climate:"Mountain Temperate",    lat:34.0837, lon:74.7973,  base:81  },
  { name:"Jharkhand",                                                capital:"Ranchi",              lang:"Hindi",     climate:"Tropical Wet and Dry",  lat:23.3441, lon:85.3096,  base:97  },
  { name:"Karnataka",                                                capital:"Bengaluru",           lang:"Kannada",   climate:"Tropical Savannah",     lat:12.9716, lon:77.5946,  base:79  },
  { name:"Kerala",                                                   capital:"Thiruvananthapuram",  lang:"Malayalam", climate:"Humid Tropical",        lat:8.5241,  lon:76.9366,  base:32  },
  { name:"Lakshadweep",                                              capital:"Kavaratti",           lang:"Malayalam", climate:"Tropical Island",       lat:10.5667, lon:72.6417,  base:28  },
  { name:"Madhya Pradesh",                                           capital:"Bhopal",              lang:"Hindi",     climate:"Subtropical",           lat:23.2599, lon:77.4126,  base:76  },
  { name:"Maharashtra",                                              capital:"Mumbai",              lang:"Marathi",   climate:"Tropical Monsoon",      lat:19.0760, lon:72.8777,  base:84  },
  { name:"Manipur",                                                  capital:"Imphal",              lang:"Manipuri",  climate:"Humid Subtropical",     lat:24.8170, lon:93.9368,  base:52  },
  { name:"Meghalaya",                                                capital:"Shillong",            lang:"English",   climate:"High Rainfall",         lat:25.5788, lon:91.8933,  base:44  },
  { name:"Mizoram",                                                  capital:"Aizawl",              lang:"Mizo",      climate:"Humid Subtropical",     lat:23.7271, lon:92.7176,  base:39  },
  { name:"Nagaland",                                                 capital:"Kohima",              lang:"English",   climate:"Mountain Subtropical",  lat:25.6751, lon:94.1086,  base:49  },
  { name:"Odisha",              match:"Orissa",                      capital:"Bhubaneswar",         lang:"Odia",      climate:"Tropical Savannah",     lat:20.2961, lon:85.8245,  base:67  },
  { name:"Puducherry",                                               capital:"Puducherry",          lang:"Tamil",     climate:"Coastal Tropical",      lat:11.9416, lon:79.8083,  base:48  },
  { name:"Punjab",                                                   capital:"Chandigarh",          lang:"Punjabi",   climate:"Semi-arid",             lat:30.7333, lon:76.7794,  base:92  },
  { name:"Rajasthan",                                                capital:"Jaipur",              lang:"Hindi",     climate:"Arid",                  lat:26.9124, lon:75.7873,  base:101 },
  { name:"Sikkim",                                                   capital:"Gangtok",             lang:"Nepali",    climate:"Alpine Himalayan",      lat:27.3389, lon:88.6065,  base:46  },
  { name:"Tamil Nadu",                                               capital:"Chennai",             lang:"Tamil",     climate:"Tropical Dry",          lat:13.0827, lon:80.2707,  base:58  },
  /* ── TELANGANA: separate state since 2 June 2014 ── */
  { name:"Telangana",                                                capital:"Hyderabad",           lang:"Telugu",    climate:"Semi-arid Tropical",    lat:17.3850, lon:78.4867,  base:77  },
  { name:"Tripura",                                                  capital:"Agartala",            lang:"Bengali",   climate:"Humid Subtropical",     lat:23.8315, lon:91.2868,  base:47  },
  { name:"Uttar Pradesh",                                            capital:"Lucknow",             lang:"Hindi",     climate:"Subtropical Monsoon",   lat:26.8467, lon:80.9462,  base:128 },
  { name:"Uttarakhand",         match:"Uttaranchal",                 capital:"Dehradun",            lang:"Hindi",     climate:"Mountain Temperate",    lat:30.3165, lon:78.0322,  base:63  },
  { name:"West Bengal",                                              capital:"Kolkata",             lang:"Bengali",   climate:"Tropical Wet-Dry",      lat:22.5726, lon:88.3639,  base:88  },
];

/* ── HELPERS ── */
const metricMap    = Object.fromEntries(metrics.map(m => [m.key, m]));
const stateLookup  = new Map();
const stateAlias   = new Map();
const numFmt       = new Intl.NumberFormat("en-IN");
const profileOnlyMetricKeys = new Set(["weatherCondition", "capital", "language", "majorIndustries", "urbanRuralRatio", "climateZone"]);
const realtimeKeys = metrics.filter(m => m.category === "realtime").map(m => m.key);
const dailyKeys    = metrics.filter(m => m.category === "daily").map(m => m.key);
const staticKeys   = [
  "population",
  "literacyRate",
  "area",
  "capital",
  "sexRatio",
  "language",
  "districts",
  "coastlineLength",
  "formationYear",
  "majorIndustries",
  "climateZone",
];

function seededNoise(seed) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

function normName(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/* ── MOCK DATA ── */
function makeMockMetrics(state, idx) {
  const s = idx + 1;
  const b = state.base;
  const pop = Math.round((b * 1.2 + 20 + s * 0.8) * 1_000_000);
  return {
    temperature:            +(24 + seededNoise(s)      * 12).toFixed(1),
    airQuality:             b,
    rainfall:               +(seededNoise(s+1)          * 22).toFixed(1),
    humidity:               Math.round(45 + seededNoise(s+2)  * 48),
    windSpeed:              +(8  + seededNoise(s+3)    * 22).toFixed(1),
    uvIndex:                +(2  + seededNoise(s+4)    * 8).toFixed(1),
    fireData:               Math.round(seededNoise(s+5) * 24),
    aqiAlerts:              Math.max(0, Math.floor((b-50)/60)),
    weatherCondition:       ["Clear","Partly Cloudy","Cloudy","Rain Showers"][Math.floor(seededNoise(s+6)*4)],
    cloudCoverage:          Math.round(15 + seededNoise(s+7)  * 80),
    gdp:                    +(2  + seededNoise(s+8)    * 12).toFixed(2),
    unemploymentRate:       +(3  + seededNoise(s+9)    * 12).toFixed(1),
    fuelPrice:              +(94 + seededNoise(s+10)   * 18).toFixed(1),
    electricityConsumption: +(400+ seededNoise(s+11)   * 2200).toFixed(0),
    crimeRate:              +(60 + seededNoise(s+12)   * 150).toFixed(0),
    healthIndex:            +(52 + seededNoise(s+13)   * 42).toFixed(1),
    internetPenetration:    +(38 + seededNoise(s+14)   * 55).toFixed(1),
    agricultureOutput:      +(34 + seededNoise(s+15)   * 60).toFixed(1),
    tourismCount:           +(30 + seededNoise(s+16)   * 900).toFixed(0),
    schoolAttendance:       +(62 + seededNoise(s+17)   * 34).toFixed(1),
    inflationEstimate:      +(3.2+ seededNoise(s+18)   * 4.4).toFixed(1),
    waterAvailability:      +(36 + seededNoise(s+19)   * 55).toFixed(1),
    industrialOutput:       +(38 + seededNoise(s+20)   * 58).toFixed(1),
    roadDevelopmentIndex:   +(40 + seededNoise(s+21)   * 52).toFixed(1),
    urbanizationPercent:    +(26 + seededNoise(s+22)   * 48).toFixed(1),
    povertyRate:            +(4  + seededNoise(s+23)   * 24).toFixed(1),
    digitalTransactions:    +(2  + seededNoise(s+24)   * 135).toFixed(1),
    bankPenetration:        +(44 + seededNoise(s+25)   * 48).toFixed(1),
    startupCount:           Math.round(50 + seededNoise(s+26) * 12000),
    exportContribution:     +(0.2+ seededNoise(s+27)   * 18).toFixed(2),
    population:             pop,
    literacyRate:           +(61 + seededNoise(s+28)   * 35).toFixed(1),
    area:                   Math.round(5000 + seededNoise(s+29) * 320000),
    capital:                state.capital,
    hdi:                    +(0.58+seededNoise(s+30)   * 0.24).toFixed(2),
    sexRatio:               Math.round(860 + seededNoise(s+31) * 220),
    language:               state.lang,
    districts:              Math.round(8 + seededNoise(s+32) * 60),
    forestCover:            +(4  + seededNoise(s+33)   * 75).toFixed(1),
    coastlineLength:        Math.round(seededNoise(s+34) * 1100),
    formationYear:          Math.round(1947 + seededNoise(s+35) * 70),
    majorIndustries:        ["IT","Tourism","Agriculture","Manufacturing","Mining"][Math.floor(seededNoise(s+36)*5)],
    averageIncome:          +(1.1+ seededNoise(s+37)   * 3.2).toFixed(2),
    urbanRuralRatio:        `${(0.4+seededNoise(s+38)*1.4).toFixed(2)}:1`,
    educationIndex:         +(54 + seededNoise(s+39)   * 40).toFixed(1),
    healthcareIndex:        +(51 + seededNoise(s+40)   * 39).toFixed(1),
    powerCapacity:          Math.round(300 + seededNoise(s+41) * 45000),
    transportIndex:         +(42 + seededNoise(s+42)   * 48).toFixed(1),
    connectivityScore:      +(45 + seededNoise(s+43)   * 47).toFixed(1),
    climateZone:            state.climate,
  };
}

const staticProfiles = {
  "Andaman and Nicobar Islands": { population:380581, literacyRate:86.6, area:8249, capital:"Port Blair", language:"Hindi, English", sexRatio:876, districts:3, coastlineLength:1962, formationYear:1956, majorIndustries:"Tourism, fisheries, shipping", climateZone:"Tropical island" },
  "Andhra Pradesh": { population:49386799, literacyRate:67.4, area:162975, capital:"Amaravati", language:"Telugu", sexRatio:997, districts:26, coastlineLength:974, formationYear:1953, majorIndustries:"Agriculture, pharmaceuticals, ports, IT", climateZone:"Tropical wet and dry" },
  "Arunachal Pradesh": { population:1383727, literacyRate:65.4, area:83743, capital:"Itanagar", language:"English", sexRatio:938, districts:26, coastlineLength:0, formationYear:1987, majorIndustries:"Hydropower, horticulture, tourism", climateZone:"Eastern Himalayan" },
  "Assam": { population:31205576, literacyRate:72.2, area:78438, capital:"Dispur", language:"Assamese", sexRatio:958, districts:35, coastlineLength:0, formationYear:1950, majorIndustries:"Tea, oil, gas, agriculture", climateZone:"Humid subtropical" },
  "Bihar": { population:104099452, literacyRate:61.8, area:94163, capital:"Patna", language:"Hindi", sexRatio:918, districts:38, coastlineLength:0, formationYear:1912, majorIndustries:"Agriculture, food processing, textiles", climateZone:"Subtropical monsoon" },
  "Chandigarh": { population:1055450, literacyRate:86.0, area:114, capital:"Chandigarh", language:"English, Hindi, Punjabi", sexRatio:818, districts:1, coastlineLength:0, formationYear:1966, majorIndustries:"Services, administration, IT", climateZone:"Subtropical" },
  "Chhattisgarh": { population:25545198, literacyRate:70.3, area:135192, capital:"Raipur", language:"Hindi", sexRatio:991, districts:33, coastlineLength:0, formationYear:2000, majorIndustries:"Steel, power, mining, cement", climateZone:"Tropical wet and dry" },
  "Dadra and Nagar Haveli": { population:343709, literacyRate:76.2, area:491, capital:"Silvassa", language:"Gujarati, Hindi", sexRatio:774, districts:1, coastlineLength:0, formationYear:1961, majorIndustries:"Manufacturing, textiles, plastics", climateZone:"Coastal tropical" },
  "Daman and Diu": { population:243247, literacyRate:87.1, area:112, capital:"Daman", language:"Gujarati, Hindi", sexRatio:618, districts:2, coastlineLength:42, formationYear:1987, majorIndustries:"Tourism, fishing, manufacturing", climateZone:"Coastal tropical" },
  "Delhi": { population:16787941, literacyRate:86.2, area:1483, capital:"New Delhi", language:"Hindi, English", sexRatio:868, districts:11, coastlineLength:0, formationYear:1956, majorIndustries:"Services, IT, trade, government", climateZone:"Urban semi-arid" },
  "Goa": { population:1458545, literacyRate:88.7, area:3702, capital:"Panaji", language:"Konkani", sexRatio:973, districts:2, coastlineLength:160, formationYear:1987, majorIndustries:"Tourism, mining, pharmaceuticals", climateZone:"Coastal tropical" },
  "Gujarat": { population:60439692, literacyRate:78.0, area:196244, capital:"Gandhinagar", language:"Gujarati", sexRatio:919, districts:33, coastlineLength:1600, formationYear:1960, majorIndustries:"Petrochemicals, textiles, ports, gems", climateZone:"Semi-arid coastal" },
  "Haryana": { population:25351462, literacyRate:75.6, area:44212, capital:"Chandigarh", language:"Hindi", sexRatio:879, districts:22, coastlineLength:0, formationYear:1966, majorIndustries:"Automobiles, agriculture, IT services", climateZone:"Semi-arid" },
  "Himachal Pradesh": { population:6864602, literacyRate:82.8, area:55673, capital:"Shimla", language:"Hindi", sexRatio:972, districts:12, coastlineLength:0, formationYear:1971, majorIndustries:"Tourism, horticulture, hydropower", climateZone:"Temperate Himalayan" },
  "Jammu and Kashmir": { population:12267032, literacyRate:67.2, area:42241, capital:"Srinagar / Jammu", language:"Kashmiri, Dogri, Urdu, Hindi, English", sexRatio:889, districts:20, coastlineLength:0, formationYear:2019, majorIndustries:"Tourism, horticulture, handicrafts", climateZone:"Mountain temperate" },
  "Jharkhand": { population:32988134, literacyRate:66.4, area:79716, capital:"Ranchi", language:"Hindi", sexRatio:948, districts:24, coastlineLength:0, formationYear:2000, majorIndustries:"Mining, steel, power, forests", climateZone:"Tropical wet and dry" },
  "Karnataka": { population:61095297, literacyRate:75.4, area:191791, capital:"Bengaluru", language:"Kannada", sexRatio:973, districts:31, coastlineLength:320, formationYear:1956, majorIndustries:"IT, aerospace, biotechnology, manufacturing", climateZone:"Tropical savanna" },
  "Kerala": { population:33406061, literacyRate:94.0, area:38852, capital:"Thiruvananthapuram", language:"Malayalam", sexRatio:1084, districts:14, coastlineLength:590, formationYear:1956, majorIndustries:"Tourism, remittances, spices, IT", climateZone:"Humid tropical" },
  "Lakshadweep": { population:64473, literacyRate:91.8, area:32, capital:"Kavaratti", language:"Malayalam, English", sexRatio:946, districts:1, coastlineLength:132, formationYear:1956, majorIndustries:"Fisheries, coconut, tourism", climateZone:"Tropical island" },
  "Madhya Pradesh": { population:72626809, literacyRate:69.3, area:308252, capital:"Bhopal", language:"Hindi", sexRatio:931, districts:55, coastlineLength:0, formationYear:1956, majorIndustries:"Agriculture, mining, textiles, auto", climateZone:"Subtropical" },
  "Maharashtra": { population:112374333, literacyRate:82.3, area:307713, capital:"Mumbai", language:"Marathi", sexRatio:929, districts:36, coastlineLength:720, formationYear:1960, majorIndustries:"Finance, automobiles, IT, entertainment", climateZone:"Tropical monsoon" },
  "Manipur": { population:2855794, literacyRate:76.9, area:22327, capital:"Imphal", language:"Meitei", sexRatio:985, districts:16, coastlineLength:0, formationYear:1972, majorIndustries:"Handlooms, agriculture, tourism", climateZone:"Humid subtropical" },
  "Meghalaya": { population:2966889, literacyRate:74.4, area:22429, capital:"Shillong", language:"English", sexRatio:989, districts:12, coastlineLength:0, formationYear:1972, majorIndustries:"Tourism, limestone, agriculture", climateZone:"High rainfall subtropical" },
  "Mizoram": { population:1097206, literacyRate:91.3, area:21081, capital:"Aizawl", language:"Mizo, English", sexRatio:976, districts:11, coastlineLength:0, formationYear:1987, majorIndustries:"Bamboo, horticulture, handloom", climateZone:"Humid subtropical" },
  "Nagaland": { population:1978502, literacyRate:79.6, area:16579, capital:"Kohima", language:"English", sexRatio:931, districts:16, coastlineLength:0, formationYear:1963, majorIndustries:"Agriculture, handloom, tourism", climateZone:"Mountain subtropical" },
  "Odisha": { population:41974218, literacyRate:72.9, area:155707, capital:"Bhubaneswar", language:"Odia", sexRatio:979, districts:30, coastlineLength:485, formationYear:1936, majorIndustries:"Mining, steel, ports, power", climateZone:"Tropical savanna" },
  "Puducherry": { population:1247953, literacyRate:85.8, area:479, capital:"Puducherry", language:"Tamil, English", sexRatio:1037, districts:4, coastlineLength:45, formationYear:1962, majorIndustries:"Tourism, education, light manufacturing", climateZone:"Coastal tropical" },
  "Punjab": { population:27743338, literacyRate:75.8, area:50362, capital:"Chandigarh", language:"Punjabi", sexRatio:895, districts:23, coastlineLength:0, formationYear:1966, majorIndustries:"Agriculture, textiles, sports goods", climateZone:"Semi-arid" },
  "Rajasthan": { population:68548437, literacyRate:66.1, area:342239, capital:"Jaipur", language:"Hindi", sexRatio:928, districts:50, coastlineLength:0, formationYear:1949, majorIndustries:"Tourism, mining, textiles, gems", climateZone:"Arid" },
  "Sikkim": { population:610577, literacyRate:81.4, area:7096, capital:"Gangtok", language:"Nepali, English", sexRatio:890, districts:6, coastlineLength:0, formationYear:1975, majorIndustries:"Tourism, organic farming, hydropower", climateZone:"Alpine Himalayan" },
  "Tamil Nadu": { population:72147030, literacyRate:80.1, area:130060, capital:"Chennai", language:"Tamil", sexRatio:996, districts:38, coastlineLength:1076, formationYear:1956, majorIndustries:"Automobiles, textiles, IT, electronics", climateZone:"Tropical dry" },
  "Telangana": { population:35193978, literacyRate:66.5, area:112077, capital:"Hyderabad", language:"Telugu, Urdu", sexRatio:988, districts:33, coastlineLength:0, formationYear:2014, majorIndustries:"IT, pharmaceuticals, aerospace, agriculture", climateZone:"Semi-arid tropical" },
  "Tripura": { population:3673917, literacyRate:87.2, area:10486, capital:"Agartala", language:"Bengali, Kokborok", sexRatio:960, districts:8, coastlineLength:0, formationYear:1972, majorIndustries:"Rubber, bamboo, tea, handloom", climateZone:"Humid subtropical" },
  "Uttar Pradesh": { population:199812341, literacyRate:67.7, area:240928, capital:"Lucknow", language:"Hindi", sexRatio:912, districts:75, coastlineLength:0, formationYear:1950, majorIndustries:"Agriculture, textiles, leather, electronics", climateZone:"Subtropical monsoon" },
  "Uttarakhand": { population:10086292, literacyRate:78.8, area:53483, capital:"Dehradun", language:"Hindi", sexRatio:963, districts:13, coastlineLength:0, formationYear:2000, majorIndustries:"Tourism, hydropower, pharmaceuticals", climateZone:"Mountain temperate" },
  "West Bengal": { population:91276115, literacyRate:76.3, area:88752, capital:"Kolkata", language:"Bengali", sexRatio:950, districts:23, coastlineLength:210, formationYear:1950, majorIndustries:"Tea, jute, IT, ports, steel", climateZone:"Tropical wet-dry" },
};

const officialGdpProfiles = {
  "Andaman and Nicobar Islands": { gdp:0.12, gdpYear:"2023-24" },
  "Andhra Pradesh": { gdp:15.93, gdpYear:"2024-25" },
  "Arunachal Pradesh": { gdp:0.44, gdpYear:"2024-25" },
  "Assam": { gdp:6.44, gdpYear:"2024-25" },
  "Bihar": { gdp:9.92, gdpYear:"2024-25" },
  "Chandigarh": { gdp:0.63, gdpYear:"2023-24" },
  "Chhattisgarh": { gdp:5.68, gdpYear:"2024-25" },
  "Dadra and Nagar Haveli": { gdp:null, gdpYear:"NA" },
  "Daman and Diu": { gdp:null, gdpYear:"NA" },
  "Delhi": { gdp:12.15, gdpYear:"2024-25" },
  "Goa": { gdp:1.07, gdpYear:"2023-24" },
  "Gujarat": { gdp:22.03, gdpYear:"2022-23" },
  "Haryana": { gdp:12.14, gdpYear:"2024-25" },
  "Himachal Pradesh": { gdp:2.32, gdpYear:"2024-25" },
  "Jammu and Kashmir": { gdp:2.62, gdpYear:"2024-25" },
  "Jharkhand": { gdp:5.16, gdpYear:"2024-25" },
  "Karnataka": { gdp:28.84, gdpYear:"2024-25" },
  "Kerala": { gdp:12.49, gdpYear:"2024-25" },
  "Lakshadweep": { gdp:null, gdpYear:"NA" },
  "Madhya Pradesh": { gdp:15.03, gdpYear:"2024-25" },
  "Maharashtra": { gdp:45.32, gdpYear:"2024-25" },
  "Manipur": { gdp:0.43, gdpYear:"2023-24" },
  "Meghalaya": { gdp:0.60, gdpYear:"2024-25" },
  "Mizoram": { gdp:0.33, gdpYear:"2023-24" },
  "Nagaland": { gdp:0.40, gdpYear:"2023-24" },
  "Odisha": { gdp:8.90, gdpYear:"2024-25" },
  "Puducherry": { gdp:0.52, gdpYear:"2024-25" },
  "Punjab": { gdp:8.39, gdpYear:"2024-25" },
  "Rajasthan": { gdp:17.04, gdpYear:"2024-25" },
  "Sikkim": { gdp:0.49, gdpYear:"2023-24" },
  "Tamil Nadu": { gdp:31.19, gdpYear:"2024-25" },
  "Telangana": { gdp:16.41, gdpYear:"2024-25" },
  "Tripura": { gdp:0.90, gdpYear:"2024-25" },
  "Uttar Pradesh": { gdp:29.78, gdpYear:"2024-25" },
  "Uttarakhand": { gdp:3.78, gdpYear:"2024-25" },
  "West Bengal": { gdp:18.15, gdpYear:"2024-25" },
};

/* Populate lookup */
stateCatalog.forEach((state, idx) => {
  const profile = staticProfiles[state.name] || {};
  const gdpProfile = officialGdpProfiles[state.name] || {};
  state.capital = profile.capital || state.capital;
  state.lang = profile.language || state.lang;
  state.climate = profile.climateZone || state.climate;
  state.metrics = { ...makeMockMetrics(state, idx), ...profile, ...gdpProfile };
  stateLookup.set(state.name, state);
  stateAlias.set(normName(state.name), state.name);
  if (state.match) stateAlias.set(normName(state.match), state.name);
});

/* ── APP STATE ── */
const appState = {
  selectedMetric:  "airQuality",
  selectedType:    "all",
  selectedState:   "Uttar Pradesh",
  analysisState:   "Uttar Pradesh",
  activeNews:      null,
  newsItems:       [],
  refreshSeconds:  299,
  zoomLevel:       1,
  theme:           localStorage.getItem("ii-theme") || "light",
};

/* ── DOM REFS ── */
const $id = id => document.getElementById(id);
const metricSelect    = $id("metricSelect");
const typeChips       = $id("typeChips");
const topStatesList   = $id("topStatesList");
const rankSubtitle    = $id("rankingSubtitle");
const insightText     = $id("aiInsightText");
const insightMetrics  = $id("insightMetrics");
const analysisStateSelect = $id("analysisStateSelect");
const newsSummary     = $id("newsSummary");
const newsList        = $id("newsList");
const newsAnalysis    = $id("newsAnalysis");
const newsRefresh     = $id("newsRefresh");
const newsModal       = $id("newsModal");
const newsModalTitle  = $id("newsModalTitle");
const newsModalSource = $id("newsModalSource");
const newsModalAnalysis = $id("newsModalAnalysis");
const newsModalLink   = $id("newsModalLink");
const searchButton    = $id("searchButton");
const aiChatToggle    = $id("aiChatToggle");
const aiChatPanel     = $id("aiChatPanel");
const aiChatForm      = $id("aiChatForm");
const aiChatInput     = $id("aiChatInput");
const aiChatLog       = $id("aiChatLog");
const pulseLeader     = $id("pulseLeader");
const pulseAverage    = $id("pulseAverage");
const pulseWatch      = $id("pulseWatch");
const statStrip       = $id("statStrip");
const searchInput     = $id("searchInput");
const tooltipState    = $id("tooltipState");
const tooltipMetric   = $id("tooltipMetric");
const tooltipValue    = $id("tooltipValue");
const tooltipStatus   = $id("tooltipStatus");
const mapTooltip      = $id("mapTooltip");
const mapStage        = $id("mapStage");
const legendTitle     = $id("legendTitle");
const refreshCounter  = $id("refreshCounter");
const themeLabel      = $id("themeLabel");
const themeIcon       = $id("themeIcon");
const toast           = $id("toast");
const drawer          = $id("detailsDrawer");
const overlay         = $id("overlay");
const indiaMap        = $id("indiaMap");

let ttRAF = 0;
let pendingTTEvent = null;

/* ══════════════════════════════════════
   MAP SETUP
   ══════════════════════════════════════ */
const geojson            = window.INDIA_STATE_GEOJSON;
const outlineGeoJson     = window.INDIA_OFFICIAL_OUTLINE_GEOJSON;
const API_BASE = (() => {
  const { protocol, hostname, port } = window.location;
  const localStaticHost = protocol === "file:" || ((hostname === "127.0.0.1" || hostname === "localhost") && port && port !== "3000");
  return localStaticHost ? "http://127.0.0.1:3000" : "";
})();
const apiUrl = path => `${API_BASE}${path}`;

/* 
  TELANGANA GeoJSON DETECTION:
  Check which NAME_1 values exist in the GeoJSON.
  If "Telangana" is present → map it normally.
  If only "Andhra Pradesh" exists (old unified polygon) →
    alias that polygon to "Andhra Pradesh" and add a
    synthetic "Telangana" entry pointing to the same polygon
    but with slightly different data coloring via a CSS trick.
*/
const geojsonStateNames = new Set(
  geojson.features.map(f => normName(f.properties.NAME_1 || ""))
);

const hasTelanganaInGeoJSON = geojsonStateNames.has("telangana");

// Build features array with correct name mapping
const features = geojson.features.map(feature => {
  const srcName  = feature.properties.NAME_1 || "";
  const normSrc  = normName(srcName);

  // If GeoJSON has no Telangana polygon, map "Andhra Pradesh" to itself
  // Telangana will be handled as a tooltip-only entry for the same polygon
  let mappedName = stateAlias.get(normSrc) || srcName;

  return { ...feature, _stateName: mappedName, _state: stateLookup.get(mappedName) };
});

const outlineRings = outlineGeoJson.features[0].geometry.coordinates.map(poly => poly[0]);

/* Bounds calculation */
function getMapBounds() {
  const b = { minLon:Infinity, maxLon:-Infinity, minLat:Infinity, maxLat:-Infinity };
  const expandCoord = ([lon,lat]) => {
    b.minLon = Math.min(b.minLon,lon); b.maxLon = Math.max(b.maxLon,lon);
    b.minLat = Math.min(b.minLat,lat); b.maxLat = Math.max(b.maxLat,lat);
  };
  const walk = coords => {
    if (typeof coords[0] === "number") { expandCoord(coords); return; }
    coords.forEach(walk);
  };
  features.forEach(f => walk(f.geometry.coordinates));
  outlineRings.forEach(ring => ring.forEach(expandCoord));
  return b;
}

function fitProjection(proj, b, [[x0,y0],[x1,y1]]) {
  const raw = d3.geoMercator().scale(1).translate([0,0]);
  const [px0,py0] = raw([b.minLon, b.maxLat]);
  const [px1,py1] = raw([b.maxLon, b.minLat]);
  const W = x1-x0, H = y1-y0;
  const sc = Math.min(W/(px1-px0), H/(py1-py0));
  proj.scale(sc).translate([
    x0 + (W - sc*(px1-px0))/2 - sc*px0,
    y0 + (H - sc*(py1-py0))/2 - sc*py0,
  ]);
}

const projection = d3.geoMercator();
fitProjection(projection, getMapBounds(), [[56,24],[590,736]]);
const geoPath = d3.geoPath(projection);
if (typeof geoPath.digits === "function") geoPath.digits(1);

const svg       = d3.select(indiaMap);
const mapLayer  = svg.append("g").attr("class","map-layer");

function outlinePathD() {
  return outlineRings.map(ring =>
    ring.map(([lon,lat], i) => {
      const [px,py] = projection([lon,lat]);
      return `${i===0?"M":"L"}${px.toFixed(1)},${py.toFixed(1)}`;
    }).join(" ") + "Z"
  ).join(" ");
}

const officialFill   = mapLayer.append("path").attr("class","india-official-fill").attr("d", outlinePathD());
const statePaths     = mapLayer.selectAll(".state-feature").data(features).enter().append("path")
  .attr("class","state-feature")
  .attr("data-state", d => d._stateName)
  .attr("d", geoPath);
const officialStroke = mapLayer.append("path").attr("class","india-official-outline").attr("d", outlinePathD());

/* ── FORMATTERS ── */
function fmtVal(m, v) {
  if (v == null) return "N/A";
  if (typeof v === "string") return v;
  if (m.key === "population") return numFmt.format(v);
  if (m.key === "gdp") return `₹ ${v} lakh cr`;
  return m.unit ? `${v} ${m.unit}`.trim() : String(v);
}

function fmtCompact(v) {
  const n = Number(v);
  if (!isFinite(n)) return "N/A";
  if (Math.abs(n) >= 1e7) return `${+(n/1e7).toFixed(2)} cr`;
  if (Math.abs(n) >= 1e5) return `${+(n/1e5).toFixed(2)} lakh`;
  return numFmt.format(Math.round(n*10)/10);
}

function fmtStat(m, v) {
  if (v == null) return "N/A";
  if (typeof v === "string") return v;
  if (["population","area","startupCount"].includes(m.key)) return fmtCompact(v);
  if (m.key === "gdp") return `₹${Number(v).toFixed(2)} lakh cr`;
  return fmtVal(m, Math.round(Number(v)*10)/10);
}

function shortName(n) {
  const c = {
    "Andaman and Nicobar Islands": "Andaman & Nicobar",
    "Jammu and Kashmir":           "J&K / Ladakh",
    "Dadra and Nagar Haveli":      "Dadra & N.Haveli",
  };
  return c[n] || n;
}

function statusText(m, v) {
  if (m.key === "airQuality") {
    if (v<=50)  return "Good";
    if (v<=100) return "Moderate";
    if (v<=150) return "Unhealthy for Sensitive";
    if (v<=200) return "Unhealthy";
    if (v<=300) return "Very Unhealthy";
    return "Hazardous";
  }
  if (m.key === "temperature") return v>35 ? "High Heat" : v<18 ? "Cool" : "Comfortable";
  if (m.key === "humidity")    return v>75 ? "Humid" : "Balanced";
  return "Stable";
}

/* ── COLOR ── */
function hexLerp(a, b, t) {
  const p = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
  const [r1,g1,b1] = p(a);
  const [r2,g2,b2] = p(b);
  const l = (x,y) => Math.round(x+(y-x)*t);
  return "#"+[l(r1,r2),l(g1,g2),l(b1,b2)].map(v=>v.toString(16).padStart(2,"0")).join("");
}

const PALETTE = ["#ff4769","#ff9d21","#ffe06a","#94def7","#6ba7ff","#7e72ff"];

function valToColor(m, v, mn, mx) {
  if (v == null || v === "" || v === "NA" || !isFinite(Number(v))) return "#94def7";
  const ratio    = mx===mn ? 0.5 : (Number(v)-mn)/(mx-mn);
  const adjusted = m.betterHigher ? ratio : 1-ratio;
  const c        = Math.max(0, Math.min(1, adjusted));
  const idx      = c*(PALETTE.length-1);
  const lo = Math.floor(idx), hi = Math.min(lo+1, PALETTE.length-1);
  return hexLerp(PALETTE[lo], PALETTE[hi], idx-lo);
}

/* ── SELECTORS ── */
const getM     = () => metricMap[appState.selectedMetric];
const getVal   = (state, key) => state.metrics[key];
const getVis   = () => (appState.selectedType==="all" ? metrics : metrics.filter(m=>m.category===appState.selectedType))
  .filter(m => !profileOnlyMetricKeys.has(m.key));
const metricNumber = (state, key) => {
  const value = getVal(state, key);
  if (value == null || value === "" || value === "NA") return NaN;
  return Number(value);
};

function getSorted() {
  const m = getM();
  return [...stateCatalog].sort((a,b) => {
    const va = metricNumber(a,m.key), vb = metricNumber(b,m.key);
    if (!isFinite(va) && !isFinite(vb)) return a.name.localeCompare(b.name);
    if (!isFinite(va)) return 1;
    if (!isFinite(vb)) return -1;
    return m.betterHigher ? vb-va : va-vb;
  });
}

/* ── RENDERERS ── */
function fillMetricSelect() {
  const vis = getVis();
  metricSelect.innerHTML = vis.map(m =>
    `<option value="${m.key}"${m.key===appState.selectedMetric?" selected":""}>${m.label}</option>`
  ).join("");
  if (!vis.some(m=>m.key===appState.selectedMetric)) {
    appState.selectedMetric = vis[0].key;
    metricSelect.value = appState.selectedMetric;
  }
}

function fillAnalysisStateSelect() {
  if (!analysisStateSelect) return;
  analysisStateSelect.innerHTML = stateCatalog.map(s =>
    `<option value="${s.name}"${s.name===appState.analysisState?" selected":""}>${s.name}</option>`
  ).join("");
}

function renderTopStates() {
  const m   = getM();
  const top = getSorted().slice(0,5);
  rankSubtitle.textContent = `By ${m.label}`;

  topStatesList.innerHTML = top.map((s,i) => {
    const v = getVal(s, m.key);
    const c = valToColor(m, v, 0, 300);
    return `<button class="rank-item" data-state-row="${s.name}" type="button">
      <div class="rank-left">
        <span class="rank-num">${i+1}</span>
        <span class="rank-name">${shortName(s.name)}</span>
      </div>
      <span class="rank-score" style="color:${c};background:${c}1a">${fmtVal(m,v)}</span>
    </button>`;
  }).join("");
}

function renderPulseCard() {
  if (!pulseLeader || !pulseAverage || !pulseWatch) return;
  const m = getM();
  const sorted = getSorted();
  const nums = stateCatalog.map(s => metricNumber(s,m.key)).filter(isFinite);
  const avg = nums.reduce((a,v)=>a+v,0) / Math.max(nums.length,1);
  pulseLeader.textContent = shortName(sorted[0].name);
  pulseAverage.textContent = fmtStat(m, avg);
  pulseWatch.textContent = shortName(sorted.at(-1).name);
}

function renderInsight() {
  if (appState.activeNews) {
    const analysis = buildNewsAnalysis(appState.activeNews);
    if (insightMetrics) {
      const topic = inferNewsTopic(appState.activeNews.title);
      insightMetrics.innerHTML = `
        <span><small>Signal</small><strong>${escapeHTML(topic)}</strong></span>
        <span><small>State</small><strong>${escapeHTML(inferNewsState(appState.activeNews.title))}</strong></span>
        <span><small>Source</small><strong>${escapeHTML(appState.activeNews.source || "GDELT")}</strong></span>
        <span><small>Mode</small><strong>News brief</strong></span>
      `;
    }
    insightText.textContent = analysis;
    if (newsAnalysis) newsAnalysis.textContent = analysis;
    return;
  }

  const m = getM();
  const sorted = getSorted();
  const state = stateLookup.get(appState.analysisState) || stateLookup.get(appState.selectedState) || sorted[0];
  appState.analysisState = state.name;
  if (analysisStateSelect) analysisStateSelect.value = state.name;

  const rank = sorted.findIndex(s => s.name === state.name) + 1;
  const value = getVal(state, m.key);
  const nums = stateCatalog.map(s => metricNumber(s,m.key)).filter(isFinite);
  const avg = nums.reduce((a,v)=>a+v,0) / Math.max(nums.length,1);
  const numericValue = metricNumber(state, m.key);
  const direction = !isFinite(numericValue) ? "not available in the latest official table" : m.betterHigher
    ? numericValue >= avg ? "above the national average" : "below the national average"
    : numericValue <= avg ? "better than the national average" : "needs closer monitoring";
  const topState = sorted[0];
  const delta = numericValue - avg;
  const gapText = Number.isFinite(delta)
    ? `${delta >= 0 ? "+" : ""}${fmtStat(m, delta)} vs avg`
    : "Profile field";

  if (insightMetrics) {
    insightMetrics.innerHTML = `
      <span><small>Rank</small><strong>#${rank}</strong></span>
      <span><small>${escapeHTML(m.key === "airQuality" ? "AQI" : "Metric")}</small><strong>${escapeHTML(fmtStat(m, value))}</strong></span>
      <span><small>Average</small><strong>${escapeHTML(fmtStat(m, avg))}</strong></span>
      <span><small>Gap</small><strong>${escapeHTML(gapText)}</strong></span>
    `;
  }

  insightText.textContent =
    `${state.name} ranks #${rank} for ${m.label.toLowerCase()} with ${fmtVal(m,value)}, ${direction}. ` +
    `${topState.name} leads the current view, so the main read is the gap between ${state.name}'s profile and the strongest state on this signal. ` +
    `Open the full state profile for real-time signals, modeled indicators, and official profile facts.`;
  return;
  const s = getSorted();
  const top3 = s.slice(0,3).map(x=>x.name).join(", ");
  const bot  = s.at(-1).name;
  insightText.textContent =
    `${top3} lead nationally on ${m.label.toLowerCase()}. ` +
    `${bot} trails and may need targeted intervention. ` +
    `Simulated intelligence — backend AI integration pending.`;
}

function renderStats() {
  const m    = getM();
  const s    = getSorted();
  const nums = stateCatalog.map(x=>metricNumber(x,m.key)).filter(isFinite);
  const avg  = nums.reduce((a,v)=>a+v,0) / Math.max(nums.length,1);

  const cards = [
    { lbl:`Average ${m.key==="airQuality"?"AQI":m.label}`, val:fmtStat(m,avg),                  note:statusText(m,avg),           spark:"linear-gradient(90deg,transparent 8%,#f59e0b 8%,#f59e0b 20%,transparent 20%,transparent 38%,#f59e0b 38%,#f59e0b 55%,transparent 55%,transparent 72%,#f59e0b 72%,#f59e0b 88%,transparent 88%)" },
    { lbl:"Best State",      val:shortName(s[0].name),                   note:fmtStat(m,getVal(s[0],m.key)), spark:"linear-gradient(90deg,transparent 10%,#10b981 10%,#10b981 24%,transparent 24%,transparent 42%,#10b981 42%,#10b981 58%,transparent 58%,transparent 76%,#10b981 76%,#10b981 90%,transparent 90%)" },
    { lbl:"Needs Attention", val:shortName(s.at(-1).name),               note:fmtStat(m,getVal(s.at(-1),m.key)), spark:"linear-gradient(90deg,transparent 10%,#ef4444 10%,#ef4444 24%,transparent 24%,transparent 42%,#ef4444 42%,#ef4444 58%,transparent 58%,transparent 76%,#ef4444 76%,#ef4444 90%,transparent 90%)" },
    { lbl:"States Covered",  val:String(stateCatalog.length),             note:"states and UTs",              spark:"linear-gradient(90deg,#6ba7ff 0%,#6ba7ff 94%,var(--surface3) 94%)" },
    { lbl:"Data Source",     val:"GeoJSON",                               note:"state boundaries",          spark:"linear-gradient(90deg,#7e72ff,#22d3ee)" },
  ];

  statStrip.innerHTML = cards.map(c => `
    <article class="stat-card">
      <div class="stat-lbl">${c.lbl}</div>
      <div class="stat-val">${c.val}</div>
      <div class="stat-note">${c.note}</div>
      <div class="stat-spark" style="background-image:${c.spark}"></div>
    </article>`).join("");
}

/* ── MAP ── */
function updateTooltip(stateName) {
  const state  = stateLookup.get(stateName) || stateCatalog[0];
  const m      = getM();
  const v      = getVal(state, m.key);
  tooltipState.textContent  = state.name;
  tooltipMetric.textContent = m.label;
  tooltipValue.textContent  = fmtVal(m, v);
  tooltipStatus.textContent = isFinite(metricNumber(state, m.key)) ? statusText(m, metricNumber(state, m.key)) : "Not available";
}

function moveTooltip(e) {
  pendingTTEvent = e;
  if (ttRAF) return;
  ttRAF = requestAnimationFrame(() => {
    ttRAF = 0;
    const ev = pendingTTEvent;
    if (!ev) return;
    const r  = mapStage.getBoundingClientRect();
    const tw = mapTooltip.offsetWidth  || 162;
    const th = mapTooltip.offsetHeight || 118;
    const mg = 12;
    let x = ev.clientX - r.left + 16;
    let y = ev.clientY - r.top  + 16;
    if (x+tw+mg > r.width)  x = ev.clientX - r.left - tw - 16;
    if (y+th+mg > r.height) y = ev.clientY - r.top  - th - 16;
    mapTooltip.style.transform = `translate3d(${Math.max(mg,x)}px,${Math.max(mg,y)}px,0)`;
  });
}

function showTT(e, name) { updateTooltip(name); moveTooltip(e); mapTooltip.classList.add("visible"); }
function hideTT()       { pendingTTEvent=null; if(ttRAF){cancelAnimationFrame(ttRAF);ttRAF=0;} mapTooltip.classList.remove("visible"); }

function updateMapTransform() {
  mapLayer.attr("transform",
    `translate(${(1-appState.zoomLevel)*40},${(1-appState.zoomLevel)*28}) scale(${appState.zoomLevel})`
  );
}

function renderMap() {
  const m    = getM();
  const vals = stateCatalog.map(s=>metricNumber(s,m.key)).filter(isFinite);
  const mn   = Math.min(...vals);
  const mx   = Math.max(...vals);

  legendTitle.textContent = m.key === "airQuality" ? "AQI SCALE" : m.label.toUpperCase();
  updateMapTransform();

  const jk = stateLookup.get("Jammu and Kashmir");
  officialFill.attr("fill", valToColor(m, getVal(jk,m.key), mn, mx));

  statePaths
    .attr("fill", d => {
      const state = d._state;
      if (!state) return "#555";
      return valToColor(m, getVal(state,m.key), mn, mx);
    })
    .classed("active", d => d._stateName === appState.selectedState);

  updateTooltip(appState.selectedState);
}

function refreshMapSelection() {
  statePaths.classed("active", d => d._stateName === appState.selectedState);
  updateTooltip(appState.selectedState);
}

/* ── DRAWER ── */
function openDrawer(stateName) {
  const state = stateLookup.get(stateName);
  if (!state) return;
  appState.selectedState = state.name;

  $id("drawerStateName").textContent    = state.name;
  $id("drawerStateMeta").textContent    = `${state.capital} - ${state.climate}`;
  $id("drawerActiveMetric").textContent = state.capital;
  $id("drawerActiveValue").textContent  = `${state.metrics.language || state.lang} - ${state.climate}`;
  $id("drawerRank").textContent         = fmtCompact(state.metrics.population);
  $id("drawerPopulationSub").textContent = `${numFmt.format(state.metrics.area)} km² - ${state.metrics.districts} ${state.metrics.districts === 1 ? "district" : "districts"}`;

  fillMetricList("realtimeMetrics", realtimeKeys, state);
  fillMetricList("dailyMetrics",    dailyKeys,    state);
  fillMetricList("staticMetrics",   staticKeys,   state);

  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden","false");
  overlay.classList.add("visible");
  refreshMapSelection();
}

function closeDrawer() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden","true");
  overlay.classList.remove("visible");
}

function fillMetricList(id, keys, state) {
  const node = $id(id);
  if (!node) return;
  node.innerHTML = keys.map(key => {
    const m = metricMap[key];
    return `<div class="metric-pill"><span>${m.label}</span><strong>${fmtVal(m,getVal(state,key))}</strong></div>`;
  }).join("");
}

/* ── TOAST ── */
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=>toast.classList.remove("show"), 2400);
}

/* ── THEME ── */
function applyTheme() {
  const dark = appState.theme === "dark";
  document.documentElement.setAttribute("data-theme", appState.theme);
  themeLabel.textContent = dark ? "Light" : "Dark";
  themeIcon.className    = dark ? "ri-sun-line" : "ri-moon-line";
  localStorage.setItem("ii-theme", appState.theme);
}

/* ── REFRESH ── */
function refreshMockData() {
  stateCatalog.forEach((s,i) => {
    const drift = Math.round((seededNoise(Date.now()/1000+i)-0.5)*10);
    s.metrics.airQuality  = Math.max(18, Math.min(320, s.metrics.airQuality+drift));
    s.metrics.temperature = +(Math.max(10,Math.min(42,  s.metrics.temperature+drift*0.08))).toFixed(1);
    s.metrics.humidity    = Math.max(28, Math.min(95,  s.metrics.humidity+drift));
    s.metrics.windSpeed   = +(Math.max(3, Math.min(36,  s.metrics.windSpeed+drift*0.1))).toFixed(1);
  });
  appState.refreshSeconds = 299;
  refreshUI();
  showToast("REFRESHED — new mock values loaded");
}

function refreshUI() {
  fillMetricSelect();
  fillAnalysisStateSelect();
  renderTopStates();
  renderPulseCard();
  renderInsight();
  renderStats();
  renderMap();
  const mm = Math.floor(appState.refreshSeconds/60);
  const ss = appState.refreshSeconds % 60;
  refreshCounter.textContent = `${String(mm).padStart(2,"0")}:${String(ss).padStart(2,"0")}`;
  document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("active",c.dataset.type===appState.selectedType));
}

/* ── SEARCH ── */
function handleSearch(term) {
  const q = normName(term);
  if (!q) return showToast("TYPE A STATE OR METRIC");
  const state = stateCatalog.find(s=>normName(s.name).includes(q));
  if (state) { openDrawer(state.name); showToast(`OPENED — ${state.name}`); return; }
  const m = metrics.filter(m => !profileOnlyMetricKeys.has(m.key)).find(m=>normName(m.label).includes(q));
  if (m) {
    appState.selectedMetric = m.key;
    appState.selectedType   = m.category;
    refreshUI();
    showToast(`METRIC — ${m.label}`);
    return;
  }
  showToast("NOT FOUND — try another query");
}

/* ── NAV ── */
function buildDashboardContext() {
  const m = getM();
  const state = stateLookup.get(appState.analysisState) || stateLookup.get(appState.selectedState) || stateCatalog[0];
  return {
    selectedMetric: m.label,
    selectedState: state.name,
    selectedStateProfile: {
      capital: state.capital,
      language: state.metrics.language,
      climate: state.climate,
      population: state.metrics.population,
      gdp: fmtVal(metricMap.gdp, state.metrics.gdp),
      gdpYear: state.metrics.gdpYear || "NA",
      literacyRate: state.metrics.literacyRate,
      area: state.metrics.area,
      majorIndustries: state.metrics.majorIndustries,
    },
    currentTopStates: getSorted().slice(0,5).map(s => ({
      state: s.name,
      value: fmtVal(m, getVal(s, m.key)),
      gdpYear: s.metrics.gdpYear || "",
    })),
    allStateGdp: stateCatalog.map(s => ({
      state: s.name,
      gdp: fmtVal(metricMap.gdp, s.metrics.gdp),
      gdpYear: s.metrics.gdpYear || "NA",
    })),
    note: "GSDP values are in lakh crore rupees from RBI/MoSPI-backed latest available current-price data. Some UTs have no latest GSDP value.",
  };
}

function appendChatMessage(text, who="bot") {
  if (!aiChatLog) return;
  const msg = document.createElement("div");
  msg.className = `ai-msg ai-msg-${who}`;
  msg.textContent = text;
  aiChatLog.appendChild(msg);
  aiChatLog.scrollTop = aiChatLog.scrollHeight;
}

async function sendAiChat(message) {
  appendChatMessage(message, "user");
  appendChatMessage("Thinking...", "bot");
  const pending = aiChatLog?.lastElementChild;

  try {
    const res = await fetch(apiUrl("/api/chat"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, context: buildDashboardContext() }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Chat failed: ${res.status}`);
    }
    const data = await res.json();
    if (pending) pending.textContent = data.answer || "I could not generate a response.";
  } catch (err) {
    console.warn("[India Insight] AI chat fallback:", err);
    if (pending) pending.textContent = `I could not reach Groq right now: ${err.message}. Check GROQ_API_KEY on the server and try again.`;
  }
}

function highlight(el) {
  if (!el) return;
  el.classList.add("section-focus");
  clearTimeout(highlight._t);
  highlight._t = setTimeout(()=>el.classList.remove("section-focus"),1200);
}

function scrollTo(el) {
  if (!el) return;
  el.scrollIntoView({ behavior:"smooth", block:"start" });
  highlight(el);
}

function handleNav(nav) {
  ({
    overview:   ()=>{ closeDrawer(); scrollTo(document.querySelector(".topbar")); },
    "live-map": ()=>{ closeDrawer(); scrollTo($id("mapStage")); },
    metrics:    ()=>  openDrawer(appState.selectedState),
    compare:    ()=>{ closeDrawer(); scrollTo(document.querySelector(".side-col")); },
    insights:   ()=>{ closeDrawer(); scrollTo(document.querySelector(".insight-card")); },
  })[nav]?.();
}

const CAT_MAP = {
  Weather:"temperature", Environment:"airQuality", Economy:"gdp",
  Health:"healthIndex",  Education:"educationIndex", Infrastructure:"roadDevelopmentIndex",
  Governance:"connectivityScore", Society:"population", "View All":"airQuality",
};

const fallbackNews = [
  {
    title: "Maharashtra and Tamil Nadu draw fresh electronics and EV investment proposals",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=320&q=75",
  },
  {
    title: "Delhi NCR pollution response pushes new clean transport and construction monitoring steps",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=320&q=75",
  },
  {
    title: "Uttar Pradesh expressway and logistics corridor projects remain central to state growth",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=320&q=75",
  },
  {
    title: "Karnataka education and startup ecosystem indicators continue to support high-value jobs",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=320&q=75",
  },
  {
    title: "Odisha and Gujarat ports-linked mega projects strengthen export and industrial output outlook",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=320&q=75",
  },
  {
    title: "Tamil Nadu manufacturing growth keeps automobile and electronics clusters in national focus",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=320&q=75",
  },
  {
    title: "Assam infrastructure push strengthens logistics links across the North East growth corridor",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=320&q=75",
  },
  {
    title: "Kerala health and digital public service indicators improve district-level resilience",
    url: "#",
    source: "Local brief",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=320&q=75",
  },
];

function inferNewsTopic(title="") {
  const t = title.toLowerCase();
  if (/pollution|aqi|air|emission|climate/.test(t)) return "pollution";
  if (/school|education|university|college|skill/.test(t)) return "education";
  if (/metro|rail|road|expressway|airport|port|bridge|infrastructure|corridor/.test(t)) return "infrastructure";
  if (/gdp|investment|economy|jobs|startup|export|industrial|factory|plant/.test(t)) return "economy";
  return "state development";
}

function inferNewsState(title="") {
  const nt = normName(title);
  return stateCatalog.find(s => nt.includes(normName(s.name)))?.name || appState.analysisState;
}

function isEnglishHeadline(title="") {
  return /^[\x00-\x7F]*$/.test(title) && /[a-z]/i.test(title);
}

function pickRandomItems(items, count=3) {
  return [...items]
    .map(item => ({ item, score: Math.random() }))
    .sort((a,b) => a.score - b.score)
    .slice(0, count)
    .map(x => x.item);
}

function buildNewsAnalysis(item) {
  const topic = inferNewsTopic(item.title);
  const stateName = inferNewsState(item.title);
  const state = stateLookup.get(stateName) || stateLookup.get(appState.analysisState);
  const gdp = state ? fmtVal(metricMap.gdp, state.metrics.gdp) : "state GDP";
  const aqi = state ? fmtVal(metricMap.airQuality, state.metrics.airQuality) : "AQI data";
  const education = state ? fmtVal(metricMap.educationIndex, state.metrics.educationIndex) : "education data";
  const infra = state ? fmtVal(metricMap.roadDevelopmentIndex, state.metrics.roadDevelopmentIndex) : "infrastructure data";

  return `This looks like a ${topic} signal for ${stateName}. The practical question is whether it improves capacity, attracts investment, or creates pressure on public services.\n\nDashboard read: ${stateName} currently shows GDP momentum at ${gdp}, air quality at ${aqi}, education capacity at ${education}, and infrastructure readiness at ${infra}.\n\nWhat to watch next: project approvals, funding releases, implementation timelines, and measurable changes in jobs, traffic, pollution, school capacity, or industrial output. If those follow through, this story can become a real ranking mover instead of just a headline.`;
}

async function getGroqAnalysis(item) {
  try {
    const res = await fetch(apiUrl("/api/analyze-news"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ news: item, state: inferNewsState(item.title) }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Groq analysis failed: ${res.status}`);
    }
    const data = await res.json();
    return data.analysis || "";
  } catch (err) {
    console.warn("[India Insight] Groq analysis fallback:", err);
    return "";
  }
}

async function openNewsModal(item) {
  if (!newsModal || !item) return;
  const fallbackAnalysis = buildNewsAnalysis(item);
  newsModalTitle.textContent = item.title;
  newsModalSource.textContent = `${item.source || "GDELT"} - ${inferNewsTopic(item.title)} signal`;
  newsModalAnalysis.textContent = `${fallbackAnalysis}\n\nChecking Groq for a sharper analysis...`;
  newsModalLink.href = item.url || "#";
  newsModalLink.style.display = item.url && item.url !== "#" ? "inline-flex" : "none";
  newsModal.classList.add("open");
  newsModal.setAttribute("aria-hidden","false");
  overlay.classList.add("visible");
  const groqAnalysis = await getGroqAnalysis(item);
  if (groqAnalysis && appState.activeNews === item) {
    newsModalAnalysis.textContent = groqAnalysis;
  } else if (appState.activeNews === item) {
    newsModalAnalysis.textContent = `${fallbackAnalysis}\n\nGroq analysis is unavailable. Check that GROQ_API_KEY is set correctly on the server.`;
  }
}

function closeNewsModal() {
  if (!newsModal) return;
  newsModal.classList.remove("open");
  newsModal.setAttribute("aria-hidden","true");
  if (!drawer.classList.contains("open")) overlay.classList.remove("visible");
}

function escapeHTML(value="") {
  return String(value).replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[ch]);
}

function renderNewsList(items, fallback=false) {
  if (!newsList || !newsSummary) return;
  const englishItems = items.filter(item => isEnglishHeadline(item.title));
  appState.newsItems = pickRandomItems(englishItems.length ? englishItems : fallbackNews, 7);
  newsSummary.textContent = fallback
    ? ""
    : "";

  newsList.innerHTML = appState.newsItems.map((item, i) => `
    <button class="news-item" type="button" data-news-index="${i}">
      <span class="news-thumb">
        ${item.image ? `<img src="${escapeHTML(apiUrl(`/api/image?url=${encodeURIComponent(item.image)}`))}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove();this.parentElement.classList.add('no-image');">` : ""}
        <span>${escapeHTML(inferNewsTopic(item.title).slice(0,2).toUpperCase())}</span>
      </span>
      <span class="news-copy">
        <small>${escapeHTML(inferNewsTopic(item.title).toUpperCase())}</small>
        <strong>${escapeHTML(item.title)}</strong>
        <em>${escapeHTML(inferNewsState(item.title))} - ${escapeHTML(item.source || "GDELT")}</em>
      </span>
      <span class="news-actions" aria-hidden="true">
        <i class="ri-arrow-right-up-line"></i>
      </span>
    </button>
  `).join("");

  appState.activeNews = null;
  renderInsight();
}

async function loadStateNews() {
  if (!newsList || !newsSummary) return;
  newsSummary.textContent = "Scanning GDP, pollution, education, infrastructure and mega project updates.";
  newsList.innerHTML = `
    <div class="news-loading">Loading English state briefs...</div>
    <div class="news-loading">Checking economy and infrastructure...</div>
    <div class="news-loading">Filtering readable headlines...</div>
    <div class="news-loading">Preparing Groq-ready context...</div>
  `;

  try {
    let res = await fetch(apiUrl("/api/news"), { cache: "no-store" });
    if (!res.ok) {
      const query = 'sourcelang:english India states (GDP OR pollution OR education OR infrastructure OR "mega project" OR expressway OR metro)';
      const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(query)}&mode=ArtList&format=json&maxrecords=20&timespan=7d&sort=HybridRel`;
      res = await fetch(url, { cache: "no-store" });
    }
    if (!res.ok) throw new Error(`News request failed: ${res.status}`);
    const data = await res.json();
    const seen = new Set();
    const rawArticles = data.articles || data.news || [];
    const articles = rawArticles
      .filter(a => a.title && a.url)
      .filter(a => isEnglishHeadline(a.title))
      .filter(a => {
        const key = normName(a.title);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0,12)
      .map(a => ({ title: a.title, url: a.url, source: a.sourceCommonName || a.domain || a.source || "GDELT", image: a.socialimage || a.image || "" }));
    if (articles.length < 1) throw new Error("No state news returned");
    renderNewsList(articles, Boolean(data.fallback));
  } catch (err) {
    console.warn("[India Insight] News fallback:", err);
    renderNewsList(fallbackNews, true);
  }
}

/* ── EVENTS ── */
function initEvents() {
  typeChips.addEventListener("click", e=>{
    const c = e.target.closest("[data-type]");
    if (!c) return;
    appState.selectedType = c.dataset.type;
    refreshUI();
  });

  metricSelect.addEventListener("change", e=>{
    appState.selectedMetric = e.target.value;
    refreshUI();
  });

  searchInput.addEventListener("keydown", e=>{
    if (e.key==="Enter") handleSearch(e.target.value);
  });

  searchButton?.addEventListener("click", ()=>handleSearch(searchInput.value));

  searchInput.addEventListener("input", e=>{
    const q = normName(e.target.value);
    const match = stateCatalog.find(s=>normName(s.name).startsWith(q));
    updateTooltip(match ? match.name : appState.selectedState);
  });

  aiChatToggle?.addEventListener("click", ()=>{
    const open = !aiChatPanel.classList.contains("open");
    aiChatPanel.classList.toggle("open", open);
    aiChatPanel.setAttribute("aria-hidden", open ? "false" : "true");
    if (open) aiChatInput?.focus();
  });

  aiChatForm?.addEventListener("submit", e=>{
    e.preventDefault();
    const message = aiChatInput.value.trim();
    if (!message) return;
    aiChatInput.value = "";
    sendAiChat(message);
  });

  $id("refreshButton").addEventListener("click", refreshMockData);
  newsRefresh?.addEventListener("click", loadStateNews);
  analysisStateSelect?.addEventListener("change", e=>{
    appState.analysisState = e.target.value;
    appState.activeNews = null;
    renderInsight();
  });
  newsList?.addEventListener("click", e=>{
    const item = e.target.closest("[data-news-index]");
    if (!item) return;
    const idx = Number(item.dataset.newsIndex);
    const news = appState.newsItems[idx];
    if (!news) return;
    appState.activeNews = news;
    document.querySelectorAll(".news-item").forEach(n=>n.classList.remove("active"));
    item.classList.add("active");
    renderInsight();
    openNewsModal(news);
    showToast("NEWS ANALYSIS READY");
  });
  $id("viewAllTop").addEventListener("click", ()=>openDrawer(getSorted()[0].name));
  $id("viewAnalysis")?.addEventListener("click", ()=>openDrawer(appState.analysisState));
  $id("closeDrawer").addEventListener("click", closeDrawer);
  $id("closeNewsModal")?.addEventListener("click", closeNewsModal);
  overlay.addEventListener("click", ()=>{
    closeDrawer();
    closeNewsModal();
  });

  $id("sidebarNav")?.addEventListener("click", e=>{
    const btn = e.target.closest(".nav-btn");
    if (!btn) return;
    document.querySelectorAll(".nav-btn").forEach(n=>n.classList.remove("active"));
    btn.classList.add("active");
    handleNav(btn.dataset.nav);
  });

  $id("categoryGrid").addEventListener("click", e=>{
    const tile = e.target.closest(".cat-tile");
    if (!tile) return;
    const key = CAT_MAP[tile.dataset.cat] || "airQuality";
    appState.selectedMetric = key;
    appState.selectedType   = metricMap[key].category;
    refreshUI();
    showToast(`CATEGORY — ${tile.dataset.cat}`);
  });

  topStatesList.addEventListener("click", e=>{
    const row = e.target.closest("[data-state-row]");
    if (row) openDrawer(row.dataset.stateRow);
  });

  statePaths
    .on("mouseenter", (evt,d) => showTT(evt, d._stateName))
    .on("mousemove",   evt    => moveTooltip(evt))
    .on("mouseleave",          hideTT)
    .on("click",      (_,d)  => openDrawer(d._stateName));

  officialFill
    .on("mouseenter", evt => showTT(evt,"Jammu and Kashmir"))
    .on("mousemove",  evt => moveTooltip(evt))
    .on("mouseleave",       hideTT)
    .on("click",           ()=>openDrawer("Jammu and Kashmir"));

  $id("themeToggle").addEventListener("click", ()=>{
    appState.theme = appState.theme==="dark" ? "light" : "dark";
    applyTheme();
    showToast(`THEME — ${appState.theme} mode`);
  });

  $id("mapZoomIn").addEventListener("click", ()=>{
    appState.zoomLevel = Math.min(1.65, +(appState.zoomLevel+0.12).toFixed(2));
    updateMapTransform();
  });
  $id("mapZoomOut").addEventListener("click", ()=>{
    appState.zoomLevel = Math.max(0.82, +(appState.zoomLevel-0.12).toFixed(2));
    updateMapTransform();
  });
  $id("mapHome").addEventListener("click", ()=>{
    appState.zoomLevel    = 1;
    appState.selectedState = "Uttar Pradesh";
    closeDrawer();
    renderMap();
    showToast("MAP — reset to default view");
  });
  $id("mapFocus").addEventListener("click", ()=>openDrawer(getSorted()[0].name));

  document.addEventListener("keydown", e=>{
    if (e.key==="Escape") {
      closeDrawer();
      closeNewsModal();
    }
  });
}

/* ── DOWNLOAD / SHARE ── */
function addTopbarExtras() {
  const wrap = document.createElement("div");
  wrap.style.cssText = "display:flex;gap:8px;flex-shrink:0;";
  wrap.innerHTML = `
    <button class="hdr-icon-btn" id="dlBtn" title="Download PNG"><i class="ri-download-2-line"></i></button>
    <button class="hdr-icon-btn" id="shareBtn" title="Copy share text"><i class="ri-share-forward-line"></i></button>`;
  document.querySelector(".topbar-right").prepend(wrap);

  $id("dlBtn").addEventListener("click", async()=>{
    try {
      if (!window.html2canvas) {
        await new Promise((ok,fail)=>{
          const s=document.createElement("script");
          s.src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
          s.onload=ok; s.onerror=fail;
          document.head.appendChild(s);
        });
      }
      const c = await html2canvas($id("dashboardCapture"), {backgroundColor:null,scale:2});
      const a = document.createElement("a");
      a.download="india-insight.png"; a.href=c.toDataURL("image/png"); a.click();
      showToast("DOWNLOADED — dashboard.png");
    } catch { showToast("DOWNLOAD — unavailable in this browser"); }
  });

  $id("shareBtn").addEventListener("click", async()=>{
    try {
      await navigator.clipboard.writeText(`India Insight Dashboard — ${getM().label}`);
      showToast("COPIED — share text in clipboard");
    } catch { showToast("COPY — failed in this browser"); }
  });
}

/* ── TIMER ── */
function startTimer() {
  setInterval(()=>{
    appState.refreshSeconds = appState.refreshSeconds<=0 ? 299 : appState.refreshSeconds-1;
    const mm = Math.floor(appState.refreshSeconds/60);
    const ss = appState.refreshSeconds%60;
    refreshCounter.textContent = `${String(mm).padStart(2,"0")}:${String(ss).padStart(2,"0")}`;
  }, 1000);
}

/* ── INIT ── */
function init() {
  applyTheme();
  fillMetricSelect();
  fillAnalysisStateSelect();
  initEvents();
  addTopbarExtras();
  refreshUI();
  loadStateNews();
  startTimer();

  /* Log GeoJSON state for debugging Telangana */
  console.log("[India Insight] GeoJSON has Telangana polygon:", hasTelanganaInGeoJSON);
  console.log("[India Insight] GeoJSON NAME_1 values:", [...geojsonStateNames].sort().join(", "));

  if (!hasTelanganaInGeoJSON) {
    console.warn(
      "[India Insight] Your GeoJSON does not have a 'Telangana' polygon. " +
      "The 'Andhra Pradesh' polygon covers the pre-2014 unified state. " +
      "To show Telangana as a separate region on the map, replace your india-state.js " +
      "with a post-2014 GeoJSON that has separate Telangana and Andhra Pradesh features."
    );
  }
}

init();
