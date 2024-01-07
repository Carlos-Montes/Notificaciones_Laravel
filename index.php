<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificaciones</title>
    <!-- CSS -->
    <link rel="stylesheet" href="cmnotify.css?v=<?php echo time() ?>">
    <!-- ESTILOS DE LETRAS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&family=Public+Sans:wght@200;300;400&display=swap" rel="stylesheet">

    <style>
        body{
            font-family: 'Poppins', sans-serif;
        }
    </style>

</head>
<body>
    

    <script src="cmnotify.js?v=<?php echo time() ?>"></script>
    <script>

        // function alertcm(params){
        //     console.log('mostrar: ' +params.param1);
        // }

        // function alertcmhide(params){
        //     console.log('ocultar: ' +params.param1);
        // }

        // const cmNotify1 = new CMNotify({position: 'bottom-right', durarion: 2});
        // cmNotify1.show({message: 'Hola Mundo', type: 'danger', persistent: true, showCallback: 'alertcm', showCallbackParams: {param1: 'parametro 1', param2: '2'}, 
        //                 hideCallback: 'alertcmhide', hideCallbackParams: {param1: 'parametro 1', param2: '2'}});
        // cmNotify1.show({message: 'Hola Mundo 2', type: 'dark'});
        // cmNotify1.show({message: 'Hola Mundo 3', type: 'primary'});
        // cmNotify1.show({message: 'Hola Mundo 4', type: 'info'});
        // cmNotify1.show({message: 'Hola Mundo 5', type: 'light'});
        // cmNotify1.show({message: 'Hola Mundo 6', type: 'secundary'});
        // cmNotify1.show({message: 'Hola Mundo 7', type: 'warning'});
        // cmNotify1.show({message: 'Hola Mundo 8', type: 'success'});
        // const cmNotify2 = new CMNotify({position: 'bottom-center'});
        // const cmNotify3 = new CMNotify({position: 'bottom-left'});
        // const cmNotify4 = new CMNotify({position: 'top-left'});
        // const cmNotify5 = new CMNotify({position: 'top-center'});
        // const cmNotify6 = new CMNotify({position: 'top-right'});

        const cmNotify1 = new CMNotify({position: 'top-center'});
        const notificationtypes = ['primary', 'secundary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];

        const mensajes = [
            'Notificación corta',
            'Este es un mensaje más largo para la notificación',
            'Mensaje con longitud intermedia',
            'Otra notificación corta',
            'Mensaje muy largo que deberia ajustarse en el contenedor de notificacón'
        ];

        for(let i = 1; i <= 5; i++){
            const type = notificationtypes[i % notificationtypes.length];
            const message = mensajes[i % mensajes.length];
            const persistent = Math.random() < 0.5;
            setTimeout(() => cmNotify1.show({type, message, persistent}), i * 1000);
        }
    </script>
</body>
</html>