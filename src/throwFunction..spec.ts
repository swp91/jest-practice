import { error, customeError, CustomError } from "./throwFunction";

//에러를 뱉는 함수 테스트는 뒤에 toThrow가 실행되기전에 error()에서 에러를 내버리기때문에 뒤가 실행이안된다.
//그래서 expect(()=>error()) 이런식으로 함수로 한번 감싸줘야한다 그래야 테스트가 진행된다.
test("error가 잘 난다", () => {
  expect(() => error()).toThrow(Error);
  expect(() => customeError()).toThrow(CustomError);
});

// try catch 할떄는 toThrow가 아니라 catch(err)의 가 에러객체이기떄문에 각 에러객체 비교를 위해 toStrictEqual을 써야한다.(객체비교)
test("error가 잘 난다(try/catch 쓰는방법)", () => {
  try {
    error();
  } catch (err) {
    expect(err).toStrictEqual(new Error());
  }
});
