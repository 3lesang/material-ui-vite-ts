import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import { useRef } from "react";

function AppEditor() {
  const rteRef = useRef<RichTextEditorRef>(null);

  return (
    <RichTextEditor
      ref={rteRef}
      extensions={[StarterKit]}
      content="<p>Hello world</p>"
      renderControls={() => (
        <MenuControlsContainer>
          <MenuSelectHeading />
          <MenuDivider />
          <MenuButtonBold />
          <MenuButtonItalic />
        </MenuControlsContainer>
      )}
    />
  );
}

export default AppEditor;
