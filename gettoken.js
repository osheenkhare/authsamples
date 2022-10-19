const CONFIRM_PROMPT = 'ConfirmPrompt';
const MAIN_DIALOG = 'MainDialog';
const MAIN_WATERFALL_DIALOG = 'MainWaterfallDialog';
const OAUTH_PROMPT = 'OAuthPrompt';
 
class MainDailog {
  
        this.addDialog(new OAuthPrompt(OAUTH_PROMPT, {
                    connectionName: process.env.connectionName,
                    text: 'Please Sign In',
                    title: 'Sign In',
                    timeout: 300000
                }));

        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));

        this.addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
                    this.promptStep.bind(this),
                    this.loginStep.bind(this),
                ]));

        this.initialDialogId = MAIN_WATERFALL_DIALOG;

    }

async promptStep(stepContext) {
        try {
            return await stepContext.beginDialog(OAUTH_PROMPT);
        } catch (err) {
            console.error(err);
        }
    }

async loginStep(stepContext) {
        // Get the token from the previous step. Note that we could also have gotten the
        // token directly from the prompt itself. There is an example of this in the next method.
        const tokenResponse = stepContext.result;
        if (!tokenResponse || !tokenResponse.token) {
            await stepContext.context.sendActivity('Login was not successful please try again.');
        } else {
            const token = tokenResponse.token;
            // On successful login, the token contains sign in token.
        }
        return await stepContext.endDialog();
    }
