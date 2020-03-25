class JsRoutesGenerator < Rails::Generators::Base
  ROUTES = [
    /^sessions$/,
    /^me$/,
    /^.+ready$/,
    /^leaderboard/,
    /^verifications/
  ]

  def build
    create_file 'app/javascript/routes.js', JsRoutes.generate(include: ROUTES)
  end
end
