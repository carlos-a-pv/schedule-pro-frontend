import { CommonModule } from '@angular/common';
import { Component, ElementRef, Host, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css'
})
export class OptionsComponent {

  @Input() isOpen = false;
  @Input() position = {x: 0 , y: 0};

  constructor(private elementRef: ElementRef) { }

  closeModal(){
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeModal();
    }
  }
}
