const https = require('https');

const notifySlack = async (message) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) return;

  const payload = JSON.stringify({
    text: message,
    username: 'Incident Tracker',
    icon_emoji: ':rotating_light:',
  });

  return new Promise((resolve, reject) => {
    const url = new URL(webhookUrl);
    const options = {
      hostname: url.hostname,
      path:     url.pathname,
      method:   'POST',
      headers:  { 'Content-Type': 'application/json' },
    };

    const req = https.request(options, (res) => resolve(res.statusCode));
    req.on('error', (err) => {
      console.error('Slack notification failed:', err.message);
      resolve(null); // Ne pas bloquer l'app si Slack échoue
    });
    req.write(payload);
    req.end();
  });
};

module.exports = { notifySlack };