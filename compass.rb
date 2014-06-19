require 'compass-normalize'
require "autoprefixer-rails"

on_stylesheet_saved do |file|
  css = File.read(file)
  File.open(file, 'w') do |io|
    io << AutoprefixerRails.process(css)
  end
end

sass_dir              = "src/scss"
css_dir               = "htdocs/css"
javascripts_dir       = "htdocs/js"
images_dir            = "htdocs/img"
generated_images_dir  = "htdocs/img/generated"
output_style          = (environment == :production) ? :compressed : :nested
line_comments         = (environment == :production) ? :false : :true
