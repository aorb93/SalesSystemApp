// import { inject } from "@angular/core"
// import { SpinnerService } from "../common/spinner/spinner.services";
// import { finalize } from "rxjs";
// import { HttpInterceptorFn } from "@angular/common/http";

// export const SpinnerInterceptor: HttpInterceptorFn = (req, next) => {
//     const spinnerSvc = inject(SpinnerService);
//     spinnerSvc.show();

//     return next(req).pipe(finalize(() => spinnerSvc.hide()));
// }