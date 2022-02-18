<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    {{--    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">--}}
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="apple-touch-icon" href="{{asset('assets/images/ico/kwikcommerce.png',true)}}">
    <link rel="shortcut icon" type="image/x-icon" href="{{asset('assets/images/ico/kwikcommerce.png',true)}}">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i%7CQuicksand:300,400,500,700"
          rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <title>{{ config('app.name', 'Test') }}</title>
</head>
<body>
<div id="app"></div>
<script src="/js/app.js"></script>


</body>
</html>
