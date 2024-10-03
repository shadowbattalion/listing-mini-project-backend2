import { Request, Response } from "express-serve-static-core";
import { csvParser, listType } from '../csvParser'

type QueryInterface = {searchKey:string, page:string, pageSize:string }


let list:listType = [];
let filePath:string | undefined = ""

export function uploadList(request:Request, response:Response){

    filePath = request.file?.path
    
    response.json(request.file)
}


export function getList(request:Request<{},{}, {}, QueryInterface >, response:Response) {
    
    const page = parseInt(request.query.page);
    const pageSize = parseInt(request.query.pageSize);
    const searchKey = request.query.searchKey;
    
    //will only run csv parser if list is empty and the file path is known.
    //won't run if the list is already there and filePath is empty.
    //file path indicates that the data.csv file is available in /uploads.
    //this gate is in the case where there is no data.csv for the parser to read
    if (list.length==0 && filePath){ 
            list = csvParser(filePath)        
    }


    if(list.length>0){
        //does a search along the way.
        const filteredList = list.filter((item)=>item.email.toLowerCase().includes(searchKey.toLowerCase()))

        const startPage= (page - 1) * pageSize;
        const endPage = page * pageSize;
        
        // Slice the products array based on the indexes
        const paginatedList = filteredList.slice(startPage, endPage);
        
        // Calculate the total number of pages
        const totalPages = Math.ceil(filteredList.length / pageSize);
        // Send the paginated products and total pages as the API response
        response.json({ list: paginatedList, totalPages:totalPages });
    } else {
        response.json({ list: list, totalPages:0 });
    }
  


}




