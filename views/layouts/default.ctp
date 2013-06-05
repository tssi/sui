<!DOCTYPE html>
<html>
  <head>
    <title>Simplified User Interface <?php echo $title_for_layout; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php echo $this->Html->meta('icon');?>
	<!-- Simple CSS -->
		<?php echo $this->Html->css('simple');?>
		<?php echo $this->Html->css('simple/red');?>
	<!-- Bootstrap Responsive CSS -->
		<?php echo $this->Html->css('bootstrap-responsive');?>
	<!-- FontAwesome CSS -->
		<?php echo $this->Html->css('font-awesome/font-awesome');?>
  </head>
  <body class="paper">
	<div class="navbar navbar-static-top" id="simple-navbar">
	  <div class="navbar-inner">
		<span class="brand" href="#">
			<a href="#main-nav" class="open-menu "><i class=" icon-reorder "></i></a>
			<a href="#" class="close-menu "><i class="icon-reorder"></i></a>
			<span class="product-name">Simplified User Interface</span>
		</span>
	  </div><!-- /navbar-inner -->
	</div>
	<div class="navbar">
	  <div class="navbar-inner">
		<div class="container">
		 
		  <a class="brand" href="#"> <i class="icon-puzzle-piece"></i> SUI</a>
		
			<ul class="nav">
				<li><a href="#">About </a> </li>
				<li><a href="#">Anatomy </a> </li>
				<li><a href="#">CSS </a> </li>
				<li><a href="#">Javascript </a> </li>
				<li><a href="#">Tutorials </a> </li>
			</ul>
		</div>
	  </div><!-- /navbar-inner -->
	</div>
	<?php echo $content_for_layout; ?>
	<hr />
	<footer class="lead pagination-centered ">
	The Simplified Solutions Inc. &copy; 2011 - <?php echo date('Y'); ?>
	</footer>
	<?php echo $scripts_for_layout; ?>
	<?php echo $this->Html->script('jquery/jquery');?>
	<?php echo $this->Html->script('boostrap/bootstrap');?>
  </body>
</html>