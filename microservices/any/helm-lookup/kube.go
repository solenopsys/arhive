package main

import (
	"context"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/klog/v2"
)

func loadReposFromKube() map[string]string {

	configmap, err := clientSet.CoreV1().ConfigMaps(NameSpace).Get(context.Background(), ConfigmapName, metav1.GetOptions{})
	if err != nil {
		klog.Error("error get configmap: %v\n", err)
	}

	return configmap.Data
}

func saveReposToKube(repositories map[string]string) {
	ctx := context.TODO()

	configMap := corev1.ConfigMap{
		TypeMeta: metav1.TypeMeta{
			Kind:       "ConfigMap",
			APIVersion: "v1",
		},
		ObjectMeta: metav1.ObjectMeta{
			Name:      ConfigmapName,
			Namespace: NameSpace,
		},
		Data: repositories,
	}

	_, err := clientSet.CoreV1().ConfigMaps(NameSpace).Update(ctx, &configMap, metav1.UpdateOptions{})
	if err != nil {
		klog.Error("error saving configmap: %v\n", err)
	}
}
