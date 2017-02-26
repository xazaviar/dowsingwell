 <?php

	if(isset($_GET))
	{
		validAddress($_GET['url']);
	}

	function validAddress($url){
		 $handle = curl_init($url);
        curl_setopt($handle,  CURLOPT_RETURNTRANSFER, TRUE);

        $response = curl_exec($handle);
        $httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);

        if($httpCode >= 200 && $httpCode < 400) {
            echo("true");
			return true;
        } else {
			echo("false");
            return false;
        }
        curl_close($handle);
	}
?>