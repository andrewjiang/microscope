Posts = new Meteor.Collection('posts');

Posts.allow({
	insert: function(userId, doc) {
		//only allow posting if logged in
		return !! userId;
	}
})