class JsRoutesGenerator < Rails::Generators::Base
  ROUTES = [
    /^sessions$/,
    /^me$/,
  ]

  def build
    create_file 'app/javascript/routes.js', JsRoutes.generate(include: ROUTES)
  end
end
