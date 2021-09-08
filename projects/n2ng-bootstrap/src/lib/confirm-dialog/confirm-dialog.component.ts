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
    modalRef.componentInstance.message = param.message;
    modalRef.componentInstance.title = param.title;
    modalRef.componentInstance.contentTemplateRef = param.contentTemplateRef;
    if (param.onlyOk) {
      modalRef.componentInstance.onlyOk = param.onlyOk;
    }
    return modalRef;
  }
}
