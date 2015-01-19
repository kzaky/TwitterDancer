#***********************************************************************
# FILENAME :        TwitterAPI.pm,           
#
# DESCRIPTION :
#       Performs the initialization of the Redis server, and the Twitter API.
#       Performs operations to fetch the user tweets or timeline and figures
#		out the intersection between two users
#
# PUBLIC FUNCTIONS :
#       getTweets
#       getIntersection
#       int          bigintegeraverage (int x, int y)
#
# CHANGES LOG : -  	"13 JAN 2015" 	Twitter API initialization
#				-	"14 JAN 2015"	getTweets and getIntersection Implementation
#          		-	"16 JAN 2015"	Redis implementation and initialization
# NOTES :
#       All of the functions included in this file perform tasks or functions that
#		are simple to perform in Perl using the library inclusion below
#
# AUTHOR :    Khaled Zaky        DATE CREATED :    13 JAN 2015
#***********************************************************************/
package TwitterDancer::TwitterAPI;

# Library inclusions
require JSON;
require Net::Twitter;
require Redis;

use Dancer ':syntax';


#/********************************************************************
#*
#* FUNCTION NAME: getTweets
#*
#* DESCRIPTION:  returns the users timeline. No specs or definition
#*				 for "Recent" so it was limited to 20 tweets. But itCould
#*					scale to more by changing the count variable
#*
#* RETURN:   The last 20 tweets using the twitter API
#*
#* PROCESS :
#*                   [1]  Passes the screen_name to the twitter API
#*                   [2]  Passes the requested tweet count to the twitter API
#* NOTES :    
#*
#*******************************************************************/
sub getTweets {
	return initTwitterAPI()->user_timeline({
		screen_name => $_[0],
		count       => 20,
	});
};

#/********************************************************************
#*
#* FUNCTION NAME: getIntersection
#*
#* DESCRIPTION:  returns the intersection of two users twitter "following" lists
#*
#* RETURN:   The interesection of friends followed by two users
#*
#* PROCESS :
#*                   [1]  Each user gets their own keyspace
#*                   [2]  Goes through all the pages of friends and stores 
#*						  them pages in Redis
#*                   [3]  Run a redis set intersection operation to figure 
#*						  out the common users they follow
#*                   [4]  Acquire all intersection ids user information
#*                   [5]  Voila, we have the intersection users
#* NOTES :    
#*
#*******************************************************************/
sub getIntersection {
	my $twitter  = initTwitterAPI();
	my $redis    = initRedis();
	my $keyspace = $redis->incr( 'intersection' );
	my @set_keys;
	my @intersection_ids;
	my @intersection;

	for my $screen_name ( @_ ) {
		my $set_key = $keyspace . ':' . $screen_name;
		push( @set_keys, $set_key );
		for ( my $cursor = -1, my $response; $cursor; $cursor = $response->{next_cursor} ) {
			$response = $twitter->friends_ids({
				screen_name => $screen_name,
				cursor      => $cursor,
			});
			$redis->sadd( $set_key, @{ $response->{ids} } );
		}
	}
	
	@intersection_ids = $redis->sinter( @set_keys );
	$redis->del( @set_keys );

	while ( my @batch_ids = splice( @intersection_ids, 0 , 100 ) ) {
		push @intersection, $twitter->lookup_users({
			user_id          => \@batch_ids,
			include_entities => 0,
		});
	}
	return \@intersection;
};

#/********************************************************************
#*
#* FUNCTION NAME: initRedis
#*
#* DESCRIPTION:  initializes redis server
#*
#* PROCESS :
#*                   [1]  Gets the Redis server address from the env config file
#*                   [2]  Gets the Redis password from the env config file
#*
#* NOTES :           Changed from local to RedisToGo     
#*
#*******************************************************************/
sub initRedis {
	return Redis->new(
		server   => config->{redis_server},
		password => config->{redis_password} || undef,
	);
};

#/********************************************************************
#*
#* FUNCTION NAME: initTwitterAPI
#*
#* DESCRIPTION:  Initializes the twitter API by passing the twitter app info
#*
#* RETURN:   A pointer to destination buffer 
#*
#* PROCESS :
#*                   [1]  Utilizes the Twitter REST API
#*                   [2]  Gets the consumer_key from the env config file
#*                   [2]  Gets the consumer_secret from the env config file
#*                   [2]  Gets the access_token from the env config file
#*                   [2]  Gets the access_token_secret from the env config file
#*
#* NOTES :   A twitter application has to be created on the twitter dev center       
#*
#*******************************************************************/
sub initTwitterAPI {
	return Net::Twitter->new(
		ssl    => 1,
		traits => [qw/API::RESTv1_1/],
		consumer_key        => config->{consumer_key},
		consumer_secret     => config->{consumer_secret},
		access_token        => config->{access_token},
		access_token_secret => config->{access_token_secret},
	);
};

1;