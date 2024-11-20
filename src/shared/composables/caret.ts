import type { Ref } from 'vue';

export function useCaret (elementRef: Ref<HTMLElement | null>) {
  function getPosition () {
    if (!elementRef.value) {
      return 0;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount <= 0) {
      return 0;
    }

    const range = selection.getRangeAt(0);
    const rangeClone = range.cloneRange();

    rangeClone.selectNodeContents(elementRef.value);
    rangeClone.setEnd(range.endContainer, range.endOffset);

    return rangeClone.toString().length;
  }

  function setPosition (offset: number) {
    if (!elementRef.value) {
      return;
    }

    let currentPos = 0;
    let targetNode: Node | null = null;
    let targetOffset = 0;

    function traverseNodes (node: Node): boolean {
      if (node.nodeType === Node.TEXT_NODE) {
        const textNode = node as Text;

        if (currentPos + textNode.length >= offset) {
          targetNode = textNode;
          targetOffset = offset - currentPos;

          return true;
        }

        currentPos += textNode.length;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const elementNode = node as HTMLElement;

        for (let i = 0; i < elementNode.childNodes.length; i++) {
          if (traverseNodes(elementNode.childNodes[i])) {
            return true;
          }
        }
      }

      return false;
    }

    traverseNodes(elementRef.value);
    if (!targetNode) {
      return;
    }

    const range = document.createRange();
    const selection = window.getSelection();
    if (!selection) {
      return;
    }

    range.setStart(targetNode, targetOffset);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  return {
    getPosition,
    setPosition,
  };
}
