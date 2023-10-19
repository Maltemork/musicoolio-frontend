"use strict";

export function construct(list, container, itemRenderer) {
    const ListRenderer = {
      items: list,
      container: document.querySelector(container),
      itemRenderer: itemRenderer,
      render() {
        // Sæt HTML listen til at være tom.
        this.container.innerHTML = "";
        // Tjek for filtre
        const filteredList = this.items.filter(item => this.filterValue === "all" || item[this.filterProperty] == this.filterValue);
        // Render hvert item i HTML'en.
        for (const item of filteredList) {
          // Få HTML fra itemRendereren
          const html = this.itemRenderer.render(item);
          // Render hvert item i HTML'en.
          this.container.insertAdjacentHTML("beforeend", html);
        }
      },
      sort(sortBy, sortDir) {
        // Skift retning hver gang man klikker.
        if (sortDir) {
          this.sortDir = sortDir;
        } else if( sortBy === this.sortBy ) {
          this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
        } else {
          this.sortDir = "asc";
        }
  
        // Sæt value for sortBy
        this.sortBy = sortBy;
        console.log(`Sorter efter ${this.sortBy} i retning ${this.sortDir}`);
  
        // Template for hvordan den skal sortere ud fra "asc"
        const dir = this.sortDir === "asc" ? 1 : -1;
        
        // Sorter listen ud fra hvilken parameter der sorteres på.
          // Hvis duration, fjern ":", lav til number og se hvilken er større.
        if (sortBy === "duration") {
          this.items.sort((a, b) => Number(a[this.sortBy].replace(":", "")) > Number(b[this.sortBy].replace(":", ""))  ? dir : -dir);
          // Hvis number, lav en basal sammenligning.
        } else if (sortBy === "number") {
          this.items.sort((a, b) => a[this.sortBy] > b[this.sortBy] ? dir : -dir);
        }
          // Hvis det ikke er number eller duration, men stadig er en string, lav om til små bogstaver og sammenlign.
        else if (typeof this.sortBy[0] === "string") {
          this.items.sort((a, b) => a[this.sortBy].toLowerCase() > b[this.sortBy].toLowerCase()  ? dir : -dir);
          // Ellers bare lav en normal sammenligning
          } else {
            this.items.sort((a, b) => a[this.sortBy] > b[this.sortBy]  ? dir : -dir);
          }
        
        // Render listen.
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
