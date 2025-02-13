<?php
$name = $_GET['Name'];

<form method="GET">
	<input type="" name="Name" value="<?php echo "" ? "" : $name; ?>">
	<button type="submit"></button>
</form>