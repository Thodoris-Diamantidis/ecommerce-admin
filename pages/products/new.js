import Layout from "@/components/Layout";
import { useState } from "react";

export default function NewProduct(){
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')

    function createProcut(){

    }
    return (
        <Layout>
            <form onSubmit={createProcut}>
            <h1>New Product</h1>

            <label>Product name</label>
            <input 
                type="text"
                placeholder="product name" 
                value={title}
                onChange={ev => setTitle(ev.target.value)}/>

            <label>Description</label>
            <textarea
                placeholder="description"
                value={description}
                onChange={ev => setDescription(ev.target.value)}/>

            <label>Price (in EURO)</label>
            <input
                type="number"
                placeholder="price"
                value={price}
                onChange={ev => setPrice(ev.target.value)}/>
            <button 
                type='submit'
                className="btn-primary">
                Save
            </button>
            </form>
        </Layout>
    )
}