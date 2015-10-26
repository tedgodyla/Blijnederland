<?php
	$json = file_get_contents("datasets/answers.json");
	$json = json_decode($json);

	$answers = $json->answers;

	if ($answers)
	{
		foreach ($answers as $guid => $props) {
			//var_dump($props);
		}
	}

	$questions = $question_json->profile;
?>

<section class="profile">
	<h1>Titel website</h1>
	<p>uitleg website</p>
	<article class="q-group">
		<h2 class="q-group-title">afd</h2>
		<section class="q-group-questions">
			<form action="" method="post" name="profile" id="profileform" class="profileform">
				<?php 

				echo print_question($questions, "naam");
				echo print_question($questions, "leeftijd");
				echo print_question($questions, "geslacht");

				?>
				<input type="submit" value="Maak pasport">
			</form>
		</section>
</section>