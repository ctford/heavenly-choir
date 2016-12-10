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
function asset(name) {
    return 'https://raw.githubusercontent.com/ctford/heavenly-choir/assets/choir/' + name + '.mp3';
}

// Construct an SSML response playing a greeting.
function hello(event, context) {
    return speak(audio(asset('root')));
}

// Construct an SSML response playing a single note as defined in the SOLFEGE type.
function note(event, context) {
    var syllable = event.request.intent.slots.Note.value;

    switch (syllable) {
        case 'do':
        case 'doe':
        case 'joke':
        case 'dove':
        case 'don\'t':
            response = speak(audio(asset('G')));
            break;
        case 'root':
        case 'rude':
        case '1st':
            response = speak(audio(asset('root')));
            break;
        case 're':
        case 'ray':
        case 'ready':
            response = speak(audio(asset('A')));
            break;
        case 'second':
            response = speak(audio(asset('second')));
            break;
        case 'mi':
        case 'me':
        case 'mean':
            response = speak(audio(asset('B')));
            break;
        case '3rd':
            response = speak(audio(asset('third')));
            break;
        case 'fa':
        case 'far':
        case 'fart':
            response = speak(audio(asset('C')));
            break;
        case '4th':
        case '4':
        case 'subdominant':
            response = speak(audio(asset('fourth')));
            break;
        case 'so':
        case 'sew':
        case 'sewn':
        case 'slow':
            response = speak(audio(asset('D')));
            break;
        case '5th':
        case 'dominant':
            response = speak(audio(asset('fifth')));
            break;
        case 'la':
        case 'lah':
        case 'laugh':
            response = speak(audio(asset('E')));
            break;
        case '6th':
            response = speak(audio(asset('sixth')));
            break;
        case 'ti':
        case 'tea':
        case 'TV':
        case 'E':
        case 'V':
            response = speak(audio(asset('F-sharp')));
            break;
        case '7th':
            response = speak(audio(asset('seventh')));
            break;
        default:
            response = speak('Sorry, I didn\'t get that. I heard <break/>' + syllable + '.');
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
                shouldEndSession: false
            }
        });
    } catch (e) {
        console.log("Unexpected exception " + e);
        context.fail(e);
    }
};
