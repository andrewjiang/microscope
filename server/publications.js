Meteor.publish('posts', function() {
	return Posts.find();
});
Meteor.publish('somePosts', function() {
	return Posts.find({'author':'Tom Coleman'});
});