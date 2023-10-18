"use strict";

export function construct(list, container, itemRenderer) {
    const ListRenderer = {
      items: list,
      container: document.querySelector(container),
      itemRenderer: itemRenderer,
      render() {
        this.container.innerHTML = "";
        const filteredList = this.items.filter(item => this.filterValue === "all" || item[this.filterProperty] == this.filterValue);
        for (const item of filteredList) {
          const html = this.itemRenderer.render(item);
          this.container.insertAdjacentHTML("beforeend", html);
        }
      },
      sort(sortBy, sortDir) {
        if (sortDir) {
          this.sortDir = sortDir;
        } else if( sortBy === this.sortBy ) {
          this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
        } else {
          this.sortDir = "asc";
        }
  
        this.sortBy = sortBy;
        
        console.log(`Sorter efter ${this.sortBy} i retning ${this.sortDir}`);
  
        const dir = this.sortDir === "asc" ? 1 : -1;
        this.items.sort((a, b) => a[this.sortBy] > b[this.sortBy] ? dir : -dir);
  
        this.render();
      },
      filter(filterProperty, filterValue) {
        if(filterProperty.includes(":") && filterValue === undefined) {
          [this.filterProperty, this.filterValue] = filterProperty.split(":");
        } else {
          this.filterProperty = filterProperty;
          this.filterValue = filterValue;
        }
  
        console.log(`filter: property: ${this.filterProperty} value: ${this.filterValue}`);
  
        this.render()
      }
    };
  
    return ListRenderer;
  }
