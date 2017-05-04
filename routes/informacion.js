/**
 * Created by JOSE MANUEL LOBO on 01/01/10.
 */
var express = require('express');
var router = express.Router();

/* GET informacion page. */

router.get('/', function(req, res, next) {
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM informacion',function(err,rows)
        {console.log(rows.length);
            console.log(query.sql);
            if(err)
                var errornya  = ("Error Selecting : %s ",err );
            req.flash('msg_error', errornya);
            res.render('informacion/list',{title:"Informacion Del Sistema",data:rows});
        });
        console.log(data);
        console.log(query.sql);
    });
});

router.delete('/delete/(:id)', function(req, res, next) {
    req.getConnection(function(err,connection){
        var informacion = {
            id: req.params.id,
        }

        var delete_sql = 'delete from informacion where ?';
        req.getConnection(function(err,connection){
            var query = connection.query(delete_sql, informacion, function(err, result){
                if(err)
                {
                    var errors_detail  = ("Error Delete : %s ",err);
                    req.flash('msg_error', errors_detail);
                    res.redirect('/informacion');
                }
                else{
                    req.flash('msg_info', 'Delete informacion Success');
                    res.redirect('/informacion');
                }
            });
        });
    });
});
router.get('/edit/(:id)', function(req,res,next){
    req.getConnection(function(err,connection){
        var query = connection.query('SELECT * FROM informacion where id='+req.params.id,function(err,rows)
        {
            if(err)
            {
                var errornya  = ("Error Selecting : %s ",err );
                req.flash('msg_error', errors_detail);
                res.redirect('/informacion');
            }else
            {
                if(rows.length <=0)
                {
                    req.flash('msg_error', "informacion can't be find!");
                    res.redirect('/informacion');
                }
                else
                {
                    console.log(rows);
                    res.render('informacion/edit',{title:"Edit ",data:rows[0]});

                }
            }

        });
    });
});
router.put('/edit/(:id)', function(req,res,next){
    req.assert('name', 'Please fill the name').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        v_nombre = req.sanitize( 'nombre' ).escape().trim();
        v_ip = req.sanitize( 'ip' ).escape().trim();
        v_so = req.sanitize( 'so' ).escape().trim();
        v_ram = req.sanitize( 'ram' ).escape().trim();
        v_procesador = req.sanitize( 'procesador' ).escape();

        var informacion = {
            nombre: v_nombre,
            ip: v_ip,
            so: v_so,
            ram: v_ram,
            procesador : v_procesador
        }

        var update_sql = 'update informacion SET ? where id = '+req.params.id;
        req.getConnection(function(err,connection){
            var query = connection.query(update_sql, informacion, function(err, result){
                if(err)
                {
                    var errors_detail  = ("Error Update : %s ",err );
                    req.flash('msg_error', errors_detail);
                    res.render('informacion/edit',
                        {
                            nombre: req.param('nombre'),
                            ip: req.param('ip'),
                            so: req.param('so'),
                            ram: req.param('ram'),
                            procesador: req.param('procesador'),
                        });
                }else{
                    req.flash('msg_info', 'Update informacion success');
                    res.redirect('/informacion/edit/'+req.params.id);
                }
            });
        });
    }else{

        console.log(errors);
        errors_detail = "<p>Sory there are error</p><ul>";
        for (i in errors)
        {
            error = errors[i];
            errors_detail += '<li>'+error.msg+'</li>';
        }
        errors_detail += "</ul>";
        req.flash('msg_error', errors_detail);
        res.render('informacion/add-informacion',
            {
                name: req.param('name'),
                address: req.param('address')
            });
    }
});

router.post('/add', function(req, res, next) {
    req.assert('name', 'Please fill the name').notEmpty();
    var errors = req.validationErrors();
    if (!errors) {
        v_nombre = req.sanitize( 'nombre' ).escape().trim();
        v_ip = req.sanitize( 'ip' ).escape().trim();
        v_so = req.sanitize( 'so' ).escape().trim();
        v_ram = req.sanitize( 'ram' ).escape().trim();
        v_procesador = req.sanitize( 'procesador' ).escape();

        var informacion = {
            nombre: v_nombre,
            ip: v_ip,
            so: v_so,
            ram: v_ram,
            procesador : v_procesador
        }

        var insert_sql = 'INSERT INTO informacion SET ?';
        req.getConnection(function(err,connection){
            var query = connection.query(insert_sql, informacion, function(err, result){
                if(err)
                {
                    var errors_detail  = ("Error Insert : %s ",err );
                    req.flash('msg_error', errors_detail);
                    res.render('informacion/add-informacion',
                        {
                            nombre: req.param('nombre'),
                            ip: req.param('ip'),
                            so: req.param('so'),
                            ram: req.param('ram'),
                            procesador: req.param('procesador'),
                        });
                }else{
                    req.flash('msg_info', 'Create informacion success');
                    res.redirect('/informacion');
                }
            });
        });
    }else{

        console.log(errors);
        errors_detail = "<p>Sory there are error</p><ul>";
        for (i in errors)
        {
            error = errors[i];
            errors_detail += '<li>'+error.msg+'</li>';
        }
        errors_detail += "</ul>";
        req.flash('msg_error', errors_detail);
        res.render('informacion/add-informacion',
            {
                nombre: req.param('nombre'),
                ip: req.param('ip')
            });
    }

});

router.get('/add', function(req, res, next) {
    res.render(	'informacion/add-informacion',
        {
            title: 'Add New informacion',
            nombre: '',
            ip: '',
            so:'',
            ram:'',
            procesador:''
        });
});



module.exports = router;
