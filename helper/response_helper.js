var responseHelper = data => {
    let resp = {
        from: "",
        message_id: "",
        timestamp: "",
        message: "",
        type: "",
        status: ""
    }
    let testData = data.entry[0].changes[0].value

    if (!testData.statuses && !testData.messages[0].context) {

        resp.message_id = testData.messages[0].id
        resp.message = testData.messages[0].text.body
        resp.type = testData.messages[0].type
        resp.timestamp = testData.messages[0].timestamp
        resp.from = testData.messages[0].from
    } else if (testData.statuses) {
        resp.from = testData.statuses[0].recipient_id
        resp.message_id = testData.statuses[0].id
        resp.status = testData.statuses[0].status
        resp.type = "status"
        resp.timestamp = testData.statuses[0].timestamp
    } else {
        resp.message_id = testData.messages[0].id
        resp.message = testData.messages[0].text.body
        resp.type = "Respond"
        resp.timestamp = testData.messages[0].timestamp
        resp.from = testData.messages[0].from
        resp.context=testData.messages[0].context
    }

    return resp
}

module.exports = { responseHelper }