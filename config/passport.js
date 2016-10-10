var LocalStrategy    = require('passport-local').Strategy;
TwitterStrategy  = require('passport-twitter').Strategy,
    FacebookStrategy  = require('passport-facebook').Strategy,
    async = require('async'),
    validate = require('validator'),
    passport_config = require('./index.js').passport;

module.exports = function(passport, db, utilities) {

    /*****************************************************************
     ***
     *** Passport Session Setup
     *** This is required for persistent login sessions
     ***
     ******************************************************************/

    /* Used to serialize the user for the session ********************************/
    passport.serializeUser(function(user, done) {

        var serializeData = {
            userId: user.id,
            username: user.username,
            email: user.email,
            user_rank: user.user_rank,
        
        };

        done(null, serializeData);

    });

    /* Used to deserialize the user for the session ******************************/
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    /*****************************************************************
     ***
     *** Local Login (Username/Password)
     ***
     ******************************************************************/

    /***
     *
     * Local Registration
     *
     ***/

    passport.use('local-registration', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {

            var hashed_password;

            /* Validate registration details ********************************/

            if (validate.isLength(username, 3, 20) == false) { /* Username must be between 3 and 20 characters */
                return done(null, false, 'Please keep username between 3 and 20 characters.');
            }
            if (validate.isEmail(req.body.email) == false) { /* Make sure a typical email address is entered */
                return done(null, false, 'Invalid email address.');
            }
            if (password.length < 5) { /* Password length must be more than 5 characters */
                return done(null, false, 'Password must be 5 characters or more.');
            }
            if (password != req.body.confirmPassword) { /* Make sure both passwords match */
                return done(null, false, 'Passwords do not match.');
            }

            /* If details pass validation tests, carry on ********************************/

            async.series([
                function(callback) {

                    utilities.encryptUserPassword(password, function(result) {
                        hashed_password = result;
                        callback();

                    });

                }, function(callback) {

                    /* Check if the username or email address is already present in the database */
                    db.user.count({

                        where: db.sequelize.or(
                            { email: req.body.email },
                            { username: username }
                        )

                    }).then(function(result) {

                        if (result > 0) {

                            /* If the username or email already exists, do something here */
                            return done(null, false, 'Username or email already in use.');

                        } else {

                            /* If the username and email address are both unused, register the user */
                            db.user.create({

                                username: username,
                                email: req.body.email,
                                password: hashed_password,
                                user_rank: 'user'

                            }).then(function(user) {

                                /* Get the latest user details and pass them to the done function ***/
                                db.user.find({where: {'username': user.username}}).then(function(user) {
                                    return done(null, user);
                                });

                            }).error(function() {

                                return done(null, false, 'Unknown error. Please try again.');

                            });

                        }

                    });

                    callback();

                }

            ]);

        }
    ));

    /***
     *
     * Local Login
     *
     ***/

    passport.use('local-login', new LocalStrategy({

            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true

        },

        function(req, username, password, done) {

            db.user.find({ where: {username: username}}).then(function(user) {

                /* Check user exists in database ********************************/

                if (!user) {
                    return done(null, false, 'Username incorrect.');
                }

                /* Check password is correct ************************************/

                utilities.compareUserPassword(password, user.password, function(result) {

                    if (result == false) {

                        return done(null, false, 'Password incorrect.');

                    } else {

                        /* If user exists and password is correct, log them in **********/
                        return done(null, user);

                    }
                });



            });

        }

    ));


}