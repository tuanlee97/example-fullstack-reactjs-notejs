var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: 'tuanlee',
  port: 5432,
})



/* GET home page. */
// router.get('/', function(req, res, next) {

//   pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     pool.end()
//   })
//   res.render('index', { title: 'Express' });
// });
// api get data from postgreSQL
router.get('/getData', function(req, res, next) {
  
  //get data 
  pool.query("SELECT * FROM public.product_info",(error,response) => {
    if (error)  console.log(error);
    else res.send(response.rows);      
        
      // pool.end();
  })   
});
router.get('/add', function(req, res, next) {
  res.render('add',{});

});
router.post('/add', function(req, res, next) {
  
  
  pool.query("INSERT INTO product_info(product_name,product_price,image) values ($1,$2,$3)",[req.body.product_name,req.body.product_price,req.body.image],(error,response) => {
    if (error)  res.send(error);
    else  res.send(1);
        
      // pool.end();
  })   
});

module.exports = router;
