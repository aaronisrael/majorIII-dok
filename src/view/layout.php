<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="./css/style.css">
    <meta charset="utf-8">
    <title>DOK</title>
    <?php echo $css;?>
    <script type="text/javascript">

      WebFontConfig = {
        custom: {
          families: ['OpenSans-Regular','Signika-Regular'],
          urls: ['assets/fonts/OpenSans-Regular/OpenSans-Regular.css','assets/fonts/Signika-Regular/Signika-Regular.css']
        }
      };

      (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
          '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
      })();

    </script>
  </head>
  <body>
      <?php if(!empty($_SESSION['info'])): ?><div class="alert alert-success"><?php echo $_SESSION['info'];?></div><?php endif; ?>
      <?php if(!empty($_SESSION['error'])): ?><div class="alert alert-danger"><?php echo $_SESSION['error'];?></div><?php endif; ?>

      <?php echo $content; ?>
    <?php echo $js;?>
  </body>
</html>
