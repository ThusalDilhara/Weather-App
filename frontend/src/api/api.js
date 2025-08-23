export const API_BASE ='http://localhost:5000';


export async function fetchWeather() {
  const res = await fetch(`${API_BASE}/api/weather`);
  if (!res.ok) {
   const text = await res.text();
    throw new Error(`Backend error ${res.status}: ${text}`);
   }
  return res.json();
}

