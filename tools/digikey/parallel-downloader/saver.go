package main

import (
	"crypto/sha256"
	"encoding/hex"
	"os"
)

type Saver interface {
	Save(data []byte) (string, error)
}

type FileSaver struct {
	dataDir string
}

func (f *FileSaver) Save(data []byte) (string, error) {
	digest := sha256.Sum256(data)
	hexString := hex.EncodeToString(digest[:])
	dir0 := hexString[0:1]
	dir1 := hexString[1:2]
	dir2 := hexString[2:3]

	path := f.dataDir + "/" + dir0 + "/" + dir1 + "/" + dir2
	fn := hexString + ".pdf"
	fl := path + "/" + fn
	os.MkdirAll(path, 777)

	file, err := os.Create(fl)
	if err != nil {
		return "", err
	}
	defer file.Close()
	_, err = file.Write(data)
	if err != nil {
		return "", err
	}

	return fn, nil
}
