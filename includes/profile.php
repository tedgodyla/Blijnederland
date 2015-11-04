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

<section class="flits"></section>
<section class="profile container pushtop">
	<section class="profile-wrap">
		<div class="left">
			<div id="keuzesvg1">
				<?php include("includes/svg/keuze.php"); ?>
			</div>
		</div>
		<div class="profile-intro">
			<h1>Hoe gelukkig ben jij?</h1>
			<p> Nederland behoort tot een van de gelukkigste landen ter wereld. 
			Maar voelt iedere Nederlander zich ook zo?
			<!-- Toch betekent dat niet dat iedere Nederlander dolgelukkig is. -->
			Op deze website vergelijk jij jouw geluk met dat van de gemiddelde Nederlander. </p>
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
			<p class="disclaimer">Disclaimer: alle gegevens die ingevoerd worden zullen opgeslagen worden. Uw naam zal niet gedeeld worden met derden of publiek gesteld worden.</p>
		</div>
		<div class="clear"></div>
	</section>
</section>