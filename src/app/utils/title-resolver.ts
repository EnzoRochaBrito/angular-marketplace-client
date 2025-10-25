import { ResolveFn } from "@angular/router";

export const titleResolverFactory = (title?: string): ResolveFn<string> => {
    return (route) => {
        return route.queryParams[title ? title : 'title']
    }
}