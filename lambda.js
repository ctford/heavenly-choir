var APP_ID = 'amzn1.ask.skill.e1fd8ae3-01c5-48f2-a3b4-5c6bcdef9d26';

// Throw an exception if the request isn't authorised.
function authorise(event, context) {
    if (event.session.application.applicationId !== APP_ID) {
        throw 'Invalid applicationId: ' + event.session.application.applicationId;
    }
}

// Construct an SSML response.
function speak(contents) {
    return '<speak>'
        +      contents
        +  '</speak>';
}

// Construct an SSML audio tag.
function audio(url) {
    return '<audio src="' + url + '" />';
}

// Construct an SSML response playing a greeting.
function hello(event, context) {
    return speak(audio("https://raw.githubusercontent.com/ctford/heavenly-choir/assets/choir/hello.mp3"));
}

// Construct an SSML response playing a single note as defined in the SOLFEGE type.
function note(event, context) {
    var syllable = event.request.intent.slots.Note.value;

    switch (syllable) {
        case 'do':
            response = speak('A deer, a female deer.');
            break;
        case 're':
            response = speak('A drop of golden sun.');
            break;
        case 'mi':
            response = speak('The name I call myself.');
            break;
        case 'fa':
            response = speak('A long long way to run.');
            break;
        case 'so':
            response = speak('A needle pulling thread.');
            break;
        case 'la':
            response = speak('A note to follow So.');
            break;
        case 'ti':
            response = speak('A drink with jam and bread.');
            break;
        default:
            response = speak(syllable);
            break;
    }
    return response;
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
