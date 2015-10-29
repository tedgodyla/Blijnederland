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

<section class="profile container pushtop">
	<section class="profile-wrap">
		<div class="left">
			<?php include_once("includes/svg/keuze.php"); ?>
		</div>
		<div class="right">
			<h1>Voorspel jouw geluk</h1>
			<p>Phasellus a urna fringilla, ultricies ante sed, mollis elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
			<article class="q-group card">
				<h2 class="q-group-title">Stel jezelf voor</h2>
				<p>Voer je geslacht, naam en leeftijd in.</p>
				<div class="line"></div>
				<section class="q-group-questions">
					<form action="" method="post" name="profile" id="profileform" class="profileform">
						<div class="left">
							<?php 
							echo print_question($questions, "geslacht");
							?>
						</div>
						<div class="right">
							Hallo, ik ben <?= print_question($questions, "naam"); ?> en ik ben <?= print_question($questions, "leeftijd"); ?> jaar oud.
						</div>
						<div class="clear"></div>
						<div class="line"></div>
						<?= print_submit("Doorgaan"); ?>
					</form>
				</section>
			</article>
		</div>
		<div class="clear"></div>
	</section>
</section>