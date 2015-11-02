<?php

	$questions = $question_json->questions;

	$total_questions = 0;
	foreach ($questions as $key => $props) {
		$total_questions++;
	}

	$steps_width = 100 / $total_questions;
?>

<section class="fill-card container">
	<section class="questions">
		<?php
		$questions = $question_json->questions;

		foreach ($questions as $subject => $question) {
			?>
			<article class="q-group">
				<h2 class="q-group-title"><?= $subject; ?></h2>
				<section class="q-group-questions">
					<form action="" method="post" name="<?= $subject; ?>" id="qform" class="qform">
						<?php
							foreach ($question as $qkey => $qprops) {
								echo print_question($question, $qkey);
							}
						?>
						<input type="submit" value="volgende">
					</form>
				</section>
			</article>
			<?php
		}
		?>	
	</section>

	<section class="card pushtop">
		<section class="card-profile">
			<section class="photo">
				<div id="profilesvg"></div>
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
</section>