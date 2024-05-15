const axios = require('axios');

const sendWhatsappMessage = async (recipient, message) => {
   try {
      const url = process.env.WHATSAPP_URL;
      const token = process.env.WHATSAPP_ACCESS_TOKEN

      const headers = {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
     }

      const body = {
         "messaging_product": "whatsapp",
         "recipient_type": "individual",
         "to": recipient,
         "type": "text",
         "text": {
            "preview_url": false,
            "body": message
         }
      }

      const data = await axios({
         headers: headers,
         method: 'post',
         url: url,
         data: body
      })
         .then((response) => {
            return response;
         }, (error) => {
            return error;
         })
         .then((val) => val);


   } catch (error) {

   }
}

module.exports = { sendWhatsappMessage }