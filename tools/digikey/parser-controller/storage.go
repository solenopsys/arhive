package main

import (
	"context"
	"k8s.io/klog/v2"
	"time"
)

type Job struct {
	Id         int    `json:"id"`
	Url        string `json:"url"`
	Components int    `json:"components"`
}

type Datasheet struct {
	Id  int    `json:"id"`
	Url string `json:"url"`
}

type Storage interface {
	GetJob() (*Job, error)
	OccupyJob(id int, components int) error
	SavePage(id int, start int, end int, body []byte)
	OccupyDatasheet() (*Datasheet, error)
	UpdateDatasheet(id int, fileName string, fileSize int) error
}

type PgStorage struct {
	db Db
}

func (s *PgStorage) GetJob() (*Job, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	rows, err := s.db.connection.QueryContext(ctx, "SELECT id,url,components FROM jobs WHERE status='new'  LIMIT 1")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	nextOk := rows.Next()

	if nextOk {
		job := Job{}
		err := rows.Scan(&job.Id, &job.Url, &job.Components)

		return &job, err
	} else {
		return nil, nil
	}
}

func (s *PgStorage) OccupyJob(id int, components int) error {
	exec, err := s.db.connection.Exec("UPDATE jobs SET status='progress', change_at=now(), components=$1 WHERE id=$2", components, id)

	klog.Info("EXEC RESULT", exec)
	return err
}

func (s *PgStorage) SavePage(id int, start int, end int, body []byte) {
	exec, err := s.db.connection.Exec("INSERT INTO pages (job_id, start_position, end_position,payload, payload_size) VALUES ($1, $2, $3, $4, $5)", id, start, end, body, len(body))

	if err != nil {
		klog.Error("Save page error", err)
	} else {
		klog.Info("Save page ok", exec)
		//go s.SyncDatasheets()
	}
}

func (s *PgStorage) SyncDatasheets() {
	exec, err := s.db.connection.Exec("insert into datasheets (url)\n\nselect distinct (url::text)\nfrom (select g.ds -> 'value' ->> 'datasheetUrl' as url\n      from (SELECT json_array_elements(json_array_elements(payload -> 'data' -> 'products')) AS ds\n            FROM pages) as g) as md\nwhere md.url is not null\n\nexcept\nselect url\nfrom datasheets\n;")
	if err != nil {
		klog.Error("Sync datasheets error", err)
	} else {
		klog.Info("Sync datasheets", exec)
	}
}

func (s *PgStorage) OccupyDatasheet() (*Datasheet, error) {
	rows, err := s.db.connection.Query("SELECT id,url FROM datasheets WHERE status='new' LIMIT 1")

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	nextOk := rows.Next()

	if nextOk {
		datasheet := Datasheet{}
		err := rows.Scan(&datasheet.Id, &datasheet.Url)

		_, err = s.db.connection.Exec("UPDATE datasheets SET status='in_progress' WHERE id=$1", datasheet.Id)

		return &datasheet, err
	} else {
		return nil, nil
	}
}

func (s *PgStorage) UpdateDatasheet(id int, fileName string, fileSize int) error {
	_, err := s.db.connection.Exec("UPDATE datasheets SET status='processed', file_name=$1, file_size=$3  WHERE id=$2", fileName, id, fileSize)
	return err
}
