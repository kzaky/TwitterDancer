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
        _request: null,
        _initialUser: null,

        _create: function () {
            var base = this;

            base._initialUser = this.element.find( '#common-following' ).html();

            base.element.submit(function ( e ) {
                e.preventDefault();
                base._print();
            });
        },

        _print: function () {
            var base      = this,
                actionURL = base._makePath(),
                getRequest, usersIntersection;
            
            usersIntersection = this.element.find( '.intersection' );
            getRequest = $.ajax(actionURL, { type: 'GET', dataType: 'JSON', beforeSend: function () {
                usersIntersection.html( null );
                }});

            getRequest.done(function ( users ) {
                var intersection = users[0];
                for ( var i = 0; i < intersection.length; i++ ) {
                    var user = intersection[i];
                    base._appendIntersection( user );
                }
            });
            return base;
        },

        _appendIntersection: function ( user ) {
            var twitterUser   = this._initialUser,
                usersIntersection = this.element.find( '.intersection' );

            twitterUser = twitterUser.replace( '{screen_name}', user.screen_name );

            usersIntersection.append( twitterUser );
        },

        _makePath: function () {
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