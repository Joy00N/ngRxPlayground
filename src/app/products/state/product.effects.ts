import {ProductService} from "../product.service";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as productActions from "../state/product.actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {Product} from "../product";
import {of} from "rxjs";

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productService: ProductService) {

    }

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action: productActions.Load) => this.productService.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadSuccess(products))),
            catchError(err => of(new productActions.LoadFail(err)))
        ))
    );

    @Effect()
    updateProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        map((action: productActions.UpdateProduct) => action.payload),
        mergeMap((product: Product) =>
            this.productService.updateProduct(product).pipe(
                map(updateProduct => (new productActions.UpdateProductSuccess(updateProduct))),
                catchError(err => of(new productActions.UpdateProductFail(err)))
            )
        )
    );
}
