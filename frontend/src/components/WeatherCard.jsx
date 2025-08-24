import { useState } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Send
} from "lucide-react";

export default function WeatherCard({
  name,
  description,
  temperature,
  humidity,
  pressure,
  visibility,
  sunrise,
  sunset,
  tempMin,
  tempMax,
  windSpeed,
  windDegree,
}) {
  

  // Pick an icon dynamically based on description
  const getWeatherIcon = (desc) => {
    const lower = desc.toLowerCase();
    if (lower.includes("sun") || lower.includes("clear"))
      return <Sun className="w-10 h-10 text-yellow-400" />;
    if (lower.includes("rain"))
      return <CloudRain className="w-10 h-10 text-blue-400" />;
    if (lower.includes("snow"))
      return <CloudSnow className="w-10 h-10 text-sky-300" />;
    return <Cloud className="w-10 h-10 text-slate-400" />; // default
  };

  // Convert UNIX time → readable HH:MM
  const formatTime = (unix) => {
    return new Date(unix * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

   const formatTemp = (temp) => {
    return `${Math.round(temp)}°C`;
    };

     return (
    <div className="max-w-sm mx-auto mt-10 rounded-2xl overflow-hidden shadow-lg ">
      <div className="bg-[#071027] text-white p-6 relative">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-[11px] mt-0.5">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}, {new Date().toLocaleDateString([], { day: "2-digit", month: "short"})}
            </p>
          </div>
          <div className="text-4xl font-bold">{formatTemp(temperature)}</div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div>

          {getWeatherIcon(description)}
          <span className="text-sm">{description}</span>
          </div>
      
          <div>

          <p className="text-sm">Temp Min: {formatTemp(tempMin)}</p>
          <p className="text-sm">Temp Max: {formatTemp(tempMax)}</p>
          </div>

        </div>
      </div>
      <div className="bg-slate-800 text-slate-200 p-4 grid grid-cols-3 gap-3 text-xs">
     <div className="flex flex-col space-y-2 relative">
    <div className="flex justify-between items-center">
      <span>Pressure:</span> <span>{pressure} hPa</span>
    </div>
    <div className="flex justify-between items-center">
      <span>Humidity:</span> <span>{humidity}%</span>
    </div>
    <div className="flex justify-between items-center">
      <span>Visibility:</span> <span>{visibility} km</span>
    </div>
    {/* Vertical line */}
    
  </div>

  <div className="flex flex-col space-y-2 relative">
    <div className="flex-col justify-between place-items-center text-center">
      <Send className="w-4 h-4" />
      <span className="">{windSpeed}m/s {windDegree}°</span>
    </div>
    
  </div>

  <div className="flex flex-col space-y-2">
    <div className="flex justify-between items-center">
      <span>Sunrise:</span> <span>{formatTime(sunrise)} am</span>
    </div>
    <div className="flex justify-between items-center">
      <span>Sunset:</span> <span>{formatTime(sunset)} pm</span>
    </div>
  </div>
</div>

    </div>
   );

  }




