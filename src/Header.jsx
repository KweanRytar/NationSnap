import React, { useState, useEffect, useRef } from "react"; // ✅ Import useEffect
import { MdOutlineNightlight, MdNightlightRound } from "react-icons/md";
import axios from "axios";


const Header = () => {
  const [daylight, setDaylight] = useState(true);
  const countryName = useRef(null)
  const [region, setRegion] = useState("")
  const[allCountries, setAllCountries] = useState([])
  const [countries, setCountries] = useState([])
  const url = "https://restcountries.com/v3.1/all"

  const getCountry = async () => {
try{
    const response = await axios.get(url)
if(response.data){
    setAllCountries(response.data)
    setCountries(response.data)
    }

    }
catch (error){
console.error("Error fetching country data:", error)
    }
  }
const getCountryByName = () =>{
  setCountries(allCountries.filter((country) => country.name.common.toLowerCase().includes(countryName.current.value) ))
}
const getCountryByRegion = (selectedRegion) => {
    setCountries(allCountries.filter((country) =>
      country.region.toLowerCase() === selectedRegion.toLowerCase()
    ));
  };
  
  useEffect(()=>
{
    getCountry()
}, [])

  
  useEffect(() => {
    document.body.style.backgroundColor = daylight ? "#f0f0f0" : "#333";
    document.querySelectorAll("h1", "p", "h2", "button").forEach((el)=>{
el.style.color = daylight ? "#333" : "#f0f0f0";
    })
  }, [daylight]);

  return (
    <div>
        <div className="fixed top-0 left-0 w-full z-50 bg-blue-600 shadow-md0">
        <div className={`${daylight ? "Day" : "Night" } flex flex-col md:flex-row justify-between items-center p-4`}>
        <h1>What in the world?</h1>
        <button onClick={() => setDaylight(!daylight)} style={{ background: "none", border: "none", cursor: "pointer", color: daylight ? "#333" : "#f0f0f0" }}>
        {daylight ? "Light": "Dark"}
          {daylight ? <MdNightlightRound size={24} style={{color: daylight ? "black" : "white"}}/> : <MdOutlineNightlight size={24} style={{color: daylight ? "black" : "white"}} />}
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center p-4">
      <input 
  type="text" 
  ref={countryName} 
  placeholder="Enter the name of the Country" className="w-80  border-0"
  style={{ 
    color: daylight ? "black" : "white", 
    backgroundColor: daylight ? "white" : "black",
    border: "1px solid gray", 
    padding: "8px"
  }} onChange={() => {
    if (countryName.current.value) {
      getCountryByName();
    } else {
      getCountry();
    }
  }} 
/>

        <select value={region} 
  onChange={(e) => {
    setRegion(e.target.value);
    if (e.target.value) {
      getCountryByRegion(e.target.value); // ✅ Call function with selected region
    } else {
      getCountry(); // Reset if no region selected
    }
  }}  style={{color: daylight ? "red" :"black" }}>
            <option value="" disabled selected style={{color: daylight ? "black" : "white"}}>Filter by Region</option>
            <option value="africa">Africa</option>
            <option value="americas">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
        </select>
      </div>
        </div>
      <div className="pt-56 overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 px-4">
        {countries.map((country)=>(
<div key={country.cca3} className=" flex flex-col justify-center m-2 bg-white shadow-md  rounded-lg">
    <img src={country.flags.png} className=" w-full mx-auto  h-32 object-cover rounded-md"/>
    <p className="font-bold text-lg mt-2 mx-auto">{country.name.common}</p>
    <p className="text-gray-600 mx-auto">Region: {country.region}</p>
    <p className="text-gray-600 mx-auto">Population:{country.population}</p>
    <p className="text-gray-600 mx-auto">Capital: {country.capital}</p>
    <p className="text-gray-600 mx-auto">Timezone: {country.timezones}</p>
</div>



))}
        </div>

      </div>
    </div>
  );
};

export default Header;
