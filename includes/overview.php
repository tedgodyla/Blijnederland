<section class="overview container pushtop">
	<section class="cards">
		<section class="card card-nl">
			<section class="geluk">
				<div class="fill"></div>
				<div class="text">Geluk</div>
				<div class="tooltip">10%</div>
			</section>
			<section class="photo">
				<div id="nlsvg1"></div>
			</section>
			<section class="info">
				
				<section class="q">
					<form action="" method="post" name="geslachtnl" id="geslachtnlform" class="geslachtnlform">
						<div class="radiobutton">
							<input id="geslachtNlMan" value="man" data-icontest="male" type="radio" name="geslacht" checked="">
							<label for="geslachtNlMan">
								<div class="bg"></div>
								<div class="icon icon-male"></div>
							</label>
						</div>
						<div class="radiobutton">
							<input id="geslachtNlVrouw" value="vrouw" data-icontest="female" type="radio" name="geslacht">
							<label for="geslachtNlVrouw">
								<div class="bg"></div>
								<div class="icon icon-woman"></div>
							</label>
						</div>
						<div class="radiobutton">
							<input id="geslachtNlMetro" value="uni" data-icontest="metro" type="radio" name="geslacht">
							<label for="geslachtNlMetro">
								<div class="bg"></div>
								<div class="icon icon-metro-sign"></div>
							</label>
						</div>
					</form>
				</section>	
				<h3>Nederland</h3>
				<h4 id="text_leeftijdNl">Leeftijd</h4>
			</section>
			<section class="slider">
				<input type="hidden" name="leeftijdNl" id="input_leeftijdNl">
				<div class="slider" id="slider_leeftijdNl"></div>
			</section>
		</section>
	</section>
	<section class="chart">
		<span class="nul">0</span>
		<span class="vijf">5</span>
		<span class="tien">10</span>
		<div id="overviewsvg1"></div>
		<div class="vijflijn"></div>
	</section>
	<section class="subject">
		<section class="subject-wrap">
			<div class="p10">
				<div class="close">
					<svg id="close" x="0px" y="0px"
						 width="32px" height="32px" viewBox="0 0 32 32">
						<line fill="none" stroke="#e34f42" stroke-width="3" stroke-miterlimit="10" x1="0.845" y1="31" x2="30.761" y2="1.085"/>
						<line fill="none" stroke="#e34f42" stroke-width="3" stroke-miterlimit="10" x1="30.761" y1="31" x2="0.846" y2="1.085"/>
					</svg>
				</div>
				<article class="social">
					<h1>Sociaal  &amp; geluk</h1>
					<p>Het geluk van Nederlanders naar hoeveelheid social contact</p>
					<span class="nul">0</span>
					<span class="vijf">5</span>
					<span class="tien">10</span>
					<div id="socialsvg1" class="chartsvg"></div>
				</article>
				<article class="religie">
					<h1>Religie  &amp; geluk</h1>
					<p>Het geluk van Nederlanders naar geloof</p>
					<span class="nul">0</span>
					<span class="vijf">5</span>
					<span class="tien">10</span>
					<div id="religiesvg1" class="chartsvg"></div>
					<p class="legend">Jouw opgegeven geloof<span class="color"></span></p>
				</article>
				<article class="werk">
					<h1>Werk  &amp; geluk</h1>
					<p>Het geluk van Nederlanders naar tevredenheid over inkomen</p>
					<span class="nul">0</span>
					<span class="vijf">5</span>
					<span class="tien">10</span>
					<div id="werksvg1" class="chartsvg"></div>
				</article>
				<article class="gezondheid">
					<h1>Gezondheid &amp; geluk</h1>
					<div id="gezondheidsvg1"></div>
					<div class="carousel">
					    <div>
					    	<?php include("includes/svg/smoking.php"); ?>
					    	<h3> Het blijkt dat mensen die elke dag roken gelukkiger zijn dan mensen die nooit roken.</h3>
					    </div>
					    <div>
					    	<?php include("includes/svg/beer.php"); ?>
					    	<h3> Mensen die af en toe een borreltje ophebben zijn gelukkiger dan mensen die nooit drinken.</h3>
					    </div>
					    <div>
					    	<?php include("includes/svg/healthy.php"); ?>
					    	<h3> Mensen die zich gezond voelen zijn gelukkiger. </h3>
					    </div>
					</div>
				</article>
				<article class="participatie">
					<h1>Participatie  &amp; geluk</h1>
				</article>
				<article class="veiligheid">
					<h1>Veiligheid  &amp; geluk</h1>
				</article>
			</div>
		</section>
	</section>
	<div class="clear"></div>
</section>