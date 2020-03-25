class ApplicationMailer < ActionMailer::Base
  default from: 'pictionary@userinterviews.com',
          reply_to: 'pictionary@userinterviews.com'
  layout 'mailer'
end
