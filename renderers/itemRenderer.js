"use strict";

export function construct(item, container, itemRenderer) {
    const ItemRenderer = {
      item: item,
      container: document.querySelector(container),
      itemRenderer: itemRenderer,
      render() {
        // Sæt HTML listen til at være tom.
        this.container.innerHTML = "";
        // Render hvert item i HTML'en.
          // Få HTML fra itemRendereren
          const html = this.itemRenderer.render(item);
          // Render hvert item i HTML'en.
          this.container.insertAdjacentHTML("beforeend", html);      
      }
    };
  
    return ItemRenderer;
  }