var APP_ID = 'amzn1.ask.skill.e1fd8ae3-01c5-48f2-a3b4-5c6bcdef9d26';

function authorise(event, context) {
    if (event.session.application.applicationId !== APP_ID) {
        throw 'Invalid applicationId: ' + event.session.application.applicationId;
    }
}

exports.handler = function (event, context) {
    try {
        authorise(event, context);
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
