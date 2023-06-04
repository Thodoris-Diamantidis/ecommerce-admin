import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewProduct(){
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [goToProduct,setGoToProduct] = useState(false)
    const router = useRouter()

    async function createProduct(ev){
        ev.preventDefault();
        const data = {title,description,price}
        await axios.post('/api/products', data)
        setGoToProduct(true)
    }

    if(goToProduct){
        router.push('/products')
    }

    return (
        <Layout>
            <form onSubmit={createProduct}>
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