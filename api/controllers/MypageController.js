/**
 * MypageController
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
	 * /mypage/index
	 */
	index: function(req, res) {

		User.find({
			id : req.session.userid
		}).done(function(err, user) {
			if (err) {
				// 
				sails.log.error('err : ' + err); 
			}
			if (!user) {
				sails.log.error('user : ' + user);
			}
			sails.log.debug('user: ' + JSON.stringify(user));
			res.view({'username': user[0]['username']});
		});
	},

	/**
	 * /mypage/subpage
	 */
	subpage: function(req, res) {
		
				res.view();
	},
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to MypageController)
   */
  _config: {}

  
};
