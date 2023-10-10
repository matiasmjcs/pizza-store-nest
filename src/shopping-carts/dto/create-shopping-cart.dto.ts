import { IsOptional } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class CreateShoppingCartDto {
    user: User

}
