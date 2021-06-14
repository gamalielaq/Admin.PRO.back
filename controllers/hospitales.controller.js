const { response } = require('express');

const Hospital = require('../models/hospital');



const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre email img')

    res.json({
        ok: true,
        hospitales
    })
}

const createHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hopitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hopitalDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const updateHospital = async (req, res = response) => {

    const id  = req.params.id;
    const uid = req.uid;
    try {


        const hospitalDB = await Hospital.findById( id );
        

        if( !hospitalDB ) {
            res.status(404).json({
                ok: true,
                msg: 'Hospital no econtrado por id',
            })
        }

        const cambiosHolpital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHolpital, { new: true} );

        res.json({
            ok: true,
            hospital: hospitalActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const deleteHospital = async(req, res = response) => {
    
    const id  = req.params.id;

    try {


        const hospitalDB = await Hospital.findById( id );
        

        if( !hospitalDB ) {
            res.status(404).json({
                ok: true,
                msg: 'Hospital no econtrado por id'
            })
        }

       await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getHospitales,
    createHospital,
    updateHospital,
    deleteHospital
}