Posts = new Meteor.Collection('posts');

Posts.allow({
	insert: function(userId, doc) {
		//only allow posting if logged in
		return !! userId;
	}
});

Meteor.methods({
	post: function(postAttributes) {
		var user = Meteor.user(), 
			postWithSameLink = Posts.findOne({url: postAttributes.url});

		// ensure user logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to post new stories");

		// ensure post has a title
		if (!postAttributes.title)
			throw new Meteor.Error(422, "Please fill in a headline");

		// check no previous posts with same link
		if (postAttributes.url && postWithSameLink) {
			throw new Meteor.Error(302,
				'This link has already been posted',
				postWithSameLink.id_);
		}

		// pick out the whitelisted keys
		var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'),{
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime()
		});

		var postId = Posts.insert(post);

		return postId;
	}
})