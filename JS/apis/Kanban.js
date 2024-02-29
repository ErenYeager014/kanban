class kanbanAPI {
    static getItem(columnId) {
        const column = Read().find(item => item.id === columnId);

        if (!column) return [];
        return column.items;
    }
    static insertItem(columnId, content) {
        const data = Read();
        const column = data.find(item => item.id === columnId)
        const new_item = {
            id: Math.floor(Math.random() * 1000), content
        }
        if (!column) throw new Error("Column doesn't exists")
        column.items.push(new_item)
        Save(data)
        return new_item
    }
    static deleteItem(id) {
        const read = Read();
        for (const column of read) {
            const item = column.items.find(item => item.id == id);
            if (item) {
                column.items.splice(column.items.indexOf(item), 1);
            }
        }
        Save(read)
    }
    static updateItem(id, content) {
        const data = Read();
        const [item, column] = (() => {
            for (const column of data) {
                const item = column.items.find(item => item.id === id);
                if (item) {
                    return [item, column]
                }
            }
        })()
        item.content = content.content === undefined ? item.content : content.content;
        if (content.columnId !== undefined && content.position !== undefined) {
            column.items.splice(column.items.indexOf(item), 1);
            const target = column.find(item => item.id === content.id);
            if (target) {
                target.items.splice(content.position, 0, item);
            }
        }
        Save(data)
    }
}
function Read() {
    const data = localStorage.getItem("kanban-data")
    if (!data) return [
        {
            id: 1,
            items: []
        },
        {
            id: 2,
            items: []
        },
        {
            id: 3,
            items: []
        },
        {
            id: 4,
            items: []
        }
    ];
    return JSON.parse(data)
}
function Save(data) {
    localStorage.setItem("kanban-data", JSON.stringify(data));
}
export default kanbanAPI