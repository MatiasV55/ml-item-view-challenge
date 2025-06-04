import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  const mockItems = [
    {
      id: uuidv4(),
      title: 'Smartphone XYZ',
      price: 399.99,
      currency: 'ARS',
      images: [],
      seller: {
        id: uuidv4(),
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
      },
      stock: 42,
      reviews: [],
    },
    {
      id: uuidv4(),
      title: 'Notebook ABC',
      price: 749.5,
      currency: 'ARS',
      images: [],
      seller: {
        id: uuidv4(),
        name: 'María Gómez',
        email: 'maria.gomez@example.com',
      },
      stock: 15,
      reviews: [],
    },
  ];

  const mockService = {
    getAllItems: jest.fn().mockResolvedValue(mockItems),
    getItemById: jest.fn((id: string) => {
      const item = mockItems.find((i) => i.id === id);
      if (!item) throw new NotFoundException('Item not found');
      return Promise.resolve(item);
    }),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [{ provide: ItemsService, useValue: mockService }],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GET /items should call service.getAllItems and return the array', async () => {
    const result = await controller.getAllItems();
    expect(service.getAllItems).toHaveBeenCalled();
    expect(result).toEqual(mockItems);
  });

  it('GET /items/:id should call service.getItemById and return the item', async () => {
    const result = await controller.getItemById(mockItems[0].id);
    expect(service.getItemById).toHaveBeenCalledWith(mockItems[0].id);
    expect(result).toEqual(mockItems[0]);
  });

  it('GET /items/:id should throw NotFoundException when the id is invalid', async () => {
    jest
      .spyOn(service, 'getItemById')
      .mockRejectedValueOnce(new NotFoundException('Item not found'));
    await expect(controller.getItemById(uuidv4())).rejects.toThrow(
      NotFoundException,
    );
  });
});
