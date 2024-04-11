import { error } from "console";
import { Twilio } from "twilio";

export type TNotificationParams = {
  authToken: string;
  accountSid: string;
  twilioNumber: string;
  message?: string;
  destinationNumber: string;
};

export { sendNotification };

function sendNotification(params: TNotificationParams) {
  const { authToken, accountSid, destinationNumber, message, twilioNumber } =
    params;

  const client = new Twilio(accountSid, authToken);
  client.messages
    .create({
      from: twilioNumber,
      to: destinationNumber,
      body: message,
    })
    .then((message) => console.log(message.sid))
    .catch((error) => {
      throw new Error("Error sending sms");
    });
}
