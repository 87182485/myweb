/**
 * Created by Gary on 11/19/2014.
 */
(function(){
  'use strict'

  angular.module('ngNewsApp')
    .factory('PostService', PostService);

  function PostService($firebase, FIREBASE_URL){
    var ref = new Firebase(FIREBASE_URL);
    var posts = $firebase(ref.child('posts')).$asArray();

    var PostService = {
      all:posts,
      create:function(post){
        return posts.$add(post).then(function(postRef){
          $firebase(ref.child('user_posts').child(post.creatorUID))
            .$push(postRef.name());

          return postRef;
        });
      },
      get:function(postId){
        return $firebase(ref.child('posts').child(postId)).$asObject();
      },
      delete: function (post){
        return posts.$remove(post);
      },
      comments: function(postId){
        return $firebase(ref.child('comments').child(postId)).$asArray();
      }
    };

    return PostService;
  }
})()
