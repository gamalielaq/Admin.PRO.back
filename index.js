require( 'dotenv' ).config();
const expres = require('express');
const cors = require('cors')


const { dbConnection } = require('./database/config');

// crear el servidor expres
const app = expres();

//Configurar Cors
app.use(cors())

//Lectura del Body
app.use( expres.json() );

// Base de datos
dbConnection();

//Directorio público
app.use( expres.static('public'));

//Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/hospitales', require('./routes/hospitales.routes'));
app.use('/api/medicos', require('./routes/medicos.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/upload', require('./routes/uploads.routes'));

app.listen( process.env.PORT ,()=> {
    console.log('Servidor Corriendo en puerto' + process.env.PORT);
});
