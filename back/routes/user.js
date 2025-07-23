const express = require('express');
const bcrypt = require('bcrypt'); //암호화 프로그램
const passport = require('passport');
const dayjs = require('dayjs');

const { Logs, User } = require('../models');
const { isLoggedIn, isNotLoggedIn} = require('./middlewares');


const router = express.Router();

//로그인되어있는지 확인
router.get('/', async (req, res, next) => {
  //console.log(req.headers); //쿠키가 제대로 전달되는지 확인 쿠키는 header에 들어있음
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: {id: req.user.id},
        attributes: ['id', 'userid', 'username', 'authority', 'theme', 'section'], //적은 내용만 들고오겠다.
      })
      if(fullUserWithoutPassword) {
        res.status(200).json(fullUserWithoutPassword);
      } else {
        const UserWithoutPassword = await Historyuser.findOne({
          where: {id: user.id},
          attributes: ['id', 'userid', 'username', 'authority', 'theme', 'section'], //적은 내용만 들고오겠다.
        })
        res.status(200).json(UserWithoutPassword);
      }
      
    } else {
      res.status(200).json(null);
    }    
  } catch (error) {
    console.error(error);
    next(error);
  }
  
});

//로그인
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    const day = dayjs();
    const date = day.format('YYYY-MM-DD');
    const time = day.format('HH:mm:ss');
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    Logs.create({
        field: '로그인',
        context: user.userid+'의 로그인',
        date: date,
        time: time,
      });
   

    return req.login(user, async (loginErr) => {
      if (loginErr) { 
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: {id: user.id},
        attributes: ['id', 'userid', 'username'], //적은 내용만 들고오겠다.
      })

      if (fullUserWithoutPassword){
       // console.log('test');
        return res.status(200).json(fullUserWithoutPassword);
        
      } else if (!fullUserWithoutPassword){
        const UserWithoutPassword = await User.findOne({
          where: {id: user.id},
          attributes: ['id', 'userid', 'username'], //적은 내용만 들고오겠다.
        })
        return res.status(200).json(UserWithoutPassword);
      }
      
    })
  })(req, res, next);
});

//로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
  //req.session.destroy();
  //res.send('ok');
  //console.log('logout OK');
});


//회원가입
router.post('/register', isNotLoggedIn, async(req, res, next) => { //POST /user/register
  const day = dayjs();
  const date = day.format('YYYY-MM-DD');
  const time = day.format('HH:mm:ss');

  console.log(req,res)
  try {

      const exUser = await User.findOne({
        where: {
          userid : req.body.userid,
        }
      });
      if (exUser) {
        return res.status(403).send('이미 사용중인 아이디입니다.');
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await User.create({
        userid: req.body.userid,
        username: req.body.username,
        password: hashedPassword,
        authority: req.body.authority,
        section: 1,
      });
      await Logs.create({
        field: '계정관리',
        context: req.body.userid+'의 사용자등록',
        date: date,
        time: time,
      });
    
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); //대신 미들웨어에서 설정
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
  
});

//테마설정
router.patch('/theme', async (req, res, next) => {
  try {
    await User.update({
      theme: req.body.theme,      
    },{
      where: { id: req.body.id },
    });
    res.status(200).json({ Authority: req.body.theme });
  }catch (error) {
    console.error(error);
    next(error);
  }
})




module.exports = router;