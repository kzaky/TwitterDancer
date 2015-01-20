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
        _request: null,
        _initTweet: null,

        // Reset
        _reset: function () {
            if ( this._request !== null ) {
                this._request.abort();
                this._request = null;
            }

            this.element.find( '.recentTweets' ).html( null ).removeClass( 'hidden' );
        },

        // Handle Submit and Reset
        _create: function () {
            var base = this;

            this._initTweet = $( '#user-recent-tweet' ).html();

            base.element.submit(function ( e ) {
                e.preventDefault();
                base._fetchTweets();
            });

            base.element.bind('reset', function ( e ) {
                base._reset();
            });

            base._reset();

            return base;
        },

        _fetchTweets: function () {
            var base      = this,
                URL = base._makePath();

                base._request = $.ajax({
                    url: URL,
                    type: 'GET',
                    dataType: 'JSON',
                    beforeSend: function () {
                        base._reset();
                    },
                });
                base._request.done(function ( recentTweets ) {
                    base._display( recentTweets );
                });
            return base;
        },

        _display: function ( recentTweets ) {
            var base      = this,
                allTweets = base.element.find( '.recentTweets' ),
                tweet;

            $.each( recentTweets, function ( i, recentTweet ) {
                tweet = base._initTweet;
                tweet = tweet.replace( '{text}', recentTweet.text );

                allTweets.append( tweet );
            });
        },

        _makePath: function () {
            var url              = this.element.attr( 'action' ),
                username         = this.element.find( 'input#username' ).val(),
                slash = url.substring( url.length - 1 ) === '/';

            return url + (slash ? '' : '/') + username;
        },
    });

    $('form.getTweets').recentTweets();

})(jQuery, window, document);