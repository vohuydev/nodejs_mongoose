var express = require('express');
var router = express.Router();
var contactModel = require('../model/contact.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* xem data. */
router.get('/xem', function(req, res, next) {
  contactModel.find({},function(err,dulieu){
    res.render('xem', { title: 'xem du lieu', data:dulieu});
  })
});
/* xoa data. */
router.get('/xoa/:idcanxoa', function(req, res, next) {
  var id = req.params.idcanxoa;
  contactModel.findByIdAndRemove(id).exec(); //.exec() thực thi phương thức findIdAndRemove()
  res.redirect('/xem');
});
/* sua data. get*/
router.get('/sua/:idcanxoa', function(req, res, next) {
  var id2 = req.params.idcanxoa;
  contactModel.find({_id:id2},function(err,dulieu){
    res.render('sua',{title:'Sua du lieu',data:dulieu});
  })

});
/* sua data. post*/
router.post('/sua/:idcanxoa', function(req, res, next) {
  var id2 = req.params.idcanxoa;

  contactModel.findById(id2,function(err,dulieu){
    if(err)  return handleError(err);

    dulieu.ten = req.body.ten;
    dulieu.tuoi = req.body.tuoi;
    dulieu.save();
    res.redirect('/xem');
  })
});
/* Them data. */
router.get('/them', function(req, res, next) {
    res.render('them', { title: 'Them du lieu'});
});
/* Them data. post */
router.post('/them', function(req, res, next) {
  var phantu = {
    'ten' : req.body.ten,
    'tuoi' : req.body.tuoi
  }
  var dulieu = new contactModel(phantu);
  dulieu.save();
  res.redirect('/xem');
});
module.exports = router;
