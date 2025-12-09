import {db} from '../config/db.js';

//Get all items
export const getAllItems=(req,res)=>{
    db.query("SELECT * FROM items",(err,results)=>{
        if(err) return res.status(500).json({error:`Failed to fetch items: ${err}`});
        if(results.length===0) return res.status(400).json({message:"No items found"});
        return res.status(200).json(results);
    });
}

//result=[];
//get item by id
export const getItemById=(req,res)=>{
const {id} = req.params;
db.query("SELECT * FROM items WHERE id=?", [id], (err, results) => {
    if(err) return res.status(500).json({error:`Failed to fetch item: ${err}`});
    if(results.length===0) return res.status(404).json({message:"Item not found"});
    return res.status(200).json(results[0]);
});
}
//create new item
export const createItem=(req,res)=>{
    const {title,description}=req.body;

    //Validate input
    if(!title || !description){
        return res.status(400).json({error:"Title and description are required"});
    }
    const query="INSERT INTO items (title, description) VALUES (?, ?)";
    db.query(query,[title,description],(err,results)=>{
        if(err) return res.status(500).json({error:`Failed to create item: ${err}`});
        return res.status(201).json({message:"Item created successfully", itemId:results.insertId});
    });

} 
//update item
export const updateItem=(req,res)=>{
    const {id}=req.params;
    const {title,description}=req.body;
    db.query("update items SET title=?,description=? where id=?",[title,description,id],(err)=>{
        if(err) return res.status(500).json({error:`Failed to updated due ${err}`});
        return res.status(200).json({message:'item updated successfully'});
    });
}

//delete
export const deleteItem=(req,res)=>{
    const {id}=req.params;
    db.query("DELETE FROM items WHERE id=?", [id], (err) => {
        if(err) return res.status(500).json({error:`Failed to delete item ${err}`});
        return res.status(200).json({message:'Item deleted successfully'});   

    });
}