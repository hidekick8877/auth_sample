/**
 * UserController
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

module.exports = {
	
	/**
	 * account management view
	 * /user/manage
	 */
	manage: function(req, res) {
		sails.log.debug('user/manage');
		res.view({});
	},

	/**
	 * create user account
	 * user/create
	 */
	create: function(req, res) {
		console.log('/user/create');

		User.create({
			username: req.param('username'),
			password: req.param('password')
		}).done(function(err, user) {
			if (err) {
				// do not need '/'
				// object or array だけjsonにする？
				return res.view('user/result', {'src':'create', 'result':'error', 'detail':JSON.stringify(err)});
			}
			return res.redirect('/auth/login');
		});
	},

	/**
	 * delete user account
	 * /user/destroy
	 */
	destroy: function(req, res) {
		sails.log.debug('/user/destroy');
		
		User.destroy({
			username: req.param('username')
		}).done(function(err) {	
			if (err) {
				return res.view('user/result', {'src':'destory', 'result':'error', 'detail':JSON.stringify(err)});
			}
			return res.view('user/result', {'src':'destroy', 'result':'success'});
		});
	},
   
	/**
	 * action result view
	 * /user/result
	 */
	result: function(req, res) {
		console.log('user/result');
		res.view({});
	},	
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}

  
};
