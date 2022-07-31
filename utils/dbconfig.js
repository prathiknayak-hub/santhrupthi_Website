console.log("inside dg - config 1");
const { Pool } = require("pg");

const config = "postgres://bxlmmqitngpgfn:48c405f0dee1b55f7ee589823ffaf967c192d54949215dcfd02d0899d8c46598@ec2-44-206-214-233.compute-1.amazonaws.com:5432/ddg7gu70sjqsn9";
const pool = new Pool({ connectionString: config,ssl: { rejectUnauthorized: false } });
module.exports = pool;
