<?php

function get_page()
{
	$result = "";

	$page = $_GET['page'];
	$page = ( !$page ) ? 'homepage' : $page;
	
	$filename = 'includes/' . $page . '.php';
	
	$result = ( !file_exists( $filename ) ) ? '404' : $page; 

	return $result;
}

function get_title($page)
{
	return ($page != "homepage") ? $page . " | Blij Nederland" : "Blij Nederland";
}

function pretty_dump($data)
{
	echo "<br><br><pre>";
	var_dump($data);
	echo "</pre><br>";
}

function print_submit($str, $align = true)
{
	ob_start();

	if ($align)
	{
		echo '<div class="text-center">';
	}

	echo '<input class="submit" type="submit" value="' . $str . '">';
	
	if ($align)
	{
		echo '</div>';
	}

	$output = ob_get_contents();

	ob_end_clean();

	return $output;
}

function print_question ($questions, $propname, $options = false)
{
	$question = $questions->$propname;

	if (!is_array($options))
	{
		$options = array();
	}

	ob_start();

	if ($question)
	{
		?>
		<section class="q">
			<?php
			$type = $question->type;
			if ($type == "text" || $type == "number")
			{
				if ($question->label)
				{
					?>
					<label for="<?= $propname ?>"><?= $question->label; ?></label>
					<?php
				}
				?>
				<input id="<?= $propname ?>" type="<?= $type; ?>" name="<?= $propname ?>">
				<?php
			}

			if ($type == "slider")
			{
				if ($question->label)
				{
					?>
					<label for="<?= $propname ?>"><?= $question->label; ?></label>
					<?php
				}
				?>
				<p id="text_<?= $propname ?>"></p>
				<input type="hidden" name="<?= $propname ?>" id="input_<?= $propname ?>">
				<div class="slider" id="slider_<?= $propname ?>"></div>
				<script>
					var minValue = <?= $question->range->min; ?>,
						maxValue = <?= $question->range->max; ?>,
						valValue = Math.round((minValue + maxValue) / 2);

					$("#input_<?= $propname ?>").val(valValue);
					$("#text_<?= $propname ?>").text(valValue);
					$("#slider_<?= $propname ?>").slider({
						range: false,
						min: minValue,
						max: maxValue,
						value: valValue,
						step: 1,
						animate: "fast",
						slide: function( event, ui ) {
							var value = ui.value; 
							var text = ( value === minValue ) ? 'Geen' : value;
				        	$("#input_<?= $propname ?>").val(value);
				        	$("#text_<?= $propname ?>").text(text);
				      	}
					});

				</script>
				<?php
			}

			if ($type == "select")
			{
				?>
				<label for="<?= $propname; ?>"><?= $question->label; ?></label>
				<select id="<?= $propname; ?>" name="<?= $propname; ?>" class="select">
					<?php
					$first_option = true;
					for ($i = 0; $i < count($question->options); $i++) {
						$options = $question->options[$i];
						if (is_string($options))
						{
							$selected = ($first_option) ? " selected": "";
							?>
							<option value="<?= $options; ?>"<?= $selected; ?>><?= $options; ?></option>
							<?php
							$first_option = false;
						}

						else
						{
							foreach ($options as $optionkey => $optionval) {
								$selected = ($first_option) ? " selected": "";
								?>
								<option value="<?= $optionval; ?>"<?= $selected; ?>><?= $optionkey; ?></option>
								<?php
								$first_option = false;
							}
						}
					}
					?>
				</select>
				<?php
			}

			if ($type == "radio")
			{
				?>
				<span class="label"><?= $question->label; ?></span>
				<?php
				$first_option = true;

				for ($i = 0; $i < count($question->options); $i++) {
					foreach ($question->options[$i] as $optionkey => $optionval) {
						$checked = ($first_option) ? " checked": "";
						?>
						<div class="radiobutton">
							<input id="<?= $propname . $optionval; ?>" value="<?= $optionval; ?>" type="radio" name="<?= $propname; ?>" <?= $checked; ?>>
							<label class="labeltext" for="<?= $propname . $optionval; ?>">
								<div class="bg"></div>
								<div class="labelanswer"><?= $optionkey; ?></div>
							</label>
						</div>
						<?php
						$first_option = false;
					}
				}
				?>
				<div class="clear"></div>
				<?php
			}

			if ($type == "radiobutton")
			{
				$radiooptions = array();

				$i = 0;
				foreach ($question->options as $option)
				{
					$radiooptions[$i] = array($option);
					$i++;
				}

				$i = 0;
				foreach ($question->icons as $icon)
				{
					array_push($radiooptions[$i], $icon);
					$i++;
				}

				?>
				<?php
				$first_option = true;
				foreach ($radiooptions as $option) {
					$checked = ($first_option) ? " checked": "";
					?>
					<div class="radiobutton">
						<input id="<?= $propname . $option[0]; ?>" value="<?= $option[0]; ?>" data-icon="<?= $option[1]; ?>" type="radio" name="<?= $propname; ?>" <?= $checked; ?>>
						<label for="<?= $propname . $option[0]; ?>">
							<div class="bg"></div>
							<div class="icon icon-<?= $option[1]; ?>"></div>
						</label>
					</div>
					<?php
					$first_option = false;
				}
			}
			?>
		</section>
		<?php
	}

	else if (is_null($questions))
	{
		echo "Syntax error: There is a fault in the questions json file";
	}

	else
	{
		echo "Error: There is no question with that propertie name";
	}

	$output = ob_get_contents();

	ob_end_clean();

	return $output;
}

?>