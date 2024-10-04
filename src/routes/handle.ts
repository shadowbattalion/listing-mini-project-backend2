import { Request, Response } from "express-serve-static-core";
import { csvParser, listType } from '../csvParser'

type QueryInterface = {searchKey:string, page:string, pageSize:string }


let list:listType = [];
let filePath:string | undefined = ""

export function uploadList(request:Request, response:Response){
    //from multer middleware, we can already get the file path and will be saved to a variable
    filePath = request.file?.path
    
    response.json({result:"received"})
}


export function getList(request:Request<{},{}, {}, QueryInterface >, response:Response) {
    
    const page = parseInt(request.query.page);
    const pageSize = parseInt(request.query.pageSize);
    const searchKey = request.query.searchKey;
    
    //will only run csv parser if list is empty and the file path is known.
    //won't run if the list is already there and filePath is empty.
    //file path indicates that the data.csv file is available in /src/csvParser.
    //this gate is in the case where there is no data.csv for the parser to read
    if (list.length==0 && filePath){ 
            list = csvParser(filePath)        
    }


    if(list.length>0){
        //does a search and filter along the way.
        const filteredList = list.filter((item)=>item.email.toLowerCase().includes(searchKey.toLowerCase()))

        //determining the start and end of page so that we can any 25 sets of entries based on the page number given from frontend
        //so page 1 will get the entry from index 0 to index 24 then page 25 will get the entry from index 25 to index 49
        const startPage= (page - 1) * pageSize;
        const endPage = page * pageSize;
        const paginatedList = filteredList.slice(startPage, endPage);
        
        //calculate the total number of pages for the number of pagination buttons to appear in the frontend
        const totalPages = Math.ceil(filteredList.length / pageSize);
        
        response.json({ list: paginatedList, totalPages:totalPages });
    } else {
        response.json({ list: list, totalPages:0 });
    }
  


}




