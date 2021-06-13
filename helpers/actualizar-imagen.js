const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

actualizarImagen =  async(tipo, id, nombreArchivo) => {
    let pathViejo = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);

            if( !medico ) {
                console.log('No se encontro un medico');
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;

            borrarImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();

            return true;

            break;
        case 'hospitales':

            const hopital = await Hospital.findById(id);

            if( !hopital ) {
                console.log('No se encontro un hopital');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hopital.img }`;

            borrarImagen( pathViejo );

            hopital.img = nombreArchivo;

            await hopital.save();

            return true;

            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);

            if( !usuario ) {
                console.log('No se encontro un usuario');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;

            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();

            return true;
            break;

        default:
            break;
    }
}


const borrarImagen = ( path ) => { 

    if (fs.existsSync( path )) {
        fs.unlinkSync( path ); // borra la imagen anterior
    }
}

module.exports = {
    actualizarImagen
}