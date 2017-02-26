<?php
	$server = 'dowsingwell.crvc1cqzvikw.us-east-2.rds.amazonaws.com';
	$dbname = 'dowsing';
	$username = 'erwidman';
	$password = '1234';

	$con = mysqli_connect($server,$username,$password,$dbname);
	if (!$con) {
	    die('Could not connect: ' . mysqli_error($con));
	}
	mysqli_select_db($con,$dbname);
	if( isset($_GET)){
		callNewWebsite($_GET['val'],$con);
	}
	
	function callNewWebsite($val,$con){
		
		if($val != ""){
			$sql = "Call new_website('".$val."');" ;
			echo($sql);
			mysqli_query($con,$sql);
		}
	}
	
?>