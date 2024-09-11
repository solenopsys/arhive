import {TestBed} from '@angular/core/testing';
import {GraphItem, PathTreeCalculatorService} from "./services/path-tree-calculator.service";


describe('PathTreeCalculatorService', () => {
  let service: PathTreeCalculatorService;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathTreeCalculatorService);


  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('one before', () => {
    const items: GraphItem[] = [
      {id: '1', name: 'Покраска здания', before: ['2'], long: 10, count: 1},
      {id: '2', name: 'Вставка окон', long: 20, count: 1},
    ];

    const points = service.calcPoints(['1'], items).items;

    expect(points['1'].x).toEqual(0);
    expect(points['2'].x).toEqual(-10);
  });


  it('many before 1', () => {
    const items: GraphItem[] = [
      {id: '1', name: 'Покраска здания', before: ['2', '3'], long: 10, count: 1},
      {id: '2', name: 'Вставка окон', before: ['4'], long: 20, count: 1},
      {id: '3', name: 'Установка лифта', before: ['4'], long: 25, count: 1},
      {id: '4', name: 'Постройка каркаса', before: ['5'], long: 60, count: 1},
      {id: '5', name: 'Фундамент', long: 60, count: 1},
    ];

    const points = service.calcPoints(['1'], items).items;

    expect(points['1'].x).toEqual(0);
    expect(points['2'].x).toEqual(-10);
    expect(points['3'].x).toEqual(-10);
    expect(points['4'].x).toEqual(-35);
    expect(points['5'].x).toEqual(-95);
  });

  it('many before 2', () => {
    const items: GraphItem[] = [
      {id: '1', name: 'Покраска здания', before: ['2', '3'], long: 10, count: 1},
      {id: '2', name: 'Установка лифта', before: ['4'], long: 25, count: 1},
      {id: '3', name: 'Вставка окон', before: ['4'], long: 20, count: 1},
      {id: '4', name: 'Постройка каркаса', before: ['5'], long: 60, count: 1},
      {id: '5', name: 'Фундамент', long: 60, count: 1},
    ];

    const points = service.calcPoints(['1'], items).items;

    expect(points['1'].x).toEqual(0);
    expect(points['2'].x).toEqual(-10);
    expect(points['3'].x).toEqual(-10);
    expect(points['4'].x).toEqual(-35);
    expect(points['5'].x).toEqual(-95);
  });

  it('many y', () => {
    const items: GraphItem[] = [
      {id: '1', name: 'Покраска здания', before: ['2', '3'], long: 10, count: 1},
      {id: '2', name: 'Установка лифта', before: ['4'], long: 25, count: 1},
      {id: '3', name: 'Вставка окон', before: ['4'], long: 20, count: 1},
      {id: '4', name: 'Постройка каркаса', before: ['5'], long: 60, count: 1},
      {id: '5', name: 'Фундамент', long: 60, count: 1},
    ];

    const points = service.calcPoints(['1'], items).items;

    expect(points['1'].y).toEqual(0);
    expect(points['2'].y).toEqual(-10);
    expect(points['3'].y).toEqual(-20);
    expect(points['4'].y).toEqual(-30);
    expect(points['5'].y).toEqual(-40);
  });

  it('rect sizes', () => {
    const items: GraphItem[] = [
      {id: '1', name: 'Покраска здания', before: ['2', '3'], long: 10, count: 1},
      {id: '2', name: 'Установка лифта', before: ['4'], long: 25, count: 1},
      {id: '3', name: 'Вставка окон', before: ['4'], long: 20, count: 1},
      {id: '4', name: 'Постройка каркаса', before: ['5'], long: 60, count: 1},
      {id: '5', name: 'Фундамент', long: 60, count: 1},
    ];

    const rect = service.calcPoints(['1'], items).rect;

    expect(rect.x).toEqual(-155);
    expect(rect.y).toEqual(-50);
  });
});
