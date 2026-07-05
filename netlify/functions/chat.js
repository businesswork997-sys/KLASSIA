exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    var body = JSON.parse(event.body);
    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: body.system,
        messages: body.messages
      })
    });
    var data = await response.json();
    var reply = data.content && data.content[0] ? data.content[0].text : 'Contactez-nous sur WhatsApp : +223 95 39 99 58';
    return {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ reply: reply })
    };
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: 'Erreur technique. Contactez-nous sur WhatsApp : +223 95 39 99 58' })
    };
  }
};
