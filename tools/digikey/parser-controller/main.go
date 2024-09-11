package main

import (
	"k8s.io/klog/v2"
	"os"
)

func main() {

	klog.Info("Starting...")
	db := Db{
		name:     "parsing",
		password: os.Getenv("postgres.Password"),
		username: os.Getenv("postgres.User"),
		host:     os.Getenv("postgres.Host"),
		port:     os.Getenv("postgres.Port"),
	}
	klog.Info("Connect to db...")
	err := db.Connect()
	if err != nil {
		klog.Fatal(err)
	}

	klog.Info("Migration...")
	err = db.Migrate()
	if err != nil {
		klog.Fatal(err)
	}
	defer func(db *Db) {
		err := db.Disconnect()
		if err != nil {
			klog.Fatal(err)
		}
	}(&db)

	var storage Storage

	storage = &PgStorage{
		db: db,
	}
	klog.Info("Start api...")
	api := Api{
		storage: storage,
		port:    os.Getenv("api.Port"),
	}

	api.Run()
}
