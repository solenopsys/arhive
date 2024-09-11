import {Injectable} from "@angular/core";
import {ReplaySubject, Subject, Subscription} from "rxjs";

import {ConnectSocket, DisconnectSocket, ErrorSocket, HStreamsState, SocketConnected} from "./hstreams.store";
import {Store} from "@ngxs/store";
import {aleaRNGFactory, NumberGenerator} from "number-generator";
import {DataHstreamModule} from "./data-hstream.module";
import {HStream} from "./hstream";

export type PoolItem ={
  input: Subject<any>;
  is?: Subscription;
  output: Subject<any>;
  os?: Subscription;
  ws: WebSocket;
}


const STREAM_ERROR: number = 13;
const MAX_UINT_32: number = 4294967295;

@Injectable({
  providedIn: DataHstreamModule
})
export class StreamsPool {
  randomGen: NumberGenerator;
  streams: { [key: number]: HStream } = {};

  constructor(private store: Store) {
    this.randomGen = aleaRNGFactory(2);
  }

  processMessage(streamId: number, messageBody: ArrayBuffer) {
    console.log("STREAM ID", streamId);
    console.log("STREAMS", this.streams);
    let stream = this.streams[streamId];
    stream.input.next(messageBody);
  }

  getRandomArbitrary(min: number, max: number) {
    return Math.floor(  Math.random() * (max - min) + min);
  }

  genNumber(): number {
    let id = this.getRandomArbitrary(0, MAX_UINT_32);
    if (this.streams[id]) {
      return this.genNumber();
    } else {
      return id;
    }
  }

  createStream(service: string, url: string) {
    let serviceNumber = this.store.selectSnapshot(HStreamsState.getServiceIdByName(url, service));

    if (!serviceNumber) {
      throw new Error(`SERVICE "${service}" NOT NUMBER URL "${url}"`);
    }


    console.log("CREATE STREAM ", serviceNumber, " SERVICE NAME ", service);
    console.log("MAPPING" + this.store.snapshot().map);
    let id = this.genNumber();
    console.log("STREAM ID " + id);
    const hStream = new HStream(id, serviceNumber, new Subject<ArrayBuffer>(), new Subject<ArrayBuffer>(), url);

    this.streams[hStream.streamId] = hStream;
    return hStream;
  }
}


@Injectable({
  providedIn: DataHstreamModule
})
export class WsPool {
  sockets: { [key: string]: PoolItem } = {};


  constructor(private store: Store, private streamsPool: StreamsPool) {
  }


  createSocket(url: string, token: string) {
    let ws = new WebSocket(url + "?token=" + token);
    ws.binaryType = "arraybuffer";
    const poolItem: PoolItem = { input: new Subject(), output: new ReplaySubject(10), ws };
    this.sockets[url] = poolItem;
  }


  disconnect(url: string) {
    const conf = this.sockets[url];
    conf.is?.unsubscribe();
    conf.os?.unsubscribe();
    conf.ws.close();
    delete this.sockets[url];
  }

  connect(url: string) {
    let poolItem = this.sockets[url];
    poolItem.ws.onerror = (event: any) => {
      this.store.dispatch(new ErrorSocket(url, event.message));
    };

    poolItem.ws.onopen = () => {
      this.store.dispatch(new SocketConnected(url));
    };
  }


  initProcessing(url: string) {
    let poolItem = this.sockets[url];
    poolItem.ws.onmessage = (event: { data: ArrayBuffer }) => {
      poolItem.input.next(event.data);
    };

    poolItem.is = poolItem.input.subscribe((message: ArrayBuffer) => { //todo отписаться
      const header = message.slice(0, 6);
      let dataView = new DataView(header);
      const id = dataView.getUint32(0, false); // 'abc'
      const streamStatus = dataView.getUint8(4);

      const functionStatus = dataView.getUint8(5);

      const body = message.slice(6);
      if (streamStatus == STREAM_ERROR) {
        console.error(body);
        //todo выйти из стрима
      } else {
        this.streamsPool.processMessage(id, body);
      }

    });

    poolItem.os = poolItem.output.subscribe((message: ArrayBuffer) => { //todo отписаться
      poolItem.ws.send(message);
    });
  }

  socketError(url: string, message: string) {
    this.store.dispatch(new DisconnectSocket(url));
    setTimeout(() => {
      this.store.dispatch(new ConnectSocket(url));
    }, 1000);
  }

}





