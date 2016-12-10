exports.handler = function (event, context) {
    try {
        context.succeed({
            version: '1.0',
            response: {
                outputSpeech: {
                    type: 'SSML',
                    ssml: '<speak>Hello from the Heavenly Choir.'
                        + '<audio src="https://www.freesound.org/data/previews/361/361786_1431924-lq.mp3" />'
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
