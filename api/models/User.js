/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {

	attributes: {
		username: {
			type: 'string',
			required: true,
			unique: true
		},
		password: {
			type: 'string',
			required: true
		},
		
		/**
		 * override toJson
		 * remove password from API
	 	*/
		toJSON: function() {
			var obj = this.toObject();
			delete obj.password;
			return obj;
		},

	},

	/**
	 * override beforeCreate
	 * encrypt user password
	 */	
	beforeCreate: function(user, cb) {

		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(user.password, salt, function(err, hash) {
				if (err) {
					console.log(err);
					cb();
				} else {
					user.password = hash;
					cb(null, user);
				}
			});
		});
	},
};
