// log
const bcrypt=require('bcryptjs');
const helpers={};

//  este metodo cifra contraseña
helpers.encryptPassword= async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};
//matchPassword es un nombre cualquiera y este metodo sirve para desifrar
helpers.matchPassword = async(password, savedPassword) =>{
    try{
        return await bcrypt.compare(password, savedPassword);
    } catch(e){
        console.log(e);
    }
};

module.exports=helpers;