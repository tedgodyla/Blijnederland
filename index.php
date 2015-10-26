<?php 

  	error_reporting(E_ALL ^ E_NOTICE);

  	$root = 'http://tedgodyla.nl/';
  	$public = './';

  	include_once('includes/functions.php');

  	$page = get_page();

	include_once('includes/header.php');
	include_once('includes/' . $page . '.php');
	include_once('includes/footer.php');

?>