const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const db = require('../../models');

// เช็คว่า Token ที่เข้ามา เป็นของจริงหรือ ของ ปลอม
const option = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRETOFKEY
};

const JWTStrategy = new Strategy( option, async (payload, done) => {
    const targetUser = await db.user.findOne( { where: { id: payload.id}});

    if(targetUser){
        done(null, targetUser);
    } else {
        done(null, false);
    }
} );


passport.use("่jwt", JWTStrategy);
