<?php  
    for($i=0;$i<count($_POST['img']);$i++)  
    {  
        $IMG=base64_decode($_POST['img'][$i]);  
        file_put_contents($i.'.png', $IMG);  
        echo '<img src="'.$i.'.png" />';  
    }  
?>  