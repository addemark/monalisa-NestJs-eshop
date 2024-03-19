import { Strategy } from "passport-jwt";
import { User } from "src/authenticate/entity/user.entity";
import { UserRepository } from "src/authenticate/repositoryes/user.repository";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    private static extractJWT;
    validate(payload: {
        encryptedUID: string;
    }): Promise<User>;
}
export {};
