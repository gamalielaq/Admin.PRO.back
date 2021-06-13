const mongoose = require('mongoose');
require( 'dotenv' ).config();

const dbConnection = async() => {   

    // URxr3xQm6OE7Hc63
    
    try {
            await mongoose.connect(process.env.BD_CNN, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });

            console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }

}

module.exports = {
    dbConnection
}
