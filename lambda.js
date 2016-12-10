var APP_ID = 'amzn1.ask.skill.e1fd8ae3-01c5-48f2-a3b4-5c6bcdef9d26';

// Throw an exception if the request isn't authorised.
function authorise(event, context) {
    if (event.session.application.applicationId !== APP_ID) {
        throw 'Invalid applicationId: ' + event.session.application.applicationId;
    }
}

// Construct an SSML response playing a single note.
function note(event, context) {
    var syllable = event.request.intent.slots.Note.value;
    return '<speak>'
        +      syllable
        +  '</speak>';
}

// Construct an SSML response playing a greeting.
function hello(event, context) {
    return '<speak>'
        +      '<audio src="https://raw.githubusercontent.com/ctford/heavenly-choir/assets/choir/hello.mp3" />'
        +  '</speak>';
}

// Switch between different intent responses.
function respond(event, context) {
    var response;

    switch (event.request.type) {
        case "IntentRequest":
            response = note(event, context);
            break;
        case "LaunchRequest":
            response = hello(event, context);
            break;
        default:
            response = null;
            break;
    }

    return response;
}

// Handle a request to the Heavenly Choir.
exports.handler = function (event, context) {
    try {
        authorise(event, context);
        context.succeed({
            version: '1.0',
            response: {
                outputSpeech: {
                    type: 'SSML',
                    ssml: respond(event, context)
                },
                shouldEndSession: true
            }
        });
    } catch (e) {
        console.log("Unexpected exception " + e);
        context.fail(e);
    }
};
