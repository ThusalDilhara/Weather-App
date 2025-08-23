const express= require('express');
const cors= require('cors');
const weatherRoutes= require('./Routes/weatherRoutes.js');

const app= express();
const port= 5000;


app.use(cors());
app.use(express.json());
app.use('/api/weather', weatherRoutes);

app.listen(port,()=>{
   console.log('server is running on port ' + port)
})

