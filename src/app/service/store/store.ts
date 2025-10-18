import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "../../utils/backend-routes/backend.routes";
import { CreateStoreDto, FetchStore } from "../../utils/types/store.dto";

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    constructor(private http: HttpClient) {}

    createStore(dto: CreateStoreDto) {
        return this.http.post<{storeId: string}>(server.api.store.base, dto, { observe: 'response', withCredentials: true })
    }

    fetchStore(storeId: string) {
        return this.http.get<FetchStore>(server.api.store.storeId(storeId), { observe: 'response', withCredentials: true })
    }
}