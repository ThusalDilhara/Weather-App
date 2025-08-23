export default function WeatherCard({ name, description, temp }) {
return (
  <div className="rounded-2xl shadow-sm bg-white p-5 border border-slate-100 hover:shadow-md transition">
   <div className="flex items-start justify-between">
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-slate-500 capitalize">{description}</p>
      </div>
     <div className="text-3xl font-bold">{Math.round(temp)}°C</div>
   </div>
 </div>
);
}