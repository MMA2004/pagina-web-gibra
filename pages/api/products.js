import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handler(request, response) {
    const {method} = request;
    await mongooseConnect()

    if (method === "GET") {
        if(request.query?.id){
            response.json(await Product.findOne({_id:request.query.id}));
        }else{
            response.json(await Product.find());
        }
    }

    if (method === 'POST') {
        const {titel,description,price} = request.body;
        const productDoc = await Product.create({
            titel,description,price,
        })
        response.json(productDoc);
    }

    if (method === "PUT") {
        const {titel,description,price,_id} = request.body;
        await Product.updateOne({_id}, {titel,description,price});
        response.json(true);
    }

    if (method === "DELETE") {
        if(request.query?.id){
            await Product.deleteOne({_id:request.query?.id});
            response.json(true);
        }
    }
}