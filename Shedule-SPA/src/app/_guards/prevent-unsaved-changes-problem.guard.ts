import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProblemEditComponent } from '../problems/problem-edit/problem-edit.component';


@Injectable()
export class PreventUnsavedChangesProblem implements CanDeactivate<ProblemEditComponent> {
  canDeactivate(component: ProblemEditComponent) {
    if (component.editForm.dirty) {
    return confirm('Вы уверены, что хотите продолжить? Несохраненныее изменения будут потеряы');
    }
     return true;
  }
}
