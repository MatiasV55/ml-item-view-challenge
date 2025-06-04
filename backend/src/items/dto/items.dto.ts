import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsNotEmptyObject,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;
}

export class ReviewDto {
  @IsString()
  user: UserDto;

  @IsNumber()
  rating: number;

  @IsString()
  comment: string;
}

export class ItemDto {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price: number;

  @IsString()
  currency: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  images: string[];

  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => UserDto)
  seller: UserDto;

  @IsNumber()
  stock: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReviewDto)
  reviews: ReviewDto[];
}
