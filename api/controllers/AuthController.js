/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
var passport    = require('passport');

//helper functions
function findById(id, fn) {  
    User.findOne(id).exec(function (err, user) {
        if (err) {
            return fn(null, null);
        } else {
            return fn(null, user);
        }
    });
}

function findByUsername(u, fn) {  
    User.findOne({
        username: u
    }).exec(function (err, user) {
        // Error handling
        if (err) {
            return fn(null, null);
        // The User was found successfully!
        } else {
            return fn(null, user);
        }
    });
}


module.exports = {

	/**
	 * /auth/login
	 */
	login: function(req, res) {
		
		sails.log.debug('/auth/login');
		res.view({'result': null});
	},

	/**
	 * /auth/logout
	 */
	logout: function(req, res) {

		req.session.user = null ;
		req.session.authenticated = null;
		req.logout();
		res.view('auth/login', {'result':null});
	},

	/**
	 * process
	 */
	process: function(req,res){
		sails.log.debug('/auth/process');

		passport.authenticate('local', function(err, user, info){
			sails.log.debug('passporrt.auth err :' + err);
			sails.log.debug('passport.auth user:' + JSON.stringify(user));	
			sails.log.debug('passport.auth info:' + JSON.stringify(info));


			if ((err) || (!user)) {
				return res.view('auth/login', {'result':'error', 'detail':info['message']});
			}
			req.logIn(user, function(err){
				sails.log.debug('login err : ' + err);
				if (err) {
					return res.view('auth/login', {'result':'error', 'detail':JSON.sytringify(err)});
				}
				// to mypage
				req.session.userid = user[0].id;
				req.session.user = user[0].username;
				req.session.authenticated = true;
				return res.view('mypage/index', {'username':user[0].username});
			});
		})(req, res);
	},

	/**
	* Overrides for the settings in `config/controllers.js`
	* (specific to AuthController)
	*/
	_config: {}
};



