package main

import (
	"database/sql"
	"fmt"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	klog "k8s.io/klog/v2"
)

type Db struct {
	name       string
	password   string
	username   string
	host       string
	port       string
	connection *sql.DB
}

func (db *Db) Connect() error {

	port := db.port
	connectString := "postgres://" + db.username + ":" + db.password + "@" + db.host + ":" + port + "/" + db.name + "?sslmode=disable"
	klog.Info(connectString)
	var err error
	db.connection, err = sql.Open("postgres", connectString)

	fmt.Println("setting limits")
	db.connection.SetMaxOpenConns(5)

	if err != nil {
		panic(err)
	}

	if err = db.connection.Ping(); err != nil {
		klog.Fatal(err)
	}

	return err
}

func (db *Db) Migrate() error {
	driver, err := postgres.WithInstance(db.connection, &postgres.Config{})

	if err != nil {
		return err
	}
	m, err := migrate.NewWithDatabaseInstance(
		"file://migrations",
		db.name,
		driver,
	)
	if err != nil {
		return err
	}

	if err := m.Up(); err != nil {
		if err == migrate.ErrNoChange {
			klog.Info("No migrations to apply")
		} else {
			klog.Fatal(err)
		}
	} else {
		klog.Info("Migrations applied")
	}
	return err
}

func (db *Db) Disconnect() error {
	return db.connection.Close()
}
