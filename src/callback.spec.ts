import { timer } from "./callback";

// toBe('fail') 이라고 해도 테스트가 통과된다 왜냐면 jest가 셋타임아웃3초를 못기다린다.
// 기다리게 만드려면 done 이라는 매개변수 함수가 있는데 이걸 사용하면 테스트를 멈출수있다(3초를 기다린다)
// 그래서 콜백함수를 테스트할떄는 done을 사용하면좋다.
// 웬만해선 콜백함수를 테스트 안하는게 좋고, 해야되면 promise로 바꾸는게좋다 이런거 신경안써도되니까

test("타이머 잘 실행되나?", (done) => {
  timer((message: string) => {
    expect(message).toBe("success");
    done();
  });
});
