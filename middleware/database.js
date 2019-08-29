//database schema model for 
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://vrrsqovozlccpy:8e3b0c17740c74f3a6b01e99fa4d2c958e414842c951cdc18ebe6df890bb78ac@ec2-107-20-230-70.compute-1.amazonaws.com:5432/d322r6vu8ok88f?ssl=true';
const client = new pg.Client(connectionString);
client.connect()
const results = [];

//function to enter bus data into the database
module.exports.registerBus = async function (communicationMode, callback) {
    var numberplate = communicationMode.getNumberplate();
    var seats = 45;

    client.query('INSERT INTO public.bus(numberplate,seats)VALUES($1,$2)',
        [numberplate, seats], (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                console.log('data saved successfully');
            }
        })
}



//register all companies
module.exports.registerCompany = async function (communicationMode, callback) {
    var company_name = communicationMode.getCompanyname();
    client.query('INSERT INTO public.company(companyname)VALUES($1)',
        [company_name], (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                console.log('data saved successfully');
            }
        })
}


/*****All the get scripts go here**** */
module.exports.selectAllBuses = async function selectAllBuses(callback) {
    const query = client.query('SELECT * FROM public.bus', (err, result) => {
        if (err) {
            callback(err, results)
        } else {
            query.on('row', (row) => {
                results.push(row);
            });

            query.on('end', () => {
               // console.log("get all buses ...........", result);
                callback(err, result)
            });

        }

    });
}

//get all company name
module.exports.selectCompanies = async function selectCompanies(callback) {
    const query = client.query('SELECT * FROM public.company', (err, result) => {
        if (err) {
            callback(err, results)
        } else {
            query.on('row', (row) => {
                results.push(row);
            });

            query.on('end', () => {
               // console.log("get all companies ...........", result);
                callback(err, result)
            });

        }

    });
}