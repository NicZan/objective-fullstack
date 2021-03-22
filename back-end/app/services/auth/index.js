const passport = require("passport");
const passportJWT = require("passport-jwt");
const passportConfig = require("./passport.config.js");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
// const User = require("../user/user.model");
const jwt = require("jwt-simple");

const params = {
    secretOrKey: passportConfig.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
};

module.exports = function() {
    passport.use(new Strategy(params, function(payload, done) {
        // User.findById(payload.id, "_id name email +password type", function(err, user) {
        //     if (err){
        //         return done(err, false);
        //     }

        //     if (user) {
        //         try{
        //             done(null, user);
        //         }catch (err) {
        //             done(err, false);
        //         }
        //     } else {
        //         done(null, false);
        //     }
        // });
    }));

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", passportConfig.jwtSession);
        },
        authenticateOptional: (req, res, next) => {
            passport.authenticate("jwt", passportConfig.jwtSession, function(err, user) {
                if (err) {
                    return next(err);
                }

                if(user){
                    req.user = user;
                }

                return next();
            })(req, res, next);
        },
        encodeIdUser: function(id ) {
            return jwt.encode({id}, passportConfig.jwtSecret)
        },
    };
};
