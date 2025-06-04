import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Item } from './interface/items.interface';
import { ItemDto } from './dto/items.dto';

@Injectable()
export class ItemsService {
  private dataPath = path.join(process.cwd(), 'src', 'data', 'items.json');

  private async loadData(): Promise<ItemDto[]> {
    try {
      const raw = await fs.readFile(this.dataPath, 'utf-8');
      const items: Item[] = JSON.parse(raw);
      return items;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new NotFoundException('The data file does not exist');
      }
      if (error instanceof SyntaxError) {
        throw new InternalServerErrorException(
          'Error processing the data file',
        );
      }
      throw new InternalServerErrorException('Error loading the data');
    }
  }

  async getAllItems(): Promise<ItemDto[]> {
    try {
      const items = await this.loadData();
      if (!items || items.length === 0) {
        return [];
      }
      return items;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error getting the items');
    }
  }

  async getItemById(id: string): Promise<ItemDto> {
    try {
      const items = await this.loadData();
      const item = items.find((i) => i.id === id);
      if (!item) {
        throw new NotFoundException(`Item not found`);
      }
      return item;
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(`Error getting the item`);
    }
  }
}
