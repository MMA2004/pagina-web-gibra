import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Layout from "@/components/Layout";

export default function ProductForm ({_id, titel:existingTitel, description:existingDescription, price:existingPrice}) {

    const [titel, setTitle] = useState(existingTitel || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();
    async function saveProduct(ev) {
        ev.preventDefault();
        const data = {titel, description, price};
        if (_id){
            await axios.put('/api/products', {...data,_id});

        }else{
            await axios.post("/api/products", data);
        }
        setGoToProducts(true);


    }
    if (goToProducts) {
        router.push("/products");
    }
    return(
        <form onSubmit={saveProduct}>
            <label>Product name</label>
            <input
                type="text"
                placeholder="product name"
                value={titel}
                onChange={ev => setTitle(ev.target.value)}/>
            <label>Description</label>
            <textarea
                placeholder="description"
                value={description}
                onChange={ev => setDescription(ev.target.value)}/>
            <label>Price</label>
            <input
                type="number"
                placeholder="price"
                value={price}
                onChange={ev => setPrice(ev.target.value)}/>
            <button
                type="submit"
                className="btn-primary">
                Save
            </button>
        </form>
    );
}