import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "../../utils/backend-routes/backend.routes";
import { FetchProduct, FetchProductById, ManyProducts } from "../../utils/types/product.dto";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) { }

    fetchManyProducts(take: number, date?: Date, storeId?: string) {
        const params: any = {}
        params.take = take;
        params.date = date ? date.toISOString() : new Date().toISOString();
        if (storeId) params.storeId = storeId

        return this.http.get<{products: ManyProducts}>(server.api.product.base, {
                observe: 'response',
                params
            })
    }

    fetchById(id: string) {
        return this.http.get<{ product: FetchProductById }>(server.api.product.id(id), {
            observe: 'response',
            
        })
    }
}