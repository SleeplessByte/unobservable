import { expect } from 'chai'
import { describe, it } from 'mocha'
import flatMap from '../flatMap'
import Observable from '../observable'

describe('flatMap', () => {
  it('merges observables coming from transform function', done => {
    const numbers: number[] = []
    flatMap(
      new Observable<number>(({ next, complete }) => {
        next(10)
        next(20)
        complete()
      }),
      value =>
        new Observable<number>(({ next, complete }) => {
          Promise.resolve(value * 2)
            .then(next)
            .then(complete)
        })
    ).subscribe({
      error: done,
      next(n) {
        numbers.push(n)
      },
      complete() {
        expect(numbers).to.deep.equal(
          [20, 40],
          'flatMap did not work correctly'
        )
        done()
      }
    })
  })
})
