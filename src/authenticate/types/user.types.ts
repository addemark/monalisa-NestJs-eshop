import { User } from "src/authenticate/entity/user.entity";

export interface NotificationCallback {
  (notificationId: string, status: string, user: User): Promise<void>; // The callback takes a string parameter and returns a Promise<void>
}
