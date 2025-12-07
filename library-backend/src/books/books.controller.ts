import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() dto: { title: string; authorId: number }) {
    return this.booksService.create(dto);
  }

  @Get()
  findAll(
    @Query('authorId') authorId?: string,
    @Query('borrowed') borrowed?: string,
  ) {
    return this.booksService.findAll({
      authorId: authorId ? +authorId : undefined,
      borrowed: borrowed ? borrowed === 'true' : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.booksService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
