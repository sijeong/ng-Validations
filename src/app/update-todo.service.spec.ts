import { TestBed } from '@angular/core/testing';

import { UpdateTodoService } from './update-todo.service';

describe('UpdateTodoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateTodoService = TestBed.get(UpdateTodoService);
    expect(service).toBeTruthy();
  });
});
