<section class="overview container pushtop">
	<section class="cards">
		<section class="card card-user">
			<section class="photo">
				<div id="profilesvg"></div>
			</section>
			<section class="info">
				<span class="icon"></span>
				<h3>Naam</h3>
				<h4>Leeftijd</h4>
			</section>
		</section>

		<section class="card card-nl">
			<section class="photo">
				<div id="profilesvg"></div>
			</section>
			<form action="" method="post" name="geslachtnl" id="geslachtnlform" class="geslachtnlform">
				<section class="info">
					<section class="q">
						<div class="radiobutton">
							<input id="geslachtNlMan" value="Man" data-icon="male" type="radio" name="geslacht" checked="">
							<label for="geslachtNlMan">
								<div class="bg"></div>
								<div class="icon icon-male"></div>
							</label>
						</div>
						<div class="radiobutton">
							<input id="geslachtNlVrouw" value="Vrouw" data-icon="female" type="radio" name="geslacht">
							<label for="geslachtNlVrouw">
								<div class="bg"></div>
								<div class="icon icon-female"></div>
							</label>
						</div>
					</section>	
					<h3>Nederland</h3>
					<h4 id="text_leeftijdNl">Leeftijd</h4>
				</section>
				<section class="slider">
					<input type="hidden" name="leeftijdNl" id="input_leeftijdNl">
					<div class="slider" id="slider_leeftijdNl"></div>
				</section>
			</form>
		</section>
	</section>
	<section class="chart">
		<div id="overviewsvg1"></div>
	</section>
</section>