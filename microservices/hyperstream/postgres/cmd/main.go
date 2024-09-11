package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/lib/pq"
	zmq_connector "github.com/solenopsys/sc-bl-zmq-connector"
	"os"
	"strconv"
)

func CheckError(err error) {
	if err != nil {

		panic(err)
	}
}

func processingFunction(db *sql.DB) func(message []byte, functionId uint8) []byte {
	return func(message []byte, functionId uint8) []byte {
		if functionId == 2 {
			return jsonResponse(db, message)
		}
		if functionId == 1 {
			return nativeConvert(db, message)
		}
		return []byte("FUNCTION_NOT_FOUND")
	}
}

func jsonResponse(db *sql.DB, message []byte) []byte {
	var q = string(message)

	rows, err := db.Query(q)

	if err != nil {
		println("ERROR", err)
		return []byte("ERROR")
	} else {
		var (
			json []byte
		)
		rows.Next()
		err := rows.Scan(&json)
		if err != nil {
			return []byte("ERROR")
		}
		return json
	}
}

func nativeConvert(db *sql.DB, message []byte) []byte {

	var q = string(message)
	println("QUERY")
	println(q)

	rows, err := db.Query(q)
	CheckError(err)
	columns, err := rows.Columns()
	CheckError(err)
	defer rows.Close()
	var allMaps [][]string
	for rows.Next() {

		values := make([]interface{}, len(columns))
		pointers := make([]interface{}, len(columns))
		for i, _ := range values {
			pointers[i] = &values[i]
		}

		var rowValues = []string{}
		err := rows.Scan(pointers...)
		for _, val := range values {
			fmt.Printf("Adding key=%s val=%v\n", "bla", val)

			if val != nil {
				fVal := fmt.Sprintf("%v", val)
				rowValues = append(rowValues, fVal)
			} else {
				rowValues = append(rowValues, "NULL")
			}

		}
		allMaps = append(allMaps, rowValues)

		println("ERR", err)

		CheckError(err)
	}
	vl, err := json.Marshal(allMaps)
	if err != nil {
		println("ERROR", err)
	} else {
		println("JSON", string(vl))
	}

	//i, e := json.Marshal(["bla"])
	//CheckError(e)
	return vl

}

func main() {
	host := os.Getenv("postgres.Host")
	port, err := strconv.ParseInt(os.Getenv("postgres.Port"), 10, 16)
	CheckError(err)
	user := os.Getenv("postgres.User")
	password := os.Getenv("postgres.Password")
	// connection string
	psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, "postgres")

	// open database
	db, err := sql.Open("postgres", psqlconn)

	CheckError(err)
	template := zmq_connector.HsTemplate{Pf: processingFunction(db)}
	template.Init()

}
