import { assert, expect, test } from 'vitest'
import { BaseDirPipe } from './base-dir.pipe';

test('create an instance', () => {
  const pipe = new BaseDirPipe("rom");
  expect(pipe).toBeTruthy();
});

test('change value', () => {
  const pipe1 = new BaseDirPipe("/rom");
  expect(pipe1.transform("/assets")).toEqual("/rom/assets")

  const pipe2 = new BaseDirPipe("");
  expect(pipe2.transform("/assets")).toEqual("/assets")
});
