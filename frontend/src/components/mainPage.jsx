import { useEffect, useState } from "react";
import WeatherCard  from "./WeatherCard";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from "./LoginButton";
import LogoutButton from "./LogOutButton";
import Background from "../assets/background.png";

import { ArrowLeft, X, Cloud, CloudRain, CloudSnow, Sun, Wind, Eye, Droplets, Gauge, Sunrise, Sunset } from 'lucide-react';

const mainPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated,isLoading,user,error:authError,getAccessTokenSilently } = useAuth0();

  const load = async ()=>{
      try {
         setLoading(true);
         setError(null);
        const token = await getAccessTokenSilently();
        console.log("Token:", token);
         const res = await axios.get("http://localhost:5000/api/weather", {
           headers: {
             Authorization: `Bearer ${token}`
           }
         });
         if (res.status !== 200) throw new Error("Failed to fetch weather data");
         setData(res.data);
      } catch (e) {
         setError(e.message || "Failed to load weather");
      } finally {
         setLoading(false);
      }
   }

     
   useEffect(() => {
    if (isAuthenticated) 
       load();

   }, [isAuthenticated]);

 if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-slate-700 font-medium text-lg animate-pulse">
          Authenticating…
        </p>
      </div>
    </div>
  );
}



   if (!isAuthenticated) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
          <p className="text-slate-600 mb-6">Please log in to view weather data.</p>
          <LoginButton />
          {authError && <p className="mt-4 text-red-600 text-sm">{String(authError)}</p>}
        </div>
      </div>
    );
  }


  return (
     <div 
        className="min-h-screen bg-cover bg-center"
         style={{ backgroundImage: `url(${Background})` }}
     > 
           
           <div className="max-w-5xl mx-auto px-4 py-4 relative">
       {/* Top right buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-3">
    <button
      onClick={load}
      className="px-4 py-2 rounded-xl bg-[#1e2027] text-white text-sm hover:bg-slate-800"
    >
      Refresh
    </button>
    <LogoutButton />
  </div>

  {/* Centered title */}
  <div className="text-center mb-6">
    <div className="flex items-center justify-center space-x-3 mb-4">
      <div className="relative">
        <Cloud className="w-8 h-8 text-white" />
        <Sun className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1" />
      </div>
      <h1 className="text-3xl font-medium text-white">Weather App</h1>
    </div>

    {/* Search + Add City */}
    <div className="flex justify-center items-center gap-3">
      <input
        type="text"
        placeholder="Enter a city"
        className="px-4 py-2 rounded-xl w-64 bg-[#1e2027] placeholder:text-gray-400 text-white"
      />
      <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-500">
        Add City
      </button>
       </div>
     </div>
   </div>

          
     
           <div className="max-w-5xl mx-auto px-4 py-6">
             {loading && (
               <div className="text-center py-16">

                <div className="flex flex-col items-center space-y-4">
                   {/* Spinner */}
                  <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>

                    {/* Text */}
                 <p className="text-slate-700 font-medium text-lg animate-pulse">
                   Loading Weather Data…
                </p>
                </div>
               </div>
             )}
     
             {error && (
               <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
                 {error}
               </div>
             )}
     
             {!loading && !error && (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 {data.map((item, id) => (
                   <WeatherCard
                     key={id}
                     name={item.name}
                     description={item.description}
                     temp={item.temperature}
                   />
                 ))}
               </div>
             )}
           </div>
     
           <footer className="py-8 text-center text-xs text-slate-500">
              2021 Fidenz Technologies
           </footer>
         </div>
  )
} 

export default mainPage;