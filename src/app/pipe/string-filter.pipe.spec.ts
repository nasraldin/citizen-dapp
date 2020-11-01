import { FilterPipe } from './string-filter.pipe';
import { TestBed } from '@angular/core/testing';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [FilterPipe] });
    pipe = TestBed.inject(FilterPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: any = 'X';
    const args: string[] = [];
    expect(pipe.transform(value, args)).toEqual('Y');
  });
});
