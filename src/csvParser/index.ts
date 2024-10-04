
import fs from 'fs'
import papaparse from 'papaparse'

export type listType = {
    postId:string,
    id:string,
    name:string,
    email:string
}[]

// this function will:
//  1) read the file from the given path
//  2) using papaparse to parse the file
//  3) due to unmatching types, a solution was found but doing a deep copy
//  4) end result is csv to array conversion
export function csvParser(filePath:string){

    //  read the file from the given path
    const csvFile =  fs.readFileSync(filePath, 'utf8');
    
    //  using papaparse to parse the file
    const parsedData = papaparse.parse(csvFile, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
    }).data;

    // papaparse type is unknown[], so just use deep copy to create a new list
    const list:listType = JSON.parse(JSON.stringify(parsedData))
    

    return list

}
