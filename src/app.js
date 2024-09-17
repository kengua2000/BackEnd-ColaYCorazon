import express from "express";

//Crear instancia de Express
const app = express();


app.get('/', (req, res) => {
    res.send('Sitio Principal Cola y Corazón');
});


const PORT=4000;


app.listen(PORT,()=>{
    console.log(`Servidor Inicializado en el puerto ${PORT}`);
});

