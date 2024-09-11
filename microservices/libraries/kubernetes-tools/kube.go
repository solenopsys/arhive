package bl_kubernetes_tools

import (
	"context"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/klog/v2"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"sigs.k8s.io/controller-runtime/pkg/client"

	"os"
	"path/filepath"
)

func GetCubeConfig(devMode bool) (*rest.Config, error) {
	if devMode {
		var kubeconfigFile = os.Getenv("kubeconfigPath")
		kubeConfigPath := filepath.Join(kubeconfigFile)
		klog.Infof("Using kubeconfig: %s\n", kubeConfigPath)

		kubeConfig, err := clientcmd.BuildConfigFromFlags("", kubeConfigPath)
		if err != nil {
			klog.Error("error getting Kubernetes config: %v\n", err)
			os.Exit(1)
		}

		return kubeConfig, nil
	} else {
		config, err := rest.InClusterConfig()
		if err != nil {
			return nil, err
		}

		return config, nil
	}
}

func CreateKubeConfig(devMode bool) (*kubernetes.Clientset, client.Client) {

	config, err := GetCubeConfig(devMode)
	if err != nil {
		klog.Info("Config init error...", err)
		os.Exit(1)
	}
	forConfig, err := kubernetes.NewForConfig(config)
	c, _ := client.New(config, client.Options{})
	if err != nil {
		klog.Info("Config init error...", err)
		os.Exit(1)
	}
	return forConfig, c
}

func ReadConfigMap(secretName string, clientset *kubernetes.Clientset) map[string][]byte {
	secretNamespace := "default"
	secret, err := clientset.CoreV1().Secrets(secretNamespace).Get(context.Background(), secretName, metav1.GetOptions{})
	if err != nil {
		panic(err.Error())
	}

	return secret.Data
}
