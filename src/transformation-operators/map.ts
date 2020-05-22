import { filter, map } from "rxjs/operators"
import { Observable } from "rxjs"

export { multiplyByTen, castStringsToNumbers }

function multiplyByTen(observable: Observable<number>): Observable<number> {
 return observable.pipe(
   map(num => num * 10)
 )
}


function castStringsToNumbers(observable: Observable<string>): Observable<number> {
 return observable.pipe(
   map(str => Number(str)),
   filter( val => !Number.isNaN(val))
 )
}