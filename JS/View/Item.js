import kanbanAPI from "../apis/Kanban.js";
import Dropzone from "./Dropzone.js";
export default class Item {
    constructor(id, content) {
        const bottomDrpozone = Dropzone.createDropZone()
        this.elements = {}
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban__item-input");
        this.elements.root.dataset.id = id;
        this.elements.root.dataset.content = content;
        this.elements.input.textContent = content;
        this.content = content;
        this.elements.root.appendChild(bottomDrpozone)
        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim();
            if (newContent === this.content) return
            this.content = newContent;
            kanbanAPI.updateItem(id, {
                content: this.content
            }
            )
        }
        const onClick = () => {
            const check = confirm(`Are you sure you want todelete this item`);
            if (check) {
                kanbanAPI.deleteItem(id);
                this.elements.root.removeEventListener('blur', onClick);
                this.elements.root.parentElement.removeChild(this.elements.root);
            }
        }
        this.elements.input.addEventListener("blur", onBlur);
        this.elements.root.addEventListener("dblclick", onClick);
        this.elements.root.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", id);
        })
        this.elements.input.addEventListener("drop", (e) => {
            e.prevetDefault();
        })
    }
    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(`
            <div class="kanban-item" draggable="true">
                <div class="kanban__item-input" contenteditable="true">
                </div>
            </div>
        `).children[0]
    }
}