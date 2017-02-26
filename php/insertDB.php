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
		$op = $_GET['op'];
		
		switch($op){
			case 0: callNewWebsite($_GET['val'],$_GET['val2'],$con);
			case 1: callMostFrequent($con);
		}
	}
	
	function callNewWebsite($val,$val2,$con){
		
		if($val != ""){
			echo($_GET['val2']);
			$sql = "Call new_website('".$val."','".$val2."');" ;
			mysqli_query($con,$sql);
		}
	}
	
	function callMostFrequent($con){
		$sql = "call getMostFrequent();";
		$result = mysqli_query($con,$sql);
		while($row = mysqli_fetch_array($result)) {
			echo($row['term']);
		}
	}
	
?>