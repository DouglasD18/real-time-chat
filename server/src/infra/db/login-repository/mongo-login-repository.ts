import { LoginRepository, User } from "@/data/protocols";
import { UserLogin } from "@/domain/useCases/login";
import { MongoHelper } from "../helpers/mongo-helper";

export class MongoLoginRepository implements LoginRepository {
  async handle(user: UserLogin): Promise<User> {
    const { email, password } = user;
    
    const accountCollection = await MongoHelper.getCollection('users-db');
    const response = await accountCollection.findOne({ email, password });

    return response as unknown as User;
  }
  
}