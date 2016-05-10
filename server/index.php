<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

function isProcessRunning($process){
    try{
        exec("pgrep $process", $pids);
        if(!empty($pids)){
            return true;
        }
   }catch(Exception $e){}
   return false;
}

$app = new \Slim\App;

$app->get('/list_files_available', function (Request $request, Response $response) {
    $output = shell_exec('ls -1 /srv/performance_tests');
    $filesAvailable = explode("\n", $output);
    array_pop($filesAvailable); 
    $response->getBody()->write(json_encode($filesAvailable));
    return $response;
});

$app->get('/get_file/{file}', function (Request $request, Response $response) {
    $filename = $request->getAttribute('file');
    $myfile = fopen("/srv/performance_tests/$filename", "r") or die("Unable to open file!");
	$jsoncontent = fread($myfile,filesize("/srv/performance_tests/$filename"));
	fclose($myfile);
	$response->getBody()->write($jsoncontent); #withJson($data, 201);
    return $response;
});

$app->get('/run_tests/{commit}', function (Request $request, Response $response) {
	if (isProcessRunning("run.sh")){
		$response->getBody()->write("Previous tests are still running");
		return $response->withStatus(503);
	} 
	else {
    	$commit = $request->getAttribute('commit');
    	$app->executionPID = exec("/srv/tools/run.sh $commit > /tmp/current_execution.txt 2>&1 & echo $!");
    	$response->getBody()->write($app->executionPID);
    	return $response;
	}
});

$app->run();

?>
