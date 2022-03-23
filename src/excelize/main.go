package main

import (
	"encoding/json"
	"fmt"

	"github.com/xuri/excelize/v2"
)

func main() {

	f, err := excelize.OpenFile("D:\\self\\Go\\go-project\\src\\go_code\\excelize\\test.xlsx")
	if err != nil {
		fmt.Println("打开文件失败")
		return
	}

	sheelList := f.GetSheetList()
	currentSheet := sheelList[5] //第几个表格

	length, _ := f.GetRows(currentSheet) //获取数据量
	rows, err := f.GetRows(currentSheet)
	if err != nil {
		fmt.Println(err)
		return
	}

	//单元格
	type singleDataBox struct {
		Row    int    `json:"row"`
		Colume int    `json:"column"`
		Data   string `json:"data"`
		Note   string `json:"note"`
	}
	var dataBox [][]singleDataBox = make([][]singleDataBox, 0)
	var temporarySlice []string
	// 获取标题
	for _, value := range rows[1:2] {
		temporarySlice = append(temporarySlice, value...)
	}

	for rowsIndex, row := range rows[1:] {
		// for rowsIndex, row := range rows {
		var dataSlice []singleDataBox = make([]singleDataBox, 0)
		for rowIndex, colCell := range temporarySlice {
			var temporaryData singleDataBox
			temporaryData.Row = rowsIndex + len(length) - 5 + 1
			temporaryData.Colume = rowIndex
			if rowIndex >= len(row) {
				temporaryData.Data = ""
			} else {
				temporaryData.Data = row[rowIndex]
			}
			temporaryData.Note = colCell
			dataSlice = append(dataSlice, temporaryData)
		}
		// for rowIndex, colCell := range row {
		// 	var temporaryData singleDataBox
		// 	temporaryData.Row = rowsIndex + len(length) - 5 + 1
		// 	temporaryData.Colume = rowIndex
		// 	temporaryData.Data = colCell
		// 	temporaryData.Note = temporarySlice[rowIndex]
		// 	dataSlice = append(dataSlice, temporaryData)
		// }
		dataBox = append(dataBox, dataSlice)
	}
	result, err := json.Marshal(dataBox)
	if err != nil {
		fmt.Println("json化失败")
		return
	}
	fmt.Println(string(result))

}
