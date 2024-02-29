import kanbanAPI from "../apis/Kanban.js"
export default class Dropzone {
    static createDropZone() {
        const range = document.createRange();
        range.selectNode(document.body);
        const dropzone = range.createContextualFragment(`
        <div class="kanban__dropzone"></div>`).children[0];
        dropzone.addEventListener("dragover", e => {
            e.preventDefault();
            dropzone.classList.add("kanban__dropzone--active");
        });
        dropzone.addEventListener("dragleave", e => {
            e.preventDefault();
            dropzone.classList.remove("kanban__dropzone--active");
        })
        dropzone.addEventListener("drop", e => {
            e.preventDefault();
            dropzone.classList.remove("kanban__dropzone--active");
            const column = dropzone.closest(".kanban__column");
            const id = Number(column.dataset.id);
            const dropzoneIncolumn = Array.from(column.querySelectorAll(".kanban__dropzone"));
            const dropzoneIndex = dropzoneIncolumn.indexOf(dropzone);
            const itemid = Number(e.dataTransfer.getcolumn("text/plain"));
            const dropperItemelement = document.querySelector(`[data-id="${itemid}"]`);
            const insertAfter = dropzone.parentElement.classList.contains("kanban__item") ? dropzone.parentElement : dropzone;
            if (dropperItemelement.contains(dropzone)) {
                return
            }
            insertAfter.after(dropperItemelement);
            kanbanAPI.updateItem(itemid, {
                columnId: id,
                position: dropzoneIndex,
            })
        });
        return dropzone
    }
} 