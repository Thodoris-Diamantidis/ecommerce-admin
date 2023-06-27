import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Categories(){
    const [editeCategory,setEditeCategory] = useState(null)
    const [name,setName] = useState('')
    const [parentCategory,setParentCategory] = useState('')
    const [categories,setCategories] = useState([])
    const [properties,setProperties] = useState([])
    useEffect( () => {
        fetchCategories()
    }, [])

    function fetchCategories(){
        axios.get('/api/categories').then(result => {
            setCategories(result.data)
        })
    }

    async function saveCategory(ev){
        ev.preventDefault()
        const data = {name,parentCategory: parentCategory || null}
        if(editeCategory){
            data._id = editeCategory._id
            await axios.put('/api/categories', data)
            setEditeCategory(null)
        }else{
            await axios.post('/api/categories', data)
        }
        setName('')
        setParentCategory('')
        fetchCategories()
    }

    function editCategory(category){
        setEditeCategory(category)
        setName(category.name)
        setParentCategory(category.parent ? category.parent._id : '')
    }

    function alert(category){
        Swal.fire({
            title: 'Warning!',
            text: `Do you want to delete ${category.name}`,
            icon: 'warning',
            showDenyButton: true,
            confirmButtonText: 'Yes,Delete!',
            confirmButtonColor: '#d55',
            denyButtonText: 'Cancel',
            denyButtonColor: '#696762',
            reverseButtons: true,
          }).then( async result => {
            if (result.isConfirmed) {
                const {_id} = category
                await axios.delete('/api/categories?_id='+_id)
                fetchCategories()
                Swal.fire('Category deleted!', '', 'success')
              }
          })
    }

    function addProperty(){
        setProperties(prev => {
            return [...prev, {name:'', value:''}]
        })
    }

    function handlePropertyNameChange(index,property,newName){
        console.log({index,property,newName})
    }

    return  (
        <Layout>
            <h1>Categories</h1>
            <label>{editeCategory ? `Edit category: ${editeCategory.name}` : 'Create new category'}</label>
            <form onSubmit={saveCategory}>
                <div className="flex gap-1">
                    <input 
                    type="text"
                    placeholder="Category name"
                    onChange={ev => setName(ev.target.value)}
                    value={name}/>
                    <select 
                    onChange={ev => setParentCategory(ev.target.value)} 
                    value={parentCategory}>
                        <option value="">No parent category</option>
                        {categories.length > 0 && categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button
                        onClick={addProperty} 
                        type="button" 
                        className= "btn-default text-sm">
                        Add new property
                    </button>
                    {properties.length > 0 && properties.map((property,index) => (
                        <div className="flex gap-1">
                            <input type="text"
                                   value={property.names}
                                   onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
                                   placeholder="Property name (example: Color)"/>
                            <input type="text"
                                   value={property.values}
                                   placeholder="Value...comma separated"/>
                        </div>
                    ))}
                </div>
                <button 
                    type="submit" 
                    className="btn-primary py-1">
                    Save
                </button>
            </form>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Category name</td>
                        <td>Parent category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td>
                                <button 
                                className="btn-primary mr-1" 
                                onClick={() => editCategory(category)}
                                >
                                    Edit
                                </button>
                                <button onClick={() => alert(category)} className="btn-primary">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}