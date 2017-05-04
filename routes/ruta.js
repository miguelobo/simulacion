var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/blankpage', function(req, res, next) {
  res.render('blankpage', { title: 'Express' });
});
router.get('/mensajeP', function(req, res, next) {
    res.render('mensajeP', { title: 'Express' });
});
router.get('/informacion', function(req, res, next) {
    res.render('informacion/list', { title: 'Express' });
});
router.get('/ruta', function(req, res, next) {
    res.render('ruta', { title: 'Express' });
});
module.exports = router;
