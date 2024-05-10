let body={"object":"whatsapp_business_account","entry":[{"id":"110894171826159","changes":[{"value":{"messaging_product":"whatsapp","metadata":{"display_phone_number":"15550625257","phone_number_id":"104529472471761"},"statuses":[{"id":"wamid.HBgMOTIzMzEyMjA4ODg1FQIAERgSRjZGNzQ5QjEyOEZEOEY3NTBCAA==","status":"delivered","timestamp":"1715316288","recipient_id":"923312208885","conversation":{"id":"54e19e8239d83c4e1f797223ed0d2d58","origin":{"type":"marketing"}},"pricing":{"billable":true,"pricing_model":"CBP","category":"marketing"}}]},"field":"messages"}]}]}
var responseHelper = data => {
    let resp = {
        conversationId:"",
        from: "",
        message_id: "",
        timestamp: "",
        message: "",
        type: "",
        status: ""
    }
    let testData = data.entry[0].changes[0].value

    if (!testData.statuses && !testData.messages[0].context) {

        resp.conversationId = data.entry[0].id
        resp.message_id = testData.messages[0].id
        resp.message = testData.messages[0].text.body
        resp.type = testData.messages[0].type
        resp.timestamp = testData.messages[0].timestamp
        resp.from = testData.messages[0].from
    } else if (testData.statuses) {
        resp.conversationId = data.entry[0].id
        resp.from = testData.statuses[0].recipient_id
        resp.message_id = testData.statuses[0].id
        resp.status = testData.statuses[0].status
        resp.type = "status"
        resp.timestamp = testData.statuses[0].timestamp
    } else {
        resp.conversationId = data.entry[0].id
        resp.message_id = testData.messages[0].id
        resp.message = testData.messages[0].text.body
        resp.type = "Respond"
        resp.timestamp = testData.messages[0].timestamp
        resp.from = testData.messages[0].from
        resp.context=testData.messages[0].context
    }

    return resp
}
console.log(responseHelper(body));
module.exports = { responseHelper }