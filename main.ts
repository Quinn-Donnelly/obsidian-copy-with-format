import { Editor, MarkdownView, Plugin } from 'obsidian';

export default class ObsidianClipboard extends Plugin {

    async onload() {
        // This adds an editor command that can perform some operation on the current editor instance
        this.addCommand({
            id: 'copy-with-format',
            name: 'Copy With Format',
            editorCallback: (editor: Editor, _: MarkdownView) => {
                const selectedText = editor.getSelection();
                const filteredText = removeObsidianLinks(selectedText);
                // will call to process the text here
                navigator.clipboard.writeText(filteredText);
            }
        });
    }
}

function removeObsidianLinks(text: string): string {
    // finds all occurrences of either [[ or ]]
    const expression = "(?:\\[\\[)|(?:\\]\\])";
    const mode = "g";
    return text.replace(new RegExp(expression, mode), "");
}
