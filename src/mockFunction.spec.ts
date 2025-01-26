import { obj } from "./mockFunction";

/**스파이 함수를 심은 minus가 계속 실행이 되는걸로 집계가 되서 toHaveBeenCalledTimes가 제대로 동작을 하지않아서
 * 초기화 해주는 작업
 */
beforeEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

/**
 * 테스트함수마다 테스트 마지막에 변수.mockClear() .mockReset() .mopckRestore(); 등을 넣어서 초기화해줄수있다.
 * mockClear는 함수가 몇번실행되었는지 , 누구와 함께 실행되었는지 그런정보들만 초기화함
 * mockReset은 함수를 비워버린다 ex) mockClear + mockImplementation(()=>{}) 라고 볼수있다.
 * mockRestore는 함수 본래의 기능만 남기고 아예 전부 없애버린다. (강력한 초기화)
 */

/**skip은 건너뛰는 의미다 해당 테스트를 건너뛰므로 에러가 뜨지않는다.
 * skip대신 앞에 x를 붙여도된다 xtest 이런식으로
 */
test.skip("obj.minus 함수가 1번 호출되었다(minus 함수에 spy 삽입)", () => {
  jest.spyOn(obj, "minus");
  const result = obj.minus(1, 2);
  console.log(obj.minus);
  expect(obj.minus).toHaveBeenCalledTimes(1);
  expect(result).toBe(-1);
});

// 테스트 나중에 만들껀  투두를 붙이면된다.
test.todo("나중에 만들어야지~");

it("잇과 test는 똑같다", () => {});

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

/** beforeAll라던가 Each같은 이런것들을 모든 테스트에 적용하기 싫다
 * 일부 테스트들만 적용하고싶다 라고하면
 * descirbe로 적용하고싶은 애들만 묶어서 그 안에 넣으면된다.
 * descirbe는 그룹화를 위한 메서드다.
 */

describe("디스크라이브는 그룹화를 시킬수있다.", () => {
  /** before나 after를 이렇게 describe 안에 넣으면
   * describe 안에 있는 테스트들만 적용됨
   */
  beforeEach(() => {
    console.log("디스크라이브 내부의 각 테스트 전에 실행할거 ");
  });
  afterEach(() => {
    console.log("디스크라이브 내부의 각 테스트 후에 실행할거");
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
});

//모든 테스트 실행전
beforeAll(() => {
  console.log("이 테스트 파일 준비사항");
});

//각 테스트 실행 전
beforeEach(() => {
  console.log("각 테스트 전에 실행할거");
});

//각 테스트 실행 후
afterEach(() => {
  console.log("각 테스트 후에 실행할거");
});

//모든 테스트 끝난후
afterAll(() => {
  console.log("모든 테스트 끝난후 실행할거");
});
