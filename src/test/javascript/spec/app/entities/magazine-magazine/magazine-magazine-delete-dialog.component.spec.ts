import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PixelmagsTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { MagazineMagazineDeleteDialogComponent } from 'app/entities/magazine-magazine/magazine-magazine-delete-dialog.component';
import { MagazineMagazineService } from 'app/entities/magazine-magazine/magazine-magazine.service';

describe('Component Tests', () => {
  describe('MagazineMagazine Management Delete Component', () => {
    let comp: MagazineMagazineDeleteDialogComponent;
    let fixture: ComponentFixture<MagazineMagazineDeleteDialogComponent>;
    let service: MagazineMagazineService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PixelmagsTestModule],
        declarations: [MagazineMagazineDeleteDialogComponent],
      })
        .overrideTemplate(MagazineMagazineDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MagazineMagazineDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MagazineMagazineService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
