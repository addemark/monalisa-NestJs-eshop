import { User } from "src/authenticate/entity/user.entity";
import { NotificationCallback } from "src/authenticate/types/user.types";
import { Twilio } from "twilio";

export type TNotificationParams = {
  authToken: string;
  accountSid: string;
  twilioNumber: string;
  message?: string;
  destinationNumber: string;
  callBackFunction: NotificationCallback;
  user: User;
};

export { sendNotification };

function sendNotification(params: TNotificationParams) {
  const {
    authToken,
    accountSid,
    destinationNumber,
    message,
    twilioNumber,
    callBackFunction,
    user,
  } = params;

  const client = new Twilio(accountSid, authToken);
  client.messages
    .create({
      from: twilioNumber,
      to: destinationNumber,
      body: message,
    })
    .then((message) => message.fetch())
    .then((data) => {
      callBackFunction(data.sid, data.status, user);
    })
    .catch((error) => {
      throw new Error("Error sending sms");
    });
}
