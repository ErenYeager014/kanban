import Column from './Column.js';
class Kanban {
    constructor(root) {
        this.root = root;
        Kanban.columns().forEach((column) => {
            const columnview = new Column(column.id, column.title);
            this.root.appendChild(columnview.elements.root);
        })
    }
    static columns() {
        return [
            {
                id: 1,
                title: "Not Started"
            },
            {
                id: 2,
                title: "In progress"
            },
            {
                id: 3,
                title: "Completed"
            },
            {
                id: 4,
                title: "On Hold"
            }
        ]
    }
}

export default Kanban;