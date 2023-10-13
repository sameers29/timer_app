import { Component } from '@angular/core';

@Component({
  selector: 'app-movable-popup',
  templateUrl: './movable-popup.component.html',
  styleUrls: ['./movable-popup.component.scss'],
})
export class MovablePopupComponent {
  movablePopup!: Window | null;

  openMovablePopup() {
    const url = 'http://opensource.techcedence.net/timer_app/'; // Replace with the URL of your web application
    const width = 500;
    const height = 400;

    // Open the movable popup
    this.movablePopup = window.open(
      url,
      '_blank',
      `width=${width},height=${height}`
    );

    // Add a listener to the popup window's onload event
    this.movablePopup?.addEventListener('load', () => {
      this.makePopupMovable(this.movablePopup!);
    });
  }

  // makePopupMovable(popupWindow: Window) {
  //   let isDragging = false;
  //   let offsetX: number;
  //   let offsetY: number;

  //   // Create a handle element for dragging
  //   const handle = popupWindow.document.createElement('div');
  //   handle.style.width = '100%';
  //   handle.style.height = '30px';
  //   handle.style.background = '#ccc';
  //   handle.style.cursor = 'move';
  //   handle.style.position = 'fixed';
  //   handle.style.top = '0';
  //   handle.style.left = '0';
  //   popupWindow.document.body.appendChild(handle);

  //   handle.addEventListener('mousedown', (e) => {
  //     isDragging = true;
  //     offsetX = e.clientX - popupWindow.screenX;
  //     offsetY = e.clientY - popupWindow.screenY;
  //   });

  //   popupWindow.document.addEventListener('mouseup', () => {
  //     isDragging = false;
  //   });

  //   popupWindow.document.addEventListener('mousemove', (e) => {
  //     if (!isDragging) return;

  //     popupWindow.moveTo(e.clientX - offsetX, e.clientY - offsetY);
  //   });
  // }
  makePopupMovable(popupWindow: Window) {
    let isDragging = false;
    let offsetX: number;
    let offsetY: number;

    // Create a handle element for dragging
    const handle = popupWindow.document.createElement('div');
    handle.style.width = '100%';
    handle.style.height = '30px';
    handle.style.background = '#ccc';
    handle.style.cursor = 'move';
    handle.style.position = 'fixed';
    handle.style.top = '0';
    handle.style.left = '0';
    popupWindow.document.body.appendChild(handle);

    handle.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - popupWindow.screenX;
      offsetY = e.clientY - popupWindow.screenY;
    });

    // Prevent the default behavior of closing when clicking outside
    popupWindow.document.body.addEventListener('mousedown', (e) => {
      e.preventDefault();
    });

    popupWindow.document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    popupWindow.document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      popupWindow.moveTo(e.clientX - offsetX, e.clientY - offsetY);
    });
  }
}
