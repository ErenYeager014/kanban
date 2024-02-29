import kanbanAPI from "../apis/Kanban.js";
export default class Item {
    constructor(id, content) {
        this.elements = {}
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban__item-input");
        this.elements.root.dataset.id = id;
        this.elements.root.dataset.content = content;
        this.elements.input.textContent = content;
        this.content = content;

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