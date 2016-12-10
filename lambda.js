exports.handler = function (event, context) {
    try {
        context.succeed({
            version: '1.0',
            response: {
                outputSpeech: {
                    type: 'SSML',
                    ssml: '<speak>'
                        +     '<audio src="https://raw.githubusercontent.com/ctford/heavenly-choir/assets/choir/hello.mp3" />'
                        + '</speak>'
                },
                shouldEndSession: true
            }
        });
    } catch (e) {
        console.log("Unexpected exception " + e);
        context.fail(e);
    }
};
