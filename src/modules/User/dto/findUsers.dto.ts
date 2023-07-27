import { IsBoolean, IsOptional } from 'class-validator'

export class FindUsersDto {
  @IsBoolean()
  @IsOptional()
  id?: boolean

  @IsBoolean()
  @IsOptional()
  name?: boolean

  @IsBoolean()
  @IsOptional()
  email?: boolean

  @IsBoolean()
  @IsOptional()
  posts?: boolean
}
