import {Component} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {CategoriesService} from "../../services/categories.service";
import {BehaviorSubject} from "rxjs";
import {CategoryModel} from "../../../../core/models/category.model";
import {AlertsService} from "../../../../core/services/alerts.service";

@Component({
  selector: 'app-edit-categories-dialog',
  templateUrl: './edit-categories-dialog.component.html',
  styleUrls: ['./edit-categories-dialog.component.scss']
})
export class EditCategoriesDialogComponent {

  newCategory: CategoryModel = {
    title: '',
  };
  categories$: BehaviorSubject<CategoryModel[]> = new BehaviorSubject<CategoryModel[]>([]);

  constructor(
    private alertsService: AlertsService,
    private dialogRef: NbDialogRef<EditCategoriesDialogComponent>,
    private categoriesService: CategoriesService,
  ) { }

  addCategory() {
    if (this.newCategory.title === '') {
      this.alertsService.showAlert('Category must have title', 'danger', false, 2000);
      return;
    }
    if (this.categories$.value.find(category => category.title === this.newCategory.title)) {
      this.alertsService.showAlert('Category with such title already exists', 'danger', false, 2000);
    } else {
      this.categoriesService.addCategory(this.newCategory).subscribe({
        next: (category: CategoryModel) => {
          this.categories$.next([...this.categories$.value, category]);
          this.newCategory.title = '';
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  deleteCategory(id: string | undefined) {
    if (id) {
      this.categoriesService.deleteCategory(id).subscribe({
        next: () => {
          this.categories$.next(this.categories$.value.filter(category => category.id !== id));
        }
      });
    }
  }
}
