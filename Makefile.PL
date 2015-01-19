use strict;
use warnings;
use ExtUtils::MakeMaker;

# Normalize version strings like 6.30_02 to 6.3002,
# so that we can do numerical comparisons on it.
my $eumm_version = $ExtUtils::MakeMaker::VERSION;
$eumm_version =~ s/_//;

WriteMakefile(
    NAME                => 'TwitterDancer',
    AUTHOR              => q{KHALED ZAKY <zakykhaled@gmail.com>},
    VERSION_FROM        => 'lib/TwitterDancer.pm',
    ABSTRACT            => 'Given a twitter username, display their most recent tweets OR Given two twitter usernames, display the intersection of the people that they follow',
    ($eumm_version >= 6.3001
      ? ('LICENSE'=> 'perl')
      : ()),
    PL_FILES            => {},
    PREREQ_PM => {
        'Test::More'    => 0,
        'YAML'          => 0,
        'Dancer'        => 1.3132,
        'JSON'          => 2.90,
        'Net::Twitter'  => 4.01007,
        'Redis'         => 1.976
    },
    dist                => { COMPRESS => 'gzip -9f', SUFFIX => 'gz', },
    clean               => { FILES => 'TwitterDancer-*' },
);
