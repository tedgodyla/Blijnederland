<!DOCTYPE html>
<html lang="nl">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<meta name="author" content="" />
	<meta name="robots" content="" />
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:600italic,400,600,300' rel='stylesheet' type='text/css'>
	<link href="lib/css/reset.css" rel="stylesheet" type="text/css">
	<link href="lib/css/jquery-ui.css" rel="stylesheet" type="text/css">
	<link href="lib/css/jquery-ui.structure.css" rel="stylesheet" type="text/css">
	<link href="lib/css/style.css" rel="stylesheet" type="text/css">
	<!--[if lt IE 9]>
		<script src="lib/js/html5shim.js"></script>
	<![endif]-->
	<script src="lib/js/jquery-2.1.1.min.js"></script>
	<script src="lib/js/jquery-ui.min.js"></script>
	<script src="lib/js/TweenMax.min.js"></script>
	<script src="lib/js/functions.js"></script>
	<script src="lib/js/events.js"></script>
	<script src="lib/js/d3.min.js"></script>
	<script src="lib/js/animation.js"></script>
	<script src="lib/js/charts.js"></script>
	<script src="lib/js/interaction.js"></script>
	<title><?= $page ?> | Blij Nederland</title>
	<?php include_once("analyticstracking.php") ?>
</head>
<body>
<?php
	$question_json = file_get_contents("datasets/questions.json");
	$question_json = json_decode($question_json);

	include_once('includes/questions.php');
	include_once('includes/subjectdata.php');
?>