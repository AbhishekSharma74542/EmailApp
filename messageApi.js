	var path    = require("path");
	
	var messages = require(__dirname+'/message.json'),
			_        = require('underscore'),
			moment   = require('moment');

		var DUMMY_BODY = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas egestas leo sit amet justo vehicula tincidunt. Nullam a ipsum vitae ipsum feugiat sodales gravida quis nibh. Integer sed condimentum mauris. Maecenas venenatis purus quis nisl consequat, ac iaculis mi congue. Nunc ac turpis vel sapien maximus iaculis. Nunc in mollis lectus. Cras sem nisi, auctor eu malesuada consectetur, bibendum et tortor. Ut interdum nisl sed magna ullamcorper, ut pulvinar ligula luctus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Etiam in tempor est. Praesent egestas rutrum ex sed ornare. Duis mi neque, vehicula et vehicula ut, convallis nec felis. Morbi mattis vitae massa sed rhoncus. Integer pulvinar tincidunt eros. Etiam ornare metus ac viverra placerat. Integer vel nunc et quam varius accumsan at in nibh. Fusce at luctus odio, vitae dictum mauris. Nulla facilisi. Cras non lorem porta, porta neque quis, ornare urna. Proin eleifend pretium neque id vestibulum. Ut condimentum mauris nec ipsum mollis molestie. Vivamus at erat lorem. In odio dui, molestie a accumsan sit amet, semper sed arcu. Sed ornare sed justo a ultrices. Fusce non consectetur lacus.'

		/**
		 * This will give you a list of messages currently available
		 */
		exports.getAllMessages = function (req, res, next) {
			console.log("Coming to take messages");
			var msgCopy = JSON.parse(JSON.stringify(messages));
			// Remove unnecessary keys from the list response
			var finalData = _.chain(msgCopy).map(function (msg, id) {
				msg.ts           = moment().subtract(id, 'minutes').unix();
				msg.id           = Number(id);
				msg.participants = _.pluck(msg.participants, 'name');
				return msg;
			}).value();
			res.send(finalData);
		};

		/**
		 * This will give you a message with the id = :id
		 */
		exports.getMessage = function (req, res, next) {
			var msgCopy = JSON.parse(JSON.stringify(messages));
			var id      = Number(req.params.id);
			var msg     = msgCopy[id];
			if (!msg) {
				res.status(404).send({status: 404});
				return;
			}

			msg.id   = id;
			msg.body = DUMMY_BODY;
			msg.ts   = moment().subtract(id, 'minutes').unix();
			res.send(msg);
		};

		/**
		 * This will delete the message with id = :id.
		 * Please not the deleted message will come back once you restart the server
		 */
		exports.deleteMessage = function (req, res, next) {
			var id  = Number(req.params.id);
			console.log(id)
			var msg = messages[id];
			console.log(msg);
			if (!msg) {
				res.send("Message Already Deleted");
				console.log("Returning 400 status");
				return;
			}
			
			delete messages[id];
			console.log("Deleting Message");
			res.send("Message Deleted");
		};