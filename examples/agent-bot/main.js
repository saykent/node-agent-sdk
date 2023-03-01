'use strict';

/*
 * This demo extends MyCoolAgent with the specific reply logic:
 *
 * 1) Echo any new message from the consumer
 * 2) Close the conversation if the consumer message starts with '#close'
 *
 */

const MyCoolAgent = require('./MyCoolAgent');

let conf_temp = {};

if (process.env.LP_KEY) {
    conf_temp = {
        accountId: process.env.LP_ACCOUNT,
        username: process.env.LP_USER,
        appKey: process.env.LP_KEY,
        secret: process.env.LP_SECRET,
        accessToken: process.env.LP_TOKEN,
        accessTokenSecret: process.env.LP_TOKEN_SECRET
    };
} else {
    conf_temp = {
        accountId: process.env.LP_ACCOUNT,
        username: process.env.LP_USER,
        password: process.env.LP_PASS
    };
}
const conf = Object.assign({}, conf_temp);

if (process.env.LP_CSDS) {
    conf.csdsDomain = process.env.LP_CSDS;
}

const echoAgent = new MyCoolAgent(conf);

echoAgent.on(echoAgent.CONTENT_NOTIFICATION,(contentEvent)=>{
    if (contentEvent.message.startsWith('#close')) {
        echoAgent.updateConversationField({
            conversationId: contentEvent.dialogId,
            conversationField: [{
                    field: "ConversationStateField",
                    conversationState: "CLOSE"
                }]
        });
    }

    else if (contentEvent.message.startsWith('#test')) {
        console.log('closing WS in 5s');

        setTimeout(() => {
            console.log('closing WS');
            echoAgent.transport.ws.close();
        }, 5000);
    }

    else {
        echoAgent.publishEvent({
            dialogId: contentEvent.dialogId,
            event: {
                type: 'ContentEvent',
                contentType: 'text/plain',
                message: `echo : ${contentEvent.message}`
            }
        });
    }
});
