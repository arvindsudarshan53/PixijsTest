export class UIController {
    constructor(sliderElement, labelElement, dropdownElement, onSliderChange, onDropdownChange) {
      this.slider = sliderElement;
      this.label = labelElement;
      this.dropdown = dropdownElement; // Ensure this refers to the correct DOM element
  
      this.slider.value = this.slider.max;
      this.label.textContent = this.slider.value;
  
      this.slider.addEventListener('input', () => {
        const count = parseInt(this.slider.value);
        this.label.textContent = count;
        onSliderChange(count);
      });
  
      this.dropdown.addEventListener('change', () => {
        const selectedCategory = parseInt(this.dropdown.value);
        onDropdownChange(selectedCategory); // Call onDropdownChange with the selected category
      });
    }
  }
  