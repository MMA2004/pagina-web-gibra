import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export default function ProductForm ({
_id,
titel:existingTitel,
description:existingDescription,
price:existingPrice,
images:existingImages,
})
{

    const [titel, setTitle] = useState(existingTitel || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [images, setImages] = useState(existingImages || []);
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
    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append("file", file);
            }
            const res = await axios.post("/api/upload", data);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            })
        }
    }
    return(
        <form onSubmit={saveProduct}>
            <label>Product name</label>
            <input
                type="text"
                placeholder="product name"
                value={titel}
                onChange={ev => setTitle(ev.target.value)}/>
            <label>
                Photos
            </label>
            <div className="mb-2">
                {!!images?.length && images.map(link => (
                    <div key={link}>
                        {link}
                    </div>
                ))}
                <label className="w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-600 rounded-lg bg-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
                    </svg>
                    <div>Upload</div>
                    <input type="file" onChange={uploadImages} className="hidden"/>
                </label>
                {!images?.length && (
                    <div>No photos in this product</div>
                )}
            </div>
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