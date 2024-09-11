/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export type GetReposRequest = {
  filter: string;
}

export type Repo = {
  name: string;
  url: string;
}

export type AddRepoRequest = {
  name: string;
  url: string;
}

export type RemoveRepoRequest = {
  url: string;
}

export type ReposResponse = {
  repos: Repo[];
}

export type OperationStatus = {
  status: boolean;
}

export type GetChartsRequest = {
  reload: boolean;
  filter: string;
}

export type ChartsResponse = {
  charts: Chart[];
}

export type GetInstalledRequest ={
  digests: string[];
}

export type InstallChartRequest = {
  digest: string;
}

export type UninstallChartRequest = {
  digest: string;
}

export type Chart = {
  name: string;
  version: string;
  description: string;
  icon: string;
  created: string;
  digest: string;
  repo: string;
}

function createBaseGetReposRequest(): GetReposRequest {
  return { filter: "" };
}

export const GetReposRequest = {
  encode(message: GetReposRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== "") {
      writer.uint32(10).string(message.filter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetReposRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetReposRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.filter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetReposRequest {
    return { filter: isSet(object.filter) ? String(object.filter) : "" };
  },

  toJSON(message: GetReposRequest): unknown {
    const obj: any = {};
    message.filter !== undefined && (obj.filter = message.filter);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetReposRequest>, I>>(object: I): GetReposRequest {
    const message = createBaseGetReposRequest();
    message.filter = object.filter ?? "";
    return message;
  },
};

function createBaseRepo(): Repo {
  return { name: "", url: "" };
}

export const Repo = {
  encode(message: Repo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Repo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRepo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Repo {
    return { name: isSet(object.name) ? String(object.name) : "", url: isSet(object.url) ? String(object.url) : "" };
  },

  toJSON(message: Repo): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Repo>, I>>(object: I): Repo {
    const message = createBaseRepo();
    message.name = object.name ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseAddRepoRequest(): AddRepoRequest {
  return { name: "", url: "" };
}

export const AddRepoRequest = {
  encode(message: AddRepoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddRepoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddRepoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddRepoRequest {
    return { name: isSet(object.name) ? String(object.name) : "", url: isSet(object.url) ? String(object.url) : "" };
  },

  toJSON(message: AddRepoRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddRepoRequest>, I>>(object: I): AddRepoRequest {
    const message = createBaseAddRepoRequest();
    message.name = object.name ?? "";
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseRemoveRepoRequest(): RemoveRepoRequest {
  return { url: "" };
}

export const RemoveRepoRequest = {
  encode(message: RemoveRepoRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.url !== "") {
      writer.uint32(10).string(message.url);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RemoveRepoRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRemoveRepoRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.url = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RemoveRepoRequest {
    return { url: isSet(object.url) ? String(object.url) : "" };
  },

  toJSON(message: RemoveRepoRequest): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RemoveRepoRequest>, I>>(object: I): RemoveRepoRequest {
    const message = createBaseRemoveRepoRequest();
    message.url = object.url ?? "";
    return message;
  },
};

function createBaseReposResponse(): ReposResponse {
  return { repos: [] };
}

export const ReposResponse = {
  encode(message: ReposResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.repos) {
      Repo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ReposResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReposResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.repos.push(Repo.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ReposResponse {
    return { repos: Array.isArray(object?.repos) ? object.repos.map((e: any) => Repo.fromJSON(e)) : [] };
  },

  toJSON(message: ReposResponse): unknown {
    const obj: any = {};
    if (message.repos) {
      obj.repos = message.repos.map((e) => e ? Repo.toJSON(e) : undefined);
    } else {
      obj.repos = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ReposResponse>, I>>(object: I): ReposResponse {
    const message = createBaseReposResponse();
    message.repos = object.repos?.map((e) => Repo.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOperationStatus(): OperationStatus {
  return { status: false };
}

export const OperationStatus = {
  encode(message: OperationStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.status === true) {
      writer.uint32(8).bool(message.status);
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
          message.status = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OperationStatus {
    return { status: isSet(object.status) ? Boolean(object.status) : false };
  },

  toJSON(message: OperationStatus): unknown {
    const obj: any = {};
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OperationStatus>, I>>(object: I): OperationStatus {
    const message = createBaseOperationStatus();
    message.status = object.status ?? false;
    return message;
  },
};

function createBaseGetChartsRequest(): GetChartsRequest {
  return { reload: false, filter: "" };
}

export const GetChartsRequest = {
  encode(message: GetChartsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reload === true) {
      writer.uint32(8).bool(message.reload);
    }
    if (message.filter !== "") {
      writer.uint32(18).string(message.filter);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetChartsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetChartsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reload = reader.bool();
          break;
        case 2:
          message.filter = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetChartsRequest {
    return {
      reload: isSet(object.reload) ? Boolean(object.reload) : false,
      filter: isSet(object.filter) ? String(object.filter) : "",
    };
  },

  toJSON(message: GetChartsRequest): unknown {
    const obj: any = {};
    message.reload !== undefined && (obj.reload = message.reload);
    message.filter !== undefined && (obj.filter = message.filter);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetChartsRequest>, I>>(object: I): GetChartsRequest {
    const message = createBaseGetChartsRequest();
    message.reload = object.reload ?? false;
    message.filter = object.filter ?? "";
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

function createBaseGetInstalledRequest(): GetInstalledRequest {
  return { digests: [] };
}

export const GetInstalledRequest = {
  encode(message: GetInstalledRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.digests) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetInstalledRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetInstalledRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.digests.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetInstalledRequest {
    return { digests: Array.isArray(object?.digests) ? object.digests.map((e: any) => String(e)) : [] };
  },

  toJSON(message: GetInstalledRequest): unknown {
    const obj: any = {};
    if (message.digests) {
      obj.digests = message.digests.map((e) => e);
    } else {
      obj.digests = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetInstalledRequest>, I>>(object: I): GetInstalledRequest {
    const message = createBaseGetInstalledRequest();
    message.digests = object.digests?.map((e) => e) || [];
    return message;
  },
};

function createBaseInstallChartRequest(): InstallChartRequest {
  return { digest: "" };
}

export const InstallChartRequest = {
  encode(message: InstallChartRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.digest !== "") {
      writer.uint32(10).string(message.digest);
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
          message.digest = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InstallChartRequest {
    return { digest: isSet(object.digest) ? String(object.digest) : "" };
  },

  toJSON(message: InstallChartRequest): unknown {
    const obj: any = {};
    message.digest !== undefined && (obj.digest = message.digest);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InstallChartRequest>, I>>(object: I): InstallChartRequest {
    const message = createBaseInstallChartRequest();
    message.digest = object.digest ?? "";
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

function createBaseChart(): Chart {
  return { name: "", version: "", description: "", icon: "", created: "", digest: "", repo: "" };
}

export const Chart = {
  encode(message: Chart, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.icon !== "") {
      writer.uint32(34).string(message.icon);
    }
    if (message.created !== "") {
      writer.uint32(42).string(message.created);
    }
    if (message.digest !== "") {
      writer.uint32(50).string(message.digest);
    }
    if (message.repo !== "") {
      writer.uint32(58).string(message.repo);
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
          message.version = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.icon = reader.string();
          break;
        case 5:
          message.created = reader.string();
          break;
        case 6:
          message.digest = reader.string();
          break;
        case 7:
          message.repo = reader.string();
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
      version: isSet(object.version) ? String(object.version) : "",
      description: isSet(object.description) ? String(object.description) : "",
      icon: isSet(object.icon) ? String(object.icon) : "",
      created: isSet(object.created) ? String(object.created) : "",
      digest: isSet(object.digest) ? String(object.digest) : "",
      repo: isSet(object.repo) ? String(object.repo) : "",
    };
  },

  toJSON(message: Chart): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.version !== undefined && (obj.version = message.version);
    message.description !== undefined && (obj.description = message.description);
    message.icon !== undefined && (obj.icon = message.icon);
    message.created !== undefined && (obj.created = message.created);
    message.digest !== undefined && (obj.digest = message.digest);
    message.repo !== undefined && (obj.repo = message.repo);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Chart>, I>>(object: I): Chart {
    const message = createBaseChart();
    message.name = object.name ?? "";
    message.version = object.version ?? "";
    message.description = object.description ?? "";
    message.icon = object.icon ?? "";
    message.created = object.created ?? "";
    message.digest = object.digest ?? "";
    message.repo = object.repo ?? "";
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
