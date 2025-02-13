<?php

// Reading POSTed data directly from $_POST causes serialization issues with array data in the POST.
// Instead, read raw POST data from the input stream. 

$raw_post_data = file_get_contents('php://input');
$raw_post_array = explode('&', $raw_post_data);
$myPost = array();
foreach ($raw_post_array as $keyval) {
	$keyval = explode ('=', $keyval);
	if (count($keyval) == 2)
		$myPost[$keyval[0]] = urldecode($keyval[1]);
}

$request = "cmd=_notify-validate";

foreach($myPost as $key => $value){
	if($get_magic_quotes_exists == true && get_magic_quotes_gpc() == 1) { 
		$value = urlencode(stripslashes($value)); 
	} else {
		$value = urlencode($value);
	}
	$request .= "&$key=$value";
}

$ch = curl_init("https://www.paypal.com/cgi-bin/webscr");
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);

// Set TCP timeout to 30 seconds
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Connection: Close'));

if (!($res = curl_exec($ch))) { // cURL error
	curl_close($ch);
	exit;
}
curl_close($ch);

// Inspect IPN validation result and act accordingly

if (strcmp ($res, "VERIFIED") == 0) {
	// check whether the payment_status is Completed
	// check that txn_id has not been previously processed
	// check that receiver_email is your PayPal email
	// check that payment_amount/payment_currency are correct
	// process payment and mark item as paid.

	// assign posted variables to local variables
	
	$no_of_items = $_POST['num_cart_items'];
	
	$msg = '<h3>ORDER RECEIPT:</h3>
			<table border="1">
				<tr>
					<th>Product Name</th>
					<th>Price</th>
					<th>Quantity</th>
					<th>Total</th>
				</tr>';
	for($i=1; $i <= $no_of_items; $i++){
		$price = $_POST['mc_gross_'.$i] / $_POST['quantity'.$i];
		$msg .= '<tr>
					<td>'. $_POST['item_name'.$i] .'</td>
					<td>'. $price .'</td>
					<td>'. $_POST['quantity'.$i] .'</td>
					<td>'. $_POST['mc_gross_'.$i] .'</td>
				</tr>';
	}
	$msg .= '<tr>
				<td colspan="3">TOTAL</td>
				<td>'. $_POST['payment_gross'] .'</td>
			</tr>
	</table>';
	$email = $_POST['payer_email'];
	$headers  = 'MIME-Version: 1.0'."\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1';
	
	$send = mail($email, 'STORE NAME - RECEIPT', $msg, $headers);
	if($send){
		//  CREATE CONNECTION to DATABASE
		
		$fname = $_POST['first_name'];
		$lname = $_POST['last_name'];
		$insert_c = mysqli_query($con, "INSERT INTO customers(payer_email, first_name, last_name) VALUES('$email', '$fname', '$lname')");
		$customer_id = mysqli_insert_id($con);
		// SQL
		for($i=1; $i <= $no_of_items; $i++){
			$product_id = $_POST['item_number'.$i];
			$quantity = $_POST['quantity'.$i];
			$sql = "INSERT INTO orders(customer_id, product_id, order_quantity) VALUES('$customer', '$product_id', '$quantity')";
			$query = mysqli_query($con, $sql);
		}
	}
	
}
else if (strcmp ($res, "INVALID") == 0) {
	// log for manual investigation
	// Add business logic here which deals with invalid IPN messages
	echo "The response from IPN was: <b>" .$res ."</b>";
}

?>