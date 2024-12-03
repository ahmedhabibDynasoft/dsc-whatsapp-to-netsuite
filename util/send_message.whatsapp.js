const sendWhatsappMessage = (recipient, message) => {
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

    return { body, headers, url }
}

module.exports = {sendWhatsappMessage}