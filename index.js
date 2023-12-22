const app = require('express')();
const axios = require('axios')
app.get('/', async function (req, res) {
    res.json({gpt: '/gpt?q=(question here)',
              contact: 'https://facebook.com/joshg101'})
})
const port = Math.floor(Math.random() * 4000) +1000
app.get('/gpt', async function (req, res){
let t = req.query.q;
if (!t) return res.json({result: "Missing ask!"});
  try {
const response = await axios.post('https://useblackbox.io/chat-request-v4', {
          textInput: t,
          allMessages: [{ user: t }],
          stream: '',
          clickedContinue: false,
             });
             let result = response.data.response[0][0];
             res.json({result})
            } catch (e){
                return res.json({result: e.message})
            }

})

app.listen(port, () => {
    console.log('App is listening on port '+port)
})
