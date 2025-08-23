import { useEffect, useState } from "react";
import WeatherCard  from "./WeatherCard";
import axios from "axios";

const mainPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async ()=>{
      try {
         setLoading(true);
         setError(null);
         const res = await axios.get("http://localhost:5000/api/weather");
         if (res.status !== 200) throw new Error("Failed to fetch weather data");
         setData(res.data);
      } catch (e) {
         setError(e.message || "Failed to load weather");
      } finally {
         setLoading(false);
      }
   }

     
  useEffect(() => {
    load();
  }, []);


  return (
     <div className="min-h-screen bg-slate-50">
           <header className="sticky top-0 bg-white/70 backdrop-blur border-b border-slate-200">
             <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
               <h1 className="text-xl md:text-2xl font-bold">Weather Dashboard</h1>
               <div className="flex items-center gap-3">
                 <button
                   onClick={load}
                   className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm hover:bg-slate-800"
                 >
                   Refresh
                 </button>
               </div>
             </div>
           </header>
     
           <div className="max-w-5xl mx-auto px-4 py-6">
             {loading && (
               <div className="text-center py-16">Loading weather…</div>
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