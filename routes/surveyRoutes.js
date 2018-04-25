const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Survey =  mongoose.model('survey');
const surveyTemplate = require('../servers/emailTemplates/surveyTemplate');
const Mailer = require('../servers/Mailer');

module.exports = app => {

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, body, subject, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
                  .split(',')
                  .map(email => ({
                    email: email.trim()
                  })),
      dateSent: Date.now(),
      _user: req.user.id
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    
    res.send({});
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  })
}
