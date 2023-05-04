import { Controller, Get, Post, Put, Delete, ParseUUIDPipe, Param, Body, NotFoundException, HttpCode, HttpStatus, ValidationPipe, HttpException, UseInterceptors, Patch } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto, CreatePostDto, UpdatePostDto } from './posts.dto';
import { UuidValidationMiddleware } from './Middlewares/UuidValidationMiddleware';
import { isUUID } from 'class-validator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpCode(200)
  @Get()
  async findAll(): Promise<PostDto[]> {
    const posts = await this.postsService.findAll();
    return posts;
  }

  @Get(':id')
  @HttpCode(200)
  @UseInterceptors(UuidValidationMiddleware) 
  async findOne(@Param('id') id: string): Promise<PostDto> {
    const post = await this.postsService.findOne(id);
    if (!isUUID(id)) {
        throw new HttpException('Invalid uuid', HttpStatus.BAD_REQUEST);
      }

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return { id: post.id, title: post.title, body: post.body };
  }

  @HttpCode(200)
  @Post()
  async create(@Body(new ValidationPipe()) createPostDto: CreatePostDto): Promise<PostDto> {
    const post = await this.postsService.createPost(createPostDto);
    console.log(post);
    
    return { id: post.id, title: post.title, body: post.body };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) updatePostDto: UpdatePostDto): Promise<PostDto> {
    const updatedPost = await this.postsService.updatePost(id, updatePostDto);
    if (!isUUID(id)) {
        throw new HttpException('Invalid uuid', HttpStatus.BAD_REQUEST);
      }

    if (!updatedPost.affected) {
      throw new NotFoundException('Post not found');
    }
    const post = await this.postsService.findOne(id);
    return { id: post.id, title: post.title, body: post.body };
  }

  @Delete(":post")
  @HttpCode(200)
  deleteUser(@Param("post") id: string) {
    if (!isUUID(id)) {
        throw new HttpException('Invalid uuid', HttpStatus.BAD_REQUEST);
      }
    return this.postsService.remove(id);
  }


}
