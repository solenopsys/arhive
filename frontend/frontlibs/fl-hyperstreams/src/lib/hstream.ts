import {Observable, Subject} from "rxjs";


export class HStream {


  constructor(
    public readonly streamId: number,
    public readonly serviceId: number,
    public readonly input: Subject<ArrayBuffer>,
    public readonly output: Subject<ArrayBuffer>,
    public readonly url: string
  ) {
  }

  pipe(): Observable<ArrayBuffer> {
    return this.input.pipe();
  }

  send(body: ArrayBuffer, functionId: number, first: boolean): any {
    let headerSize = 6;
    if (first) {
      headerSize += 2;
    }
    let dataView = new DataView(new ArrayBuffer(headerSize));


    let data = new Uint8Array(body);
    const buffer = new Uint8Array(headerSize+data.length);

    const firstFrame = 15;

    dataView.setUint32(0, this.streamId);
    dataView.setUint8(4, firstFrame);
    dataView.setUint8(5, functionId);
    if (first) {
      dataView.setUint16(6, this.serviceId);
    }

    buffer.set(new Uint8Array(dataView.buffer), 0);
    buffer.set(new Uint8Array(body), headerSize);

    this.output.next(buffer.buffer);
  }
}
