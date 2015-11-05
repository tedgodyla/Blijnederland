<?php

	$questions = $question_json->questions;

	$total_questions = 0;
	foreach ($questions as $key => $props) {
		$total_questions++;
	}

	$steps_width = 100 / $total_questions;
?>

<section class="fillcard container">
	<section class="questions">
		<?php
		$questions = $question_json->questions;
		$i = 0;
		foreach ($questions as $subject => $question) {
			$submittext = ($subject == "Gelukkigheid") ? "Opslaan en vergelijk met Nederland": "Volgende";
			?>
			<article class="q-group">
				<h2 class="q-group-title"><?= $subject; ?>  </h2>
			
				<div class="arrow"></div> 
				<section class="q-group-questions">
					<form action="" method="post" name="<?= $subject; ?>" id="qform" class="qform">
						<?php
							foreach ($question as $qkey => $qprops) {
								echo print_question($question, $qkey);
							}
						?>
						<input type="submit" value="<?= $submittext; ?>">
					</form>
				</section>
			</article>
			<?php
			$i++;
		}
		?>	
	</section>

	<section class="cards pushtop">
		<section class="card card-user">
			<section class="geluk">
				<div class="fill"></div>
				<div class="text"></div>
			</section>
			<div class="edit icon icon-pencil"></div>
			<div class="share icon icon-social-facebook"></div>

			<section class="photo">
				<div id="profilesvg1"></div>
			</section>
			<section class="info">
				<span class="icon"></span>
				<h3>Naam</h3>
				<h4>Leeftijd</h4>
			</section>
		</section>
		<section class="card-stats">
			<div id="statssvg1">
			
			</div>
		</section>
	</section>
	<div class="clear"></div>
</section>