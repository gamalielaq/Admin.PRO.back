const { response } = require('express');

const Hospital = require('../models/hospital');



const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre email img')

    res.json({
        ok:true, 
        hospitales
    })    
}

const createHospital = async (req, res = response) => {
    
    const uid = req.uid;
    const hospital = new Hospital( {
        usuario: uid,
        ...req.body
    });

    try {
       
        const hopitalDB = await hospital.save();

        res.json({
            ok:true, 
            hospital: hopitalDB
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
    
      
}

const updateHospital = (req, res = response) => {
    res.json({
        ok:true, 
        msg: 'updateHospitales'
    })    
}

const deleteHospital = (req, res = response) => {
    res.json({
        ok:true, 
        msg: 'deleteHospitales'
    })    
}

module.exports = {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}