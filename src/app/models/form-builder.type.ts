import { FormControl } from "@angular/forms";

export type BuildForm<T> = {
  [key in keyof T]: FormControl<T[key]>;
}