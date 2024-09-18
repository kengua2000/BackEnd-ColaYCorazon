import Sequelize  from "sequelize";

const db = new Sequelize("colaycorazon","mascotas","1234",{
    dialect: "mysql",
    host: "localhost"
});

export {db}