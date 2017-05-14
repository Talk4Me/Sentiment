export default (request) => { 
    const kvstore = require('kvstore');
    const xhr = require('xhr');
    
    const http_options = {
        "method": "GET",
        "headers": {
            "Content-Type": "text/plain",
         },
    };
    var version = "2016-05-19"
    var text = request.message.Content
    var user = "304d3272-0e35-40a5-89f9-013d20666248"
    var password = "3072KYL0AlQj"
    var url = "gateway.watsonplatform.net/tone-analyzer/api/v3/tone"

    return xhr.fetch("https://" + user + ":" + password + "@" + url + "?" + "version=" + version + "&" + "text=" + text , http_options).then((serverResponse) => {
        var body = JSON.parse(serverResponse.body)
        var tone = body["document_tone"]["tone_categories"]
        tone.forEach(function(tone2) {
            tone2["tones"].forEach(function(tone3) {
                request.message[tone3["tone_id"]] = tone3["score"]
            })   
        })
        return request.ok()
    }).catch((err) => {
        return request.ok()
    });
}