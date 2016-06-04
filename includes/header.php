<!DOCTYPE html>
<html lang="nl">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="keywords" content="" />
	<meta name="description" content="" />
	<meta name="author" content="" />
	<meta name="robots" content="" />
	<link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,600' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,700' rel='stylesheet' type='text/css'>
	
	<link href="lib/css/reset.css" rel="stylesheet">
	<link href="lib/css/jquery-ui.css" rel="stylesheet">
	<link href="lib/css/jquery-ui.structure.css" rel="stylesheet">
	<link href="lib/css/slick.css" rel="stylesheet">
  	<link href="lib/css/slick-theme.css" rel="stylesheet">
	<link href="lib/css/icons.css" rel="stylesheet">
	<link href="lib/css/style.css" rel="stylesheet">
	<link href="lib/css/styleCharacters.css" rel="stylesheet" >

	<!--[if lt IE 9]>
		<script src="lib/js/html5shim.js"></script>
	<![endif]-->
	<script src="lib/js/jquery-2.1.1.min.js"></script>
	<script src="lib/js/jquery-ui.min.js"></script>
	<script src="lib/js/TweenMax.min.js"></script>
	<script src="lib/js/functions.js"></script>
	<script src="lib/js/events.js"></script>
	<script src="lib/js/d3.min.js"></script>
    <script src="lib/js/d3.layout.js"></script>
    <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
  	<script src="lib/js/slick.min.js"></script>
	<script src="lib/js/animation.js"></script>
	<script src="lib/js/charts.js"></script>
	<script src="lib/js/interaction.js"></script>
	<title><?= get_title($page); ?></title>
	<?php include_once("analyticstracking.php") ?>
</head>
<body>
	<header id="header">
		<div class="container">
			<svg class="logo" x="0px" y="0px" width="222px" height="76" viewBox="0 0 446 153" >
				<g id="titel">
					<text transform="matrix(1 0 0 1 7 68)" fill="#bebbb0" font-family="'Pacifico'" font-size="72">Blij Nederland</text>
				</g>
				<g id="lach">
					<path fill="none" stroke="#bebbb0" stroke-width="14" stroke-miterlimit="10" d="M28,98c0,0,155,106,393,0"/>
					<g>
						<g>
							<g>
								<path fill="#bebbb0" d="M26.524,83.215c-4.207,9.392-8.793,18.607-13,28c-1.671,3.731-1.116,8.032,2.691,10.261
									c3.238,1.897,8.589,1.042,10.261-2.69c4.207-9.392,8.793-18.607,13-28c1.671-3.731,1.116-8.032-2.691-10.261
									C33.547,78.627,28.196,79.482,26.524,83.215L26.524,83.215z"/>
							</g>
						</g>
					</g>
					<g>
						<g>
							<path fill="#bebbb0" d="M409.5,89c1.136,8.491,2.938,16.752,5.268,24.994c2.627,9.293,17.101,5.34,14.465-3.987
								c-1.948-6.893-3.781-13.895-4.732-21.006c-0.542-4.051-3.002-7.5-7.5-7.5C413.323,81.5,408.957,84.937,409.5,89L409.5,89z"/>
						</g>
					</g>
				</g>
				<defs>
					<style type="text/css">@import url(https://fonts.googleapis.com/css?family=Pacifico);</style>
				</defs>
			</svg>
		</div>
	</header>
	
<?php
	$question_json = file_get_contents("datasets/questions.json");
	$question_json = json_decode($question_json);

	include_once('includes/intro.php');
	include_once('includes/profile.php');
	include_once('includes/fillcard.php');
	include_once('includes/overview.php');
	include_once('includes/subjectdata.php');
?>