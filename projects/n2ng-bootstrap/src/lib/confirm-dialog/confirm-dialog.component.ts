import { Component, TemplateRef } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

interface ConfirmDialogParam {
  title?: string;
  message: string;
  contentTemplateRef?: TemplateRef<any>;

  onlyOk?: boolean;
}


@Component({
  selector: 'n2ng-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styles: [
  ]
})
export class N2ngConfirmDialogComponent implements ConfirmDialogParam {
  title?: string;
  message!: string;
  contentTemplateRef?: TemplateRef<any>;

  onlyOk: boolean = true;

  constructor(public activeModal: NgbActiveModal) { }

  static openModal(modalService: NgbModal, param: ConfirmDialogParam): NgbModalRef {
    const modalRef= modalService.open(N2ngConfirmDialogComponent);

    let instance = <N2ngConfirmDialogComponent>modalRef.componentInstance
    instance.message = param.message;
    instance.title = param.title;
    instance.contentTemplateRef = param.contentTemplateRef;
    instance.onlyOk = param.onlyOk ?? true;

    return modalRef;
  }
}
