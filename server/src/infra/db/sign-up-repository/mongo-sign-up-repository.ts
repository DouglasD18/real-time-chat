import { SignUpRepository, User, UserSignUp } from "../../../data/protocols";
import { MongoHelper } from "../helpers/mongo-helper";

export class MongoSignUpRepository implements SignUpRepository {
  async handle(user: UserSignUp): Promise<User> {
    const { cpf, password, name } = user;
    
    const accountCollection = await MongoHelper.getCollection('users-db');
    const { insertedId } = await accountCollection.insertOne({ name, cpf, password });

    const account = { id: insertedId.toString(), ...user };

    return account as User;
  }
  
}