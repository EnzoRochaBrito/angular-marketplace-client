import { Injectable, signal } from "@angular/core";

/**
 * This service store the user last route which he need to return after
 * proceed.
 * 
 * #### Example:
 * Product Page ID=H3AE (not logged)
 * -> (Add to Cart) _#Error_
 * -> Login page
 * -> (login sucessfully)
 * -> Product Page ID=H3AE (logged)
 */
@Injectable({
    providedIn: 'root'
})
export class ReturnBuffer {
    private returnBuffer = signal<string>('')

    hasPath(): boolean {
        return (this.returnBuffer() !== '') ? true : false;
    }

    setPath(path: string) {
        this.returnBuffer.set(path)
    }

    getPath(): string {
       return this.returnBuffer()
    }

    clearPath() {
        this.returnBuffer.set('')
    }
}