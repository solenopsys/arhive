/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export type OperationStatus ={
  status: string;
}

export type Chart = {
  name: string;
  repository: string;
  version: string;
  digest: string;
}

export type GetChartsRequest = {
}

export type ChartsResponse = {
  charts: Chart[];
}

export type InstallChartRequest = {
  chart: Chart | undefined;
}

export type UninstallChartRequest = {
  digest: string;
}

function createBaseOperationStatus(): OperationStatus {
  return { status: "" };
}

export const OperationStatus = {
  encode(message: OperationStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OperationStatus {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOperationStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OperationStatus {
    return { status: isSet(object.status) ? String(object.status) : "" };
  },

  toJSON(message: OperationStatus): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OperationStatus>, I>>(object: I): OperationStatus {
    const message = createBaseOperationStatus();
    message.status = object.status ?? "";
    return message;
  },
};

function createBaseChart(): Chart {
  return { name: "", repository: "", version: "", digest: "" };
}

export const Chart = {
  encode(message: Chart, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.repository !== "") {
      writer.uint32(18).string(message.repository);
    }
    if (message.version !== "") {
      writer.uint32(26).string(message.version);
    }
    if (message.digest !== "") {
      writer.uint32(34).string(message.digest);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Chart {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChart();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.repository = reader.string();
          break;
        case 3:
          message.version = reader.string();
          break;
        case 4:
          message.digest = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Chart {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      repository: isSet(object.repository) ? String(object.repository) : "",
      version: isSet(object.version) ? String(object.version) : "",
      digest: isSet(object.digest) ? String(object.digest) : "",
    };
  },

  toJSON(message: Chart): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.repository !== undefined && (obj.repository = message.repository);
    message.version !== undefined && (obj.version = message.version);
    message.digest !== undefined && (obj.digest = message.digest);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Chart>, I>>(object: I): Chart {
    const message = createBaseChart();
    message.name = object.name ?? "";
    message.repository = object.repository ?? "";
    message.version = object.version ?? "";
    message.digest = object.digest ?? "";
    return message;
  },
};

function createBaseGetChartsRequest(): GetChartsRequest {
  return {};
}

export const GetChartsRequest = {
  encode(_: GetChartsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetChartsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetChartsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GetChartsRequest {
    return {};
  },

  toJSON(_: GetChartsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetChartsRequest>, I>>(_: I): GetChartsRequest {
    const message = createBaseGetChartsRequest();
    return message;
  },
};

function createBaseChartsResponse(): ChartsResponse {
  return { charts: [] };
}

export const ChartsResponse = {
  encode(message: ChartsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.charts) {
      Chart.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChartsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChartsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.charts.push(Chart.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChartsResponse {
    return { charts: Array.isArray(object?.charts) ? object.charts.map((e: any) => Chart.fromJSON(e)) : [] };
  },

  toJSON(message: ChartsResponse): unknown {
    const obj: any = {};
    if (message.charts) {
      obj.charts = message.charts.map((e) => e ? Chart.toJSON(e) : undefined);
    } else {
      obj.charts = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChartsResponse>, I>>(object: I): ChartsResponse {
    const message = createBaseChartsResponse();
    message.charts = object.charts?.map((e) => Chart.fromPartial(e)) || [];
    return message;
  },
};

function createBaseInstallChartRequest(): InstallChartRequest {
  return { chart: undefined };
}

export const InstallChartRequest = {
  encode(message: InstallChartRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chart !== undefined) {
      Chart.encode(message.chart, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InstallChartRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInstallChartRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chart = Chart.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstallChartRequest {
    return { chart: isSet(object.chart) ? Chart.fromJSON(object.chart) : undefined };
  },

  toJSON(message: InstallChartRequest): unknown {
    const obj: any = {};
    message.chart !== undefined && (obj.chart = message.chart ? Chart.toJSON(message.chart) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InstallChartRequest>, I>>(object: I): InstallChartRequest {
    const message = createBaseInstallChartRequest();
    message.chart = (object.chart !== undefined && object.chart !== null) ? Chart.fromPartial(object.chart) : undefined;
    return message;
  },
};

function createBaseUninstallChartRequest(): UninstallChartRequest {
  return { digest: "" };
}

export const UninstallChartRequest = {
  encode(message: UninstallChartRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.digest !== "") {
      writer.uint32(10).string(message.digest);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UninstallChartRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUninstallChartRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.digest = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UninstallChartRequest {
    return { digest: isSet(object.digest) ? String(object.digest) : "" };
  },

  toJSON(message: UninstallChartRequest): unknown {
    const obj: any = {};
    message.digest !== undefined && (obj.digest = message.digest);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UninstallChartRequest>, I>>(object: I): UninstallChartRequest {
    const message = createBaseUninstallChartRequest();
    message.digest = object.digest ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
