const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');


module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'password',
  }, async (userid, password, done) => {
    try {
      const user = await User.findOne({
        where: { userid }
      });
      if(!user) {
        return done(null, false, { reason: '존재하지 않는 사용자입니다.'});// done은 router/user.js 로그인에 (err,user,info)형식으로 들어감(변수는 아무렇게나 지정해도됨)
      }
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        if(user.authority === 2){
          return done(null, false, { reason: '관리자의 승인이 필요한 아이디입니다.'})
        }
        return done (null, user);
      }
      return done(null, false, { reason: '비밀번호가 틀렸습니다.'});
      } catch (error) {
        console.error(error);
        return done(error);
      }
    
  }));
};