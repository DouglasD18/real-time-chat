import { LoginRepository, User } from "@/data/protocols";
import { UserLogin } from "@/domain/useCases/login";
import { MongoHelper } from "../helpers/mongo-helper";

export class MongoLoginRepository implements LoginRepository {
  async handle(user: UserLogin): Promise<User> {
    const { cpf, password } = user;
    
    const accountCollection = await MongoHelper.getCollection('users-db');
    const response = await accountCollection.findOne({ cpf, password });

    return response as unknown as User;
  }
  
}