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

		foreach ($questions as $subject => $question) {
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
						<input type="submit" value="volgende">
					</form>
				</section>
			</article>
			<?php
		}
		?>	
	</section>

	<section class="cards pushtop">
		<section class="card card-user">

			<div class="edit">
							<input id="geslachtNlUni" value="uni" data-icon="female" type="button" name="edit">
							<label for="geslachtNlUni">
								<div class="bg"></div>
								<div class="icon icon-pencil"></div>
							</label>
			</div>


			<div class="share">
							<input id="share" value="uni" data-icon="female" type="button" name="share">
							<label for="geslachtNlUni">
								<div class="bg"></div>
								<div class="icon icon-social-facebook"></div>
							</label>
			</div>
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