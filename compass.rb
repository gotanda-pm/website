require 'compass-normalize'

sass_dir              = "src/scss"
css_dir               = "htdocs/css"
javascripts_dir       = "htdocs/js"
images_dir            = "htdocs/img"
generated_images_dir  = "htdocs/img/generated"
output_style          = (environment == :production) ? :compressed : :nested
line_comments         = (environment == :production) ? :false : :true
