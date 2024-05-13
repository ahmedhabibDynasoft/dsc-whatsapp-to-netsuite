const axios = require('axios');

const sendWhatsappMessage = async (recipient, message) => {
   try {
      const url = process.env.WHATSAPP_URL;

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + process.env.WHATSAPP_ACCESS_TOKEN);

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

      const response = await axios({
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