import { Directive, ElementRef, HostListener, Injectable, Input } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
/**
 * Service to redirect to an uri. Prevents Angular's component reutilization
 */
export class RedirectToUri {
    constructor(private router: Router) { }
    
    redirectTo(uri: string) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([uri])});
      }
}

@Directive({
    selector: '[redirectToUri]'
})
/**
 * Directive to redirect to an uri. Prevents Angular's component reutilization
 */
export class RedirectToUriDirective {
    @Input() redirectToUri!: string
    @Input() queryParams!: {[name: string]: string}
    constructor(private el: ElementRef, private router: Router) {
    }

    @HostListener('click')
    redirectTo() {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.redirectToUri], {queryParams: this.queryParams})});
    }
}