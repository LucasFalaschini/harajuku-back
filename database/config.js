//mean_user
//9tdjl5uRRQymfr1f

const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de conectarse a la DB');
    }

}

module.exports = {
    dbConnection
}