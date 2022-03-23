package main

import (
	"fmt"
	"math/rand"
	"testing"

	"github.com/xuri/excelize/v2"
)

func TestReadExcel(t *testing.T) {
	// readExcel()
	addData()
}

// func readExcel() {
// 	f := excelize.NewFile()
// 	f.SetCellValue("Sheet1", "B2", "golang")
// 	if err := f.SaveAs("excel01.xlsx"); err != nil {
// 		fmt.Println("new excel fail ", err)
// 	}
// }

func addData() {
	f, err := excelize.OpenFile("excel01.xlsx")
	if err != nil {
		fmt.Println("open file fail ", err)
		return
	}
	// res, _ := f.GetCellValue("Sheet1", "B2")
	// fmt.Println(res)
	for i := 1; i <= 10000; i++ {
		f.SetCellValue("Sheet1", fmt.Sprintf("A%d", i), rand.Intn(1000))
	}
	if err = f.Save(); err != nil {
		fmt.Println("save fail ", err)
	}

}
