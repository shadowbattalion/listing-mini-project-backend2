
import fs from 'fs'
import papaparse from 'papaparse'

export type listType = {
    postId:string,
    id:string,
    name:string,
    email:string
}[]

export function csvParser(filePath:string){


    const csvFile =  fs.readFileSync(filePath, 'utf8');

    const parsedData = papaparse.parse(csvFile, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
    }).data;

    // papaparse type is unknown[], so just use deep copy to create a new list
    const list:listType = JSON.parse(JSON.stringify(parsedData))
    

    return list

}
