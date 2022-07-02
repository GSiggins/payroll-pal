const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: DB_USER,
        // TODO: Add MySQL password here
        password: DB_PASSW,
        database: DATABASE
    },
    console.log(`Connected to the employees_db database.`)
);

module.exports = db;