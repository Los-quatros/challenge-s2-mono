import { IsNotEmpty, MaxLength, IsUUID } from 'class-validator';
import { Posts } from './posts.interface'


export class CreatePostDto implements Omit<Posts, "id">{

  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsNotEmpty()
  body: string;
}


export class PostDto implements Posts{
  @IsNotEmpty()
  @IsUUID()
  id: string;
  
  @IsNotEmpty()
  @MaxLength(50)
  title: string;
  
  @IsNotEmpty()
  body: string;
}

export class UpdatePostDto implements Partial<PostDto>{}