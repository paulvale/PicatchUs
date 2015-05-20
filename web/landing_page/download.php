<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>PicatchUs | Store and share your photos instantaneously</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/landing-page.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <script type='text/javascript' src='http://www.webtutoriaux.com/services/compteur-visiteurs/index.php?client=152277'></script>

</head>

<body>

    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top topnav" role="navigation">
        <div class="container topnav">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand topnav" href="index.php">PicatchUs</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="index.php#about">Qu'est-ce que PicatchUs</a>
                    </li>
                    <li>
                        <a href="index.php#first-step">Commencer</a>
                    </li>
                    <li>
                        <a href="index.php#catch-wall">Le Catch Wall</a>
                    </li>
                    <li>
                        <a href="download.php">Télécharger</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>


    <!-- Header -->
    <section id="download">
        <div class="content-section-b">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="download-message">
                            <h1 class="center">PicatchUs</h1>
                            <h3>est encore en cours de développement. Laissez-nous votre e-mail pour tester l'appli en avant-première, et être l'un des premiers PicatchUser ! ☺</h3>
                            <hr class="intro-divider">
    <?php 
    if(isset($_POST['email']))
    {
        $email = htmlspecialchars($_POST['email']);
    
        $dsn = 'mysql:host=db576692501.db.1and1.com;dbname=db576692501';
        $username = 'dbo576692501';
        $password = '44f0b19138';
        $options = array(
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');

        try {
            $dbh = new PDO($dsn, $username, $password, $options);
            $sql = "INSERT INTO newsletter(email) 
            VALUES ('$email')";
            $req = $dbh->prepare($sql);
            $req->execute();
            echo('<h2 class="section-heading center">Merci de votre soutien !</h2>'); 
        } catch (PDOException $e) {
            echo('<h2 class="section-heading center">Oops, une erreur est survenue ...</h2>');
        }
    ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <?php 
    }
    else
    {
    ?>
                            <form method="POST" action="download.php" name="sentMessage" id="contactForm" novalidate>
                            <div class="row">
                                <div class="col-lg-offset-3 col-lg-6 col-md-offset-3 col-md-6">
                                    <div class="form-group">
                                        <input type="email" class="form-control" placeholder="Votre e-mail *" name="email" id="email" required data-validation-required-message="Veuillez entrer un e-mail.">
                                        <p class="help-block text-danger"></p>
                                    </div>
                                <div class="clearfix"></div>
                                <div class="col-lg-12 text-center">
                                    <div id="success"></div>
                                    <button type="submit" class="btn btn-xl">Envoyer</button>
                                </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.container -->

        </div>
        <!-- /.intro-header -->
    </section>

    <?php
    }
    ?>


    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <ul class="list-inline">
                        <li>
                            <a href="index.php">Accueil</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="index.php#about">Qu'est-ce que PicatchUs</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="index.php#first-step">Commencer</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="index.php#catch-wall">Le Catch Wall</a>
                        </li>
                        <li class="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="download.php">Télécharger</a>
                        </li>
                    </ul>
                    <p class="copyright text-muted small">Copyright &copy; PicatchUs Company 2015. All Rights Reserved</p>
                </div>
            </div>
        </div>
    </footer>

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-63048741-1', 'auto');
      ga('send', 'pageview');
    </script>

</body>

</html>
