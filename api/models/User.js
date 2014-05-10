var bcrypt = require('bcrypt');

module.exports = {
	attributes: {
		username: {
			type: 'string',
			required: true,
			unique: true
		},
		email: {
			type: 'email',
			required: true,
			unique: true
		},
		first_name: {
			type: 'string',
			required: true
		},
        role: {
            type: 'INTEGER',
            required: false
        },

        make: {
            type: 'string',
            required: false
        },
        model: {
            type: 'string',
            required: false
        },
        year: {
            type: 'INTEGER',
            required: false
        },
        plate: {
            type: 'string',
            required: false
        },
        state: {
            type: 'INTEGER',
            required: false
        },
        no: {
            type: 'string',
            required: false
        },



		message_count: {
			type: 'number'
		},
		// A User can have many messages
		messages: {
			collection: 'message',
			via: 'user'
		},
		passports : { collection: 'Passport', via: 'user' }
        //,       "cars":'array'
	},

	getAll: function() {
		return User.find()
		.then(function (models) {
			return [models];
		});
	},

	getOne: function(id) {
		return User.findOne(id)
		.then(function (model) {
			return [model];
		});
	}
};