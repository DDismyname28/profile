<?php
	function session_user($connection){
		$username = $_SESSION["user"];
		return $username;
	}
	//validate login information
	function validate_login($connection){
		if(isset($_POST["login"])){

			$email = $_POST["email"];
			$password = $_POST["password"];
			
			$query_string = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
				
			$query = mysqli_query($connection, $query_string);
				
				if(mysqli_num_rows($query) == 1){
					$row = mysqli_fetch_array($query);
					$_SESSION["user"] = $row["firstname"];
					header("location: register.php");
					exit();
				}
				else {
					return "PLEASE ENTER YOUR CORRECT EMAIL AND PASSWORD";
			}
		}
	}

	$error_message = validate_login($connection);
	
	
	//insert products
	function add_products($connection){
		if(isset($_POST["add_products"])){
			
			$product_name = $_POST["products_name"];
			$product_description = $_POST["products_description"];
			$product_price = $_POST["products_price"];
			
			$query_string = "INSERT INTO products_tbl (product_name, product_description, product_price) VALUES ('$product_name','$product_description','$product_price')";
		
			$query = mysqli_query($connection, $query_string);
		
			if($query){
				//insert image file
				$product_id = mysqli_insert_id($connection);
				
				//image upload
				$file = $_FILES['imagefile'];
				$filename = $file['name'];
				
				if($file['type'] == 'image/jpeg'){
					$filename;
				}
				elseif($file['type'] == 'image/png'){
					$filename;
				}
				elseif($file['type'] == 'image/gif'){
					$filename;
				}
				$old_location = $file['tmp_name'];
				$new_location = 'images/'. $filename;
				
				$upload = move_uploaded_file($old_location, $new_location);
				
				$query_string = "INSERT INTO productsimage_tbl (product_id,product_image) VALUES ('$product_id','$filename')";
				
				$query_image = mysqli_query($connection, $query_string);
				
				if($query_image) {
					return "YOUR PRODUCTS IS ADDED TO DATABASE" ." ". $product_id;
				}
				else {
					return "SOMETHING WENT WRONG";		
				}
			}
		}
	}
	function inner_join($connection){
		
		$query_string = "SELECT * FROM products_tbl x INNER JOIN productsimage_tbl xo ON x.product_id = xo.product_id";
		
		$query = mysqli_query($connection, $query_string);
		
		$products = '';
		
	while($product_array = mysqli_fetch_assoc($query)){
		
		$product_id = $product_array['product_id'];
		$product_name = $product_array['product_name'];
		$product_price = $product_array['product_price'];
		$product_image = $product_array['product_image'];
		$product_description = $product_array['product_description'];
		
		$query_string = "SELECT (product_quantity - ifnull(SUM(order_quantity),0)) AS available_qty FROM orders o JOIN products_tbl p ON o.product_id = p.product_id WHERE o.product_id = '$product_id'";
		$query1 = mysqli_query($connection,$query_string);
		
		if($query1){
			$product_array = mysqli_fetch_assoc($query1);
			$result = $product_array['available_qty'];
			echo $result;
			if($result == 0){
				
			}
			else {
			$product_info = array($product_id, $product_name, $product_price, $product_image, $product_description);

			$products .= '<a href="single.php?id='. $product_id .'&image='. $product_image .'&price='. $product_price .'"><li><img src="images/' . $product_image .'" class="img-responsive" alt=""/> 
			<span class="btn5">' .$product_price . '</span>' .
			'<p>'. $product_name . '</p>
			</li>
			</a>';
			}	
		}
		
	}
		if($_SERVER['PHP_SELF'] == "/Djofil/e_commerce/index.php"){
			return $products;
		}
		elseif ($_SERVER['PHP_SELF'] == "/Djofil/e_commerce/single.php") {
			return get_product_id($connection);
		}
	}
	
	$products = inner_join($connection);
	$query_message = add_products($connection);
	
	//GET PRODUCT INFORMATION
	function get_product_id($connection){
			if(isset($_GET['id']) && isset($_GET['image'])){

				$id = $_GET['id'];
				$image = $_GET['image'];
				$price = $_GET['price'];
				
				//$price = $_GET['price'];
		
				addtocart_session($connection, $id, $price);
				
				$query_string = "SELECT *, (SELECT SUM(order_quantity) FROM orders WHERE product_id = '$id') AS paid_qty FROM products_tbl WHERE product_id = '$id'";

				
				$query = mysqli_query($connection,$query_string);
				
				if($product_array = mysqli_fetch_assoc($query)){
				
				$product_id = $product_array['product_id'];
				$product_name = $product_array['product_name'];
				$product_price = $product_array['product_price'];
				//$product_image = $product_array['product_image'];
				$product_description = $product_array['product_description'];
				$quantity = $product_array['product_quantity'] - $product_array['paid_qty'];
				
				$product_info = array($product_id, $product_name, $product_price, $product_description, $image, $id, $price,$quantity);
		
				return $product_info;
			}
		}
	}
	//Fetch all images in database
	function fetch_all_image($connection){
	
		$query_string = "SELECT * FROM products_tbl x INNER JOIN productsimage_tbl xo ON x.product_id = xo.product_id";
			
		$query = mysqli_query($connection, $query_string);
			
		while($product_array = mysqli_fetch_assoc($query)){
			
			$product_image = $product_array['product_image'];
			
			$images[] = $product_image;
		}
		for($i=0; $i<count($images); $i++){
			echo '<li><img src="images/' .$images[$i] .'" class="img-responsive" alt=""/></li>';
		}
	}
	//$images = fetch_all_image($connection);
	function addtocart_session($connection){
	
		if(isset($_GET['buy'])){
			$id = $_GET['id'];
			if(isset($_SESSION['cart'][$id])){
				$_SESSION['cart'][$id]++;
			}else {
				$_SESSION['cart'][$id] = 1;
			}
			//print_r($_SESSION['cart']);
		/*	if(!isset($_SESSION['cart'])){
			$_SESSION['cart'] = [];
			$_SESSION['cart'][$id] = '0';
		}	echo $id;
			$_SESSION['cart'][$id]++;
			print_r($_SESSION['cart']);
	}*/		return "Already in the Cart";
		}
		else {
			return "Buy";
			}
		}
	//$added = addtocart_session($connection);
	function cart_items($connection){
		if(!empty($_SESSION['cart'])){
		echo '<table border = "1" cellpadding = "20" cellspacing = "10">
		<tr>';
			echo '<td>Product ID</td>';
			echo '<td>Product Name</td>';
			echo '<td>Quantity</td>';
			echo '<td>Price</td>';
			echo '<td>Total</td>';
			echo '</tr>';
		foreach($_SESSION['cart'] as $product_id => $quantity){
			
			$query_string = "SELECT * FROM products_tbl WHERE product_id = '$product_id'";
			$query = mysqli_query($connection, $query_string);
			if($product_array = mysqli_fetch_assoc($query)){
				$product_id = $product_array['product_id'];
				$product_name = $product_array['product_name'];
				$product_price = $product_array['product_price'];
				
				$product_info = array($product_id,$product_price,$product_name);
			}
			
	
			echo '<tr>';
			echo '<td>'. $product_id .'</td>';
			echo '<td>'. $product_info[2] .'</td>';
			echo '<form method="POST">';
			echo '<td><input type="number" min="1" step="1" max="50" name="qty['.$product_id.']" value="'.$quantity.'"></td>';
			echo '<td>'. $product_info[1].'</td>';
			$total = ($product_info[1])*($quantity);
			echo '<td>'. $total .'</td>';
			echo '<td><button><a href="admin/delete_cart.php?id='.$product_id.'">Delete</a></button></td>';
			echo '<td></td>';
			echo '</tr>';
			$overalltotal[] = $total;
		}
		//echo count($overalltotal);
		$totals = 0;
		for($i=0;$i<count($overalltotal);$i++){
			$totals += $overalltotal[$i];
		}
		//$_POST['totals'][$totals] = $totals;
		echo '<tr>';
		echo '<td colspan="4" align ="left">TOTAL</td>';
		echo '<td>'.$totals.'</td>';
		echo '<td><button name="cart_update">Update</button></td>';
		echo '</form>';
		echo '</tr>';
		echo '</table>';
		//echo '<pre>';
			//print_r($_POST);
		//echo '</pre>';
	}
	else {
		echo "Your Cart is Empty.";
		}
	}
	if(isset($_SESSION)){
	if(isset($_POST['cart_update'])){
		print_r($_POST);
		extract($_POST);
			foreach($qty as $id => $quantity){
				$_SESSION['cart'][$id] = $quantity;
			}				
		}
	}
	function paypal($connection){
		extract($_POST);
		$i = 1;
			foreach($qty as $id => $quantity){
				$query_string = "SELECT * FROM products_tbl WHERE product_id = '$id'";
			$query = mysqli_query($connection, $query_string);
			if($product_array = mysqli_fetch_assoc($query)){
				$product_id = $product_array['product_id'];
				$product_name = $product_array['product_name'];
				$product_price = $product_array['product_price'];
				
				$product_info = array($product_id,$product_price,$product_name);
		
		echo '<input type="hidden" name="item_name_'.$i.'" value="'.$product_info[2].'">';
		echo '<input type="hidden" name="item_number_'.$i.'" value="'.$product_info[0].'">';
		echo '<input type="hidden" name="amount_'.$i.'" value="'.$product_info[1].'">';
		echo '<input type="hidden" name="quantity_'.$i.'" value="'.$quantity.'">';

		}
		$i++;
			}
	}
?>