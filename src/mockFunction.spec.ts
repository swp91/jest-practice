import { obj } from "./mockFunction";

beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

test("obj.minus 함수가 1번 호출되었다(minus 함수에 spy 삽입)", () => {
  jest.spyOn(obj, "minus");
  const result = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(-1);
});

test("obj.minus에 스파이를 심고 실행도 안되게", () => {
  jest.spyOn(obj, "minus").mockImplementation();
  const result = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).not.toBe(-1);
});

test("obj.minus에 스파이를 심고 리턴값을 바꾸게", () => {
  jest.spyOn(obj, "minus").mockImplementation((a, b) => a + b);
  const result = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(3);
});

test("mockImplementationOnce는 한번만 실행되는 가상함수 끝나면 원래함수로", () => {
  jest
    .spyOn(obj, "minus")
    .mockImplementationOnce((a, b) => a + b)
    .mockImplementationOnce(() => 5);
  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);
  expect(obj.minus).toHaveBeenCalledTimes(3);
  expect(result1).toBe(3);
  expect(result2).toBe(5);
  expect(result3).toBe(-1);
});

test("mockImplementationOnce실행후 그 이후는 쭉 설정한 mock 함수로", () => {
  jest
    .spyOn(obj, "minus")
    .mockImplementationOnce((a, b) => a + b)
    .mockImplementationOnce(() => 5)
    .mockImplementation(() => 4);
  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);
  expect(obj.minus).toHaveBeenCalledTimes(3);
  expect(result1).toBe(3);
  expect(result2).toBe(5);
  expect(result3).toBe(4);
});

test("리턴값이 다르게 나오기(mockReturnValue)", () => {
  jest.spyOn(obj, "minus").mockReturnValue(5);
  const result1 = obj.minus(1, 2);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result1).toBe(5);
});

test("리턴값이 다르게 나오기(mockReturnValueOnce) 한번만", () => {
  jest
    .spyOn(obj, "minus")
    .mockReturnValueOnce(5)
    .mockReturnValueOnce(3)
    .mockReturnValue(8);
  const result1 = obj.minus(1, 2);
  const result2 = obj.minus(1, 2);
  const result3 = obj.minus(1, 2);
  expect(obj.minus).toHaveBeenCalledTimes(3);
  expect(result1).toBe(5);
  expect(result2).toBe(3);
  expect(result3).toBe(8);
});
