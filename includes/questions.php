<?php

	$questions = $question_json->questions;

	$total_questions = 0;
	foreach ($questions as $key => $props) {
		$total_questions++;
	}

	$steps_width = 100 / $total_questions;
?>

<section class="q-container">
	<h2>Questions</h2>
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