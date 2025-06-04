import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemDto } from './dto/items.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getAllItems(): Promise<ItemDto[]> {
    return this.itemsService.getAllItems();
  }

  @Get(':id')
  async getItemById(@Param('id') id: string): Promise<ItemDto> {
    return this.itemsService.getItemById(id);
  }
}
