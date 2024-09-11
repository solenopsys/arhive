import {DataPageConfig, FieldType} from "@solenopsys/fl-dgraph";
import {KubernetesDataProvider} from "./kubernetes-data-provider.service";
import {QConf} from "./kubernetes.service";

const podsTransform = (obj: { items: any[], kind: string, apiVersion: string }) => {
  return obj.items?.map(item => {
    return {
      name: item?.metadata?.name,
      namespace: item?.metadata?.namespace,
      status: item?.status?.phase,
      ip: item?.status?.podIP,
      node: item?.spec?.nodeName
    }
  })
};

const nodesTransform = (obj: { items: any[], kind: string, apiVersion: string }) => {
  return obj.items?.map(item => {
    return {
      name: item?.metadata?.name,
    }
  })
};

export type DataPageConfigTransform =  {
  map: (obj: { items: any[], kind: string, apiVersion: string }) => {}
} & DataPageConfig


export const PODS: DataPageConfigTransform = {
  title: 'RoutePods',
  fields: [
    {key: 'name', title: 'Name', type: FieldType.STRING},
    {key: 'status', title: 'Status', type: FieldType.STRING},
    {key: 'ip', title: 'IP', type: FieldType.STRING},
    {key: 'node', title: 'Node', type: FieldType.STRING},
    {key: 'namespace', title: 'Namespace', type: FieldType.STRING},
  ],
  commands: [],
  listQ: '/api/v1/pods',
  map: podsTransform,
  dataProvider: KubernetesDataProvider,
};

export const ROUTE_PODS: DataPageConfigTransform = {
  title: 'RoutePods',
  fields: [
    {key: 'name', title: 'Name', type: FieldType.STRING},
    {key: 'status', title: 'Status', type: FieldType.STRING},
    {key: 'ip', title: 'IP', type: FieldType.STRING},
    {key: 'node', title: 'Node', type: FieldType.STRING},
    {key: 'namespace', title: 'Namespace', type: FieldType.STRING},
  ],
  commands: [],
  listQ: '/api/v1/pods?labelSelector=type%3DhStreamNode',
  map: podsTransform,
  dataProvider: KubernetesDataProvider,
};


export const TOP_PODS: DataPageConfigTransform = {
  title: 'RoutePods',
  fields: [
    {key: 'name', title: 'Name', type: FieldType.STRING},
  ],
  commands: [],
  listQ: '/api/',

  map: podsTransform,
  dataProvider: KubernetesDataProvider,
};

export const NODES: DataPageConfigTransform = {
  title: 'Nodes',
  fields: [
    {key: 'name', title: 'Name', type: FieldType.STRING},
  ],
  commands: [],
  listQ: '/api/v1/nodes',
  map: nodesTransform,
  dataProvider: KubernetesDataProvider,
};

export const TABLES = {
  pods: PODS,
  route_pods: ROUTE_PODS,
  nodes: NODES,
  top_pods: TOP_PODS,
};

//https://kubernetes.io/docs/reference/using-api/api-concepts/#retrieving-large-results-sets-in-chunks


