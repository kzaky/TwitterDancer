#***********************************************************************
# FILENAME :        TwitterDancer.pm,           
#
# DESCRIPTION :
#       Perl Application for the dancer framework. The idea is to get a
#		specific user timeline or recent tweets. No defintion of recent tweets
#		provided so it was limited to 20.   bigintegeraverage (int x, int y)
#
# CHANGES LOG : -  	"13 JAN 2015" 	File created using the dancer cmd line tools
#				-	"14 JAN 2015"	getters done
# NOTES :
#       All of the functions included in this file perform tasks or functions that
#		are simple to perform in Perl & Dancer framework using the library inclusion below
#
# AUTHOR :    Khaled Zaky        DATE CREATED :    13 JAN 2015
#***********************************************************************/
package TwitterDancer;

# Library inclusions
use Dancer ':syntax';
use strict;
use warnings;
use TwitterAPI;

our $VERSION = '0.1';

set serializer => 'Mutable';

get '/' => sub {
  template 'layouts/main';
};

get '/recentTweets/:username' => sub {
	return TwitterDancer::TwitterAPI::getTweets( params->{username} );
};

get '/intersection/:username_1/:username_2' => sub {
	return TwitterDancer::TwitterAPI::getIntersection( params->{username_1}, params->{username_2} );
};

1;