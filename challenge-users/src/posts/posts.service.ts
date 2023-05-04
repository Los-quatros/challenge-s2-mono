import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from "crypto"
import { CreatePostDto, UpdatePostDto, PostDto } from './posts.dto';
import { Post } from '../entity/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Posts, CreatedPosts, UpdatedPosts } from './posts.interface';

@Injectable()
export class PostsService {
  
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  findOne(id: string): any {
    return this.postsRepository.findOneBy({ id });
  }

  async remove(id: string) {
   const post = await this.postsRepository.delete(id);

    if (!post.affected) {
        throw new NotFoundException('Post not found');
        }

    return post;
  }

  async createPost(postDto: CreatePostDto): Promise<PostDto> {
    const post = this.postsRepository.create(postDto);
    await this.postsRepository.save(post);
    return post;
  }

  updatePost(id: string, UpdatePostDto: UpdatePostDto): Promise<any> {  
   return this.postsRepository.update(id, UpdatePostDto);
  }

}
