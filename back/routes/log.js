const express = require('express');
const router = express.Router();
const { Logs, Sequelize } = require('../models');
const dayjs = require('dayjs');
const { Op } = require('sequelize');



router.post('/', async(req, res, next) => {
  const day = dayjs();
  const date = day.format('YYYY-MM-DD');
  const time = day.format('HH:mm:ss');
    try {        
        await Logs.create({
          field: req.body.field,
          context: req.body.context,
          date: date,
          time: time,
        });
      } catch (error) {
        console.error(error);
        next(error);
      }
    
});

router.get('/loglists', async (req, res, next) => { //GET accounts
  try {
    const test = req.body.sttdate;
    //console.log('test',test);
    const logs = await Logs.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['field', 'context', 'date', 'time'],
    });
    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    next(error);
  }
});



router.post('/loglists', async (req, res, next) => { //GET accounts
  const Op = Sequelize.Op; 
  const sttdate = req.body.sttdate;
  const enddate = req.body.enddate;
  const field = req.body.field;
  
  try {
    if (field === '전체') {
      let where = { date : {[Op.and] : { [Op.gte] : sttdate, [Op.lte]:enddate }}}
       const logs = await Logs.findAll({
           where: where,
           order: [['createdAt', 'DESC']],
           attributes: ['field', 'context', 'date', 'time'],
         }); 
         res.status(200).json(logs);
    } else {
      let where = { date : {[Op.and] : { [Op.gte] : sttdate, [Op.lte]:enddate }}, field : field }
       const logs = await Logs.findAll({
           where: where,
           order: [['createdAt', 'DESC']],
           attributes: ['field', 'context', 'date', 'time'],
         }); 
         res.status(200).json(logs);
    }   
    
    

    //const test = await logs.findAll({
      //where: {context:'test에 의해 test의 계정권한 수정'},
    //})
   
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;