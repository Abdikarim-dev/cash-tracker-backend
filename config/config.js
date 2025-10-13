const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('cash_tracker', 'root', '', {
    host: 'localhost',
    dialect: "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

function connectDB() {
    sequelize.authenticate()
        .then(() => console.log("Database Connected"))
        .then(() => sequelize.sync())
        .then(() => console.log("Tables Synced"))
        .catch((error) => console.log("Database Error", error))
}

module.exports = { connectDB, sequelize }