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
      extensions={[StarterKit]} // Or any Tiptap extensions you wish!
      content="<p>Hello world</p>" // Initial content for the editor
      // Optionally include `renderControls` for a menu-bar atop the editor:
      renderControls={() => (
        <MenuControlsContainer>
          <MenuSelectHeading />
          <MenuDivider />
          <MenuButtonBold />
          <MenuButtonItalic />
          {/* Add more controls of your choosing here */}
        </MenuControlsContainer>
      )}
    />
  );
}

export default AppEditor;
