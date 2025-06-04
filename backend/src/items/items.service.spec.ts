import { Test, TestingModule } from '@nestjs/testing';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './interface/items.interface';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs/promises';

jest.mock('fs/promises');

describe('ItemsService', () => {
  let service: ItemsService;

  const mockItems: Item[] = [
    {
      id: uuidv4(),
      title: 'Producto Mock 1',
      description: 'Descripción del producto mock 1',
      price: 100,
      currency: 'ARS',
      images: ['https://via.placeholder.com/600x400.png?text=Mock1'],
      seller: {
        id: uuidv4(),
        name: 'Mock Vendedor',
        email: 'mock@vendedor.com',
        rating: 4.5,
      },
      stock: 5,
      reviews: [
        {
          user: {
            id: uuidv4(),
            name: 'TestUser1',
            email: 'test@user.com',
          },
          rating: 5,
          comment: 'Excelente',
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'Producto Mock 2',
      description: 'Descripción del producto mock 2',
      price: 200,
      currency: 'ARS',
      images: ['https://via.placeholder.com/600x400.png?text=Mock2'],
      seller: {
        id: uuidv4(),
        name: 'Otro Vendedor',
        email: 'otro@vendedor.com',
        rating: 4.0,
      },
      stock: 0,
      reviews: [],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('loadData', () => {
    it('should successfully load and parse data from file', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockItems));

      const result = await (service as any).loadData();
      expect(result).toEqual(mockItems);
      expect(fs.readFile).toHaveBeenCalledWith(
        expect.stringContaining('items.json'),
        'utf-8',
      );
    });

    it('should throw NotFoundException when file does not exist', async () => {
      const error = new Error('File not found');
      (error as any).code = 'ENOENT';
      (fs.readFile as jest.Mock).mockRejectedValue(error);

      await expect((service as any).loadData()).rejects.toThrow(
        NotFoundException,
      );
      await expect((service as any).loadData()).rejects.toThrow(
        'The data file does not exist',
      );
    });

    it('should throw InternalServerErrorException when JSON is invalid', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('invalid json');

      await expect((service as any).loadData()).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect((service as any).loadData()).rejects.toThrow(
        'Error processing the data file',
      );
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('Unknown error'));

      await expect((service as any).loadData()).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect((service as any).loadData()).rejects.toThrow(
        'Error loading the data',
      );
    });
  });

  describe('getAllItems', () => {
    it('should return all items when there are items', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockItems));

      const items = await service.getAllItems();
      expect(items).toEqual(mockItems);
      expect(items.length).toBe(2);

      items.forEach((item) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('price');
        expect(item).toHaveProperty('currency');
        expect(item).toHaveProperty('images');
        expect(item).toHaveProperty('seller');
        expect(item).toHaveProperty('stock');
        expect(item).toHaveProperty('reviews');
      });
    });

    it('should return an empty array if no items exist', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify([]));

      const itemsEmpty = await service.getAllItems();
      expect(Array.isArray(itemsEmpty)).toBe(true);
      expect(itemsEmpty.length).toBe(0);
    });

    it('should throw InternalServerErrorException if loadData throws an error', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('Error'));
      await expect(service.getAllItems()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getItemById', () => {
    it('should return the correct item when the id is valid', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockItems));

      const result = await service.getItemById(mockItems[0].id);
      expect(result).toEqual(mockItems[0]);

      const result2 = await service.getItemById(mockItems[1].id);
      expect(result2).toEqual(mockItems[1]);
    });

    it('should throw NotFoundException when the id is invalid', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockItems));

      await expect(service.getItemById('NO_EXISTE')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException if loadData throws an error', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(new Error('Error'));
      await expect(service.getItemById(mockItems[0].id)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
