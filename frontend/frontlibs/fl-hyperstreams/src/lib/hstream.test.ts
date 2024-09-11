import {HStream} from './hstream';
import {Subject} from "rxjs";
import { describe, it, expect } from 'vitest';



describe('HStream', () => {

  it('should right prefix ', async () => {
    let fakeSubject:any = {};
    fakeSubject.next=(res:any)=>{fakeSubject.result=res}
    const url="http://localhost:8080" //todo
    let hStream = new HStream(2212, 2, new Subject<ArrayBuffer>(), fakeSubject,url);
    let uint8Array = new Uint8Array([0, 0, 8, 164, 0, 2,0, 33,2,3,3,4]);

    let body = new Uint8Array([2,3,3,4]);
    hStream.send(body.buffer,33,true )
    expect(new Uint8Array(fakeSubject.result)).toEqual(uint8Array);

    const dataView= new DataView(fakeSubject.result)
    const id = dataView.getUint32(0,false); // 'abc'
    expect(id).toEqual(2212);
  });


});

