import { useState } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
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


     return (
    <div className="max-w-md mx-auto mt-10 rounded-2xl overflow-hidden shadow-lg">
      {/* Top section */}
      <div className="bg-[#071027] text-white p-6 relative">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm">{formatTime(Date.now())}</p>
          </div>
          <div className="text-4xl font-bold">{temperature}°C</div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          {getWeatherIcon(description)}
          <span className="text-sm">{description}</span>
        </div>

        <div className="flex justify-between mt-3 text-xs">
          <p>Temp Min: {tempMin}°C</p>
          <p>Temp Max: {tempMax}°C</p>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-slate-800 text-slate-200 p-4 grid grid-cols-2 gap-3 text-xs">
        <div>
          <p>Pressure: {pressure}hPa</p>
          <p>Humidity: {humidity}%</p>
          <p>Visibility: {visibility}km</p>
        </div>
        <div>
          <p>{windSpeed}m/s {windDegree} Degree</p>
          <p>Sunrise: {formatTime(sunrise)}am</p>
          <p>Sunset: {formatTime(sunset)}pm</p>
        </div>
      </div>
    </div>
   );

  }




