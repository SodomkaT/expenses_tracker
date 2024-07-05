import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {CategoryModel} from "../../../core/models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient,
  ) { }

  getCategories() {
    return this.http.get<CategoryModel[]>(environment.categoriesUrl);
  }

  addCategory(category: CategoryModel) {
    return this.http.post<CategoryModel>(environment.categoriesUrl, category);
  }

  deleteCategory(categoryId: string) {
    return this.http.delete<CategoryModel>(`${environment.categoriesUrl}/${categoryId}`);
  }
}
