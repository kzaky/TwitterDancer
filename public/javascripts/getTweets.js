//#***********************************************************************
//# FILENAME :        getTweets.js,           
//#
//# DESCRIPTION :
//#       Handles the submit for the requested user timeline
//#
//# CHANGES LOG : -   "14 JAN 2015"   create, fetch, makepath implementation
//#               -   "16 JAN 2015"   display
//#               -   "17 JAN 2015"   fixes to makepath "/" handeling  
//# NOTES :
//#       All of the functions included in this file perform tasks or functions that
//#       are simple to perform in jQuery/jQuery UI
//#
//# AUTHOR :    Khaled Zaky        DATE CREATED :    14 JAN 2015
//#***********************************************************************/
(function ($, window, document, undefined) {
    "use strict";

    $.widget('twitterdancer.recentTweets', {
        request: null,
        initTweet: null,

        create: function () {
            var base = this;
            this.initTweet = $( '#user-recent-tweet' ).html();
            base.element.submit(function ( e ) {
                e.preventDefault();
                base.fetch();
            });
            return base;
        },

        fetch: function () {
            var base      = this,
                URL = base.makePath();
                base.request = $.ajax({
                    url: URL,
                    type: 'GET',
                    dataType: 'JSON',
                    },
                });
                base.request.done(function ( recentTweets ) {
                    base.display( recentTweets );
                });
            return base;
        },

        display: function ( recentTweets ) {
            var base      = this,
                allTweets = base.element.find( '.recentTweets' ),
                tweet;
            $.each( recentTweets, function ( i, recentTweet ) {
                tweet = base.initTweet;
                tweet = tweet.replace( '{text}', recentTweet.text );
                allTweets.append( tweet );
            });
        },
        
        makePath: function () {
            var url              = this.element.attr( 'action' ),
                username         = this.element.find( 'input#username' ).val(),
                hasTrailingSlash = url.substring( url.length - 1 ) === '/';
            return url + (hasTrailingSlash ? '' : '/') + username;
        },
    });

    $('form.getTweets').recentTweets();

})(jQuery, window, document);