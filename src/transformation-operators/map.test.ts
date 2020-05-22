import { marbles } from "rxjs-marbles/jest"
import { multiplyByTen, castStringsToNumbers } from "./map"

describe("map", () => {
  describe("multiplyByTen", () => {
    it(
      "multiplies every numeric value of a stream by 10",
      marbles((m) => {
        const input$ = m.hot("--^-a-b-c-|", { a: 1, b: 5, c: 10 })
        const result$ = m.hot("--^-x-y-z-|", { x: 10, y: 50, z: 100 })

        m.expect(multiplyByTen(input$)).toBeObservable(result$)
      })
    )
  })

  describe("castStringsToNumbers", () => {
    it(
      "converts every string number of a stream to a 10 base number",
      marbles((m) => {
        const input$ = m.hot("--^-a-b-c-|", { a: "1", b: "5", c: "10" })
        const result$ = m.hot("--^-x-y-z-|", { x: 1, y: 5, z: 10 })

        m.expect(castStringsToNumbers(input$)).toBeObservable(result$)
      })
    )

    it(
      "ignores any non number string",
      marbles((m) => {
        const input$ = m.hot("--^-a-b-c-|", { a: "1", b: "a", c: "2.45" })
        const result$ = m.hot("--^-x---y-|", { x: 1, y: 2.45 })

        m.expect(castStringsToNumbers(input$)).toBeObservable(result$)
      })
    )
  })
})

// RxJS provides the tools for marble testing, without the need to install an external library
// Testing can be done by using the TestScheduler as per the example below.s
// The reason to choose rxjs-marbles library for testing is because it has
// is more intuitive and simple API compared to the native tools.
//
// import { TestScheduler } from 'rxjs/testing';
//
// const testScheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));
//
// it("multiplies every numeric value of a stream by 10", () =>
//   testScheduler.run(({ hot, expectObservable }) => {
//     const input$ =   hot("--^-a-b-c-|", { a: 1, b: 5, c: 10 });
//     expectObservable(multiplyByTen(input$)).toBe("--^-x-y-z-|", { x: 10, y: 50, z: 100 });
//   })
// )
