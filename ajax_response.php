<?php

    function GUID()
    {
        if (function_exists('com_create_guid') === true)
        {
            return trim(com_create_guid(), '{}');
        }

        return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
    }

    if ( $_POST['action'] === "addanswers" )
    {
        $result = array();
        $result["succes"] = false;
        $result["message"] = "";
        $result["data"] = "";

        $answers = $_POST['answers'];

        if ( $answers )
        {            
            if ( gettype( $answers ) === "array" )
            {
                $answerid = GUID();
                $result["data"] = $answerid;
                
                $file = "datasets/answers.json";
                $json = json_decode(@file_get_contents($file), true);

                if ($json === FALSE) {
                    $result["message"] = "unable to open the file " . $file . ". Please change the permissions.";
                }

                else
                {
                    $json["answers"][$answerid] = $answers;

                    file_put_contents($file, json_encode($json));

                    $result["succes"] = true;
                }
            }
        }

        echo json_encode($result);
    }

?>