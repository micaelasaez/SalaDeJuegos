<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "./vendor/autoload.php";
require_once "./clases/Usuario.php";
require_once "./clases/Puntuacion.php";



use Firebase\JWT\JWT as JWT;


$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;
$config['determineRouteBeforeAppMiddleware'] = true;

$app = new Slim\App(["settings" => $config]);

$app->group('/usuario', function () {

    $this->post('/login', function ($request, $response,$arg)
    {
        $json = $request->getParsedBody();
        $mail= $json["mail"];
        $clave=$json["clave"];

        $usuario=new Usuario($mail,"","",$clave);
        if($usuario->TraerEste())
        {
            $array=array("mail"=>$usuario->mail);
            $token=JWT::encode($array,"clave");
            $ret = array('token' =>  $token);
            return $response->withJson($ret,200);
        }
        else
        {
            return $response->withJson("Errir",404);
        }
    });

    $this->post('/signup', function ($request, $response,$arg)
    {
        $decode = $request->getParsedBody();
        // $decode = json_decode($json['datos']);
        // var_dump($decode);
        // die();
        // return $response->withJson($decode,200);
        $mail= $decode["mail"];
        $clave=$decode["clave"];
        $nombre=$decode["nombre"];
        $apellido=$decode["apellido"];
        // var_dump($mail);
        // die();
        try
        {
            $usuario=new Usuario($mail,$nombre,$apellido,$clave);
            // return $response->withJson($usuario->Agregar(),200);
            if($usuario->Agregar())
            {
                $array=array("mail"=>$usuario->mail,"nombre"=> $usuario->nombre,"apellido"=> $usuario->apellido);
                $token=JWT::encode($array,"clave");
                $ret = array('token' =>  $token);
                return $response->withJson($ret,200);
            }
            return $response->withJson("Error",404);
        }
        catch(Exception $e)
        {
            throw $e;

        }
    });


});



$app->group('/puntuacion', function () {

    $this->post('[/]', function ($request, $response)
    {
        $json = $request->getParsedBody();
        $juego= $json["juego"];
        $puntuacion=$json["puntuacion"];
        $token=($request->getHeader("token"))[0];

        try
        {
            $todo= JWT::decode($token,"clave",array('HS256'));
            $puntuacion=new Puntuacion("",$todo->mail,$juego,$puntuacion);
            if($puntuacion->Agregar()>0)
            {
                return $response->withJson(true,200);
            }
            return $response->withJson(false,404);
        }
        catch(Exception $e)
        {
            throw $e;

        }

    return $response;
    })->add(\Usuario::class . ':verificarToken');



    $this->get('[/]', function ($request, $response,$arg)
    {

        $token=($request->getHeader("token")[0]);
        try
        {
            $todo= JWT::decode($token,"clave",array('HS256'));
            $puntuacion = new Puntuacion("",$todo->mail);
            $ret =new stdClass();
            $ret->puntuacion=$puntuacion->Traer();
            return $response->withJson($ret,200);
        }
        catch(Exception $e)
        {
            throw $e;

        }
    })->add(\Usuario::class . ':verificarToken');

});


$app->get('[/]', function ($request, $response)
{
return $response->withJson("hola",200);

});



$app->run();

?>
