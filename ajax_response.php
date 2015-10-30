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
                
                $filename = "datasets/answers.json";

                $json = json_decode(file_get_contents($filename), true);

                if (is_writable($filename))
                {
                    $json["answers"][$answerid] = $answers;

                    file_put_contents($filename, json_encode($json));

                    $result["succes"] = true;
                } 

                else
                {
                    $result["message"] = "failed to open the file answers.json. Please, change the permission of that file to read and write.";
                }
            }
        }

        echo json_encode($result);
    }

?>