<!doctype html><html ng-app="fuse"><head><base href="/"><meta charset="utf-8"><meta name="description" content=""><meta
        name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"><title>Express Writers</title><link
        rel="stylesheet" href="styles/vendor-d42d2878f3.css"><link rel="stylesheet" href="styles/app-1dbeaa1a03.css"><link
        href="//fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700italic,700,900,900italic"
        rel="stylesheet" type="text/css"><link href="assets/css/main.css" rel="stylesheet"><style>
        #splash-screen .logo {
            border-radius: 0px!important;

            box-shadow: none!important;
        }
    </style></head>
<!--[if lt IE 10]>
<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
    your browser</a> to improve your experience.</p>
<![endif]-->
<body md-theme="{{vm.themes.active.name}}" md-theme-watch ng-controller="IndexController as vm"
      class="{{state.current.bodyClass || ''}}"><ms-splash-screen id="splash-screen"><div class="center"><div class="logo"
                                                                                                              style="background-color:#3c4252!important"><span><img src="assets/images/small_logo.png" style="padding-top:28px">
</span></div><div class="spinner-wrapper"><div class="spinner"><div class="inner"><div class="gap"></div><div
                        class="left"><div class="half-circle"></div></div><div class="right"><div class="half-circle"></div></div></div></div>
        </div></div></ms-splash-screen><div id="main" class="animate-slide-up" ui-view="main" layout="column"></div>
<ms-theme-options></ms-theme-options><script src="scripts/vendor-b2dcab741b.js"></script><script
    src="scripts/app-9190085b90.js"></script></body></html>