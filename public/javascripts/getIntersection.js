//#***********************************************************************
//# FILENAME :        getIntersectio.js,           
//#
//# DESCRIPTION :
//#       Handles the submit for the requested intersection between two users
//#
//# CHANGES LOG : -   "17 JAN 2015"   create, print, makepath implementation
//#               -   "18 JAN 2015"   appendIntersection, list, fix print
//#               -   "18 JAN 2015"   fixes to makepath / handeling  
//# NOTES :
//#       All of the functions included in this file perform tasks or functions that
//#       are simple to perform in jQuery/jQuery UI
//#
//# AUTHOR :    Khaled Zaky        DATE CREATED :    16 JAN 2015
//#***********************************************************************/
(function ($, window, document, undefined) {
    "use strict";

    $.widget('twitterdancer.intersection', {
        request: null,
        initialUser: null,

        create: function () {
            var base = this;
            base.initialUser = this.element.find( '#common-following' ).html();
            base.element.submit(function ( e ) {
                e.preventDefault();
                base.print();
            });
        },

        print: function () {
            var base      = this,
                actionURL = base.makePath(),
                getRequest, usersIntersection;
            usersIntersection = this.element.find( '.intersection' );
            getRequest = $.ajax(actionURL, { type: 'GET', dataType: 'JSON', beforeSend: function () {
                usersIntersection.html( null );
                }});
            getRequest.done(function ( users ) {
                base.list (users)
            });
            return base;
        },

        list: function () {
            var intersection = users[0];
                for ( var i = 0; i < intersection.length; i++ ) {
                    var user = intersection[i];
                    base.appendIntersection( user );
                }
        },

        appendIntersection: function ( user ) {
            var twitterUser   = this.initialUser,
                usersIntersection = this.element.find( '.intersection' );
            twitterUser = twitterUser.replace( '{screen_name}', user.screen_name );
            usersIntersection.append( twitterUser );
        },

        makePath: function () {
            var URL       = this.element.attr( 'action' ),
                usernames = [];
            this.element.find( 'input' ).each(function ( i, username ) {
                usernames.push( $( username ).val() );
            });
            return URL + '/' + usernames.join( '/' );
        },
    });

    $('form.getIntersection').intersection();

})(jQuery, window, document);