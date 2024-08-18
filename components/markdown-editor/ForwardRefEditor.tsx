"use client"

import { forwardRef } from "react"
import dynamic from "next/dynamic"
import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor"

const BaseEditor = dynamic(() => import("./BaseEditor"), {
  ssr: false,
  // Modified version of the rendered editor to show a coherent loading state
  loading: () => (
    <div className="mdxeditor _editorRoot_uazmk_53 _editorWrapper_uazmk_154">
      <div
        role="toolbar"
        aria-orientation="horizontal"
        dir="ltr"
        className="mdxeditor-toolbar _toolbarRoot_uazmk_160"
        tabIndex={0}
        data-orientation="horizontal"
        style={{ outline: "none" }}
      >
        <div className="_toolbarGroupOfGroups_uazmk_217">
          <div
            role="group"
            dir="ltr"
            data-orientation="horizontal"
            className="_toolbarToggleSingleGroup_uazmk_222"
          >
            <button
              type="button"
              data-state="off"
              role="radio"
              aria-checked="false"
              className="_toolbarToggleItem_uazmk_206"
              data-toolbar-item="true"
              title="Undo ⌘Z"
              tabIndex={0}
              data-orientation="horizontal"
              data-radix-collection-item=""
              data-disabled=""
              disabled
            >
              <span className="_tooltipTrigger_uazmk_676" data-state="closed">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.202 18.5V17H14.3788C15.4224 17 16.3205 16.6554 17.073 15.9663C17.8257 15.2773 18.202 14.4263 18.202 13.4135C18.202 12.4007 17.8257 11.5512 17.073 10.8652C16.3205 10.1794 15.4224 9.8365 14.3788 9.8365H7.35775L10.1402 12.6193L9.0865 13.673L4.5 9.0865L9.0865 4.5L10.1402 5.55375L7.35775 8.3365H14.3788C15.8416 8.3365 17.0945 8.82467 18.1375 9.801C19.1805 10.7773 19.702 11.9815 19.702 13.4135C19.702 14.8455 19.1805 16.0513 18.1375 17.0308C17.0945 18.0103 15.8416 18.5 14.3788 18.5H7.202Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>
          </div>
          <div
            role="group"
            dir="ltr"
            data-orientation="horizontal"
            className="_toolbarToggleSingleGroup_uazmk_222"
          >
            <button
              type="button"
              data-state="off"
              role="radio"
              aria-checked="false"
              className="_toolbarToggleItem_uazmk_206"
              data-toolbar-item="true"
              title="Redo ⌘Y"
              tabIndex={-1}
              data-orientation="horizontal"
              data-radix-collection-item=""
              data-disabled=""
              disabled
            >
              <span className="_tooltipTrigger_uazmk_676" data-state="closed">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.6211 18.5C8.15827 18.5 6.90535 18.0103 5.86235 17.0308C4.81935 16.0513 4.29785 14.8455 4.29785 13.4135C4.29785 11.9815 4.81935 10.7773 5.86235 9.801C6.90535 8.82467 8.15827 8.3365 9.6211 8.3365H16.6421L13.8596 5.55375L14.9134 4.5L19.4999 9.0865L14.9134 13.673L13.8596 12.6193L16.6421 9.8365H9.6211C8.57744 9.8365 7.67935 10.1794 6.92685 10.8652C6.17418 11.5512 5.79785 12.4007 5.79785 13.4135C5.79785 14.4263 6.17418 15.2773 6.92685 15.9663C7.67935 16.6554 8.57744 17 9.6211 17H16.7979V18.5H9.6211Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
        <div className="_toolbarGroupOfGroups_uazmk_217">
          <div
            role="group"
            dir="ltr"
            data-orientation="horizontal"
            className="_toolbarToggleSingleGroup_uazmk_222"
          >
            <button
              type="button"
              data-state="off"
              role="radio"
              aria-checked="false"
              className="_toolbarToggleItem_uazmk_206"
              data-toolbar-item="true"
              title="Bold"
              tabIndex={-1}
              data-orientation="horizontal"
              data-radix-collection-item=""
              data-disabled=""
              disabled
            >
              <span className="_tooltipTrigger_uazmk_676" data-state="closed">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.33838 18.625V5.375H12.1999C13.219 5.375 14.1405 5.69233 14.9644 6.327C15.788 6.9615 16.1999 7.816 16.1999 8.8905C16.1999 9.63783 16.0194 10.2471 15.6584 10.7182C15.2975 11.1894 14.9088 11.5314 14.4921 11.7442C15.005 11.9211 15.4947 12.2708 15.9614 12.7933C16.428 13.3158 16.6614 14.0193 16.6614 14.9038C16.6614 16.1819 16.1902 17.1217 15.2479 17.723C14.3055 18.3243 13.3562 18.625 12.3999 18.625H7.33838ZM9.48838 16.6328H12.3191C13.1063 16.6328 13.6627 16.4142 13.9884 15.977C14.314 15.5398 14.4769 15.1206 14.4769 14.7192C14.4769 14.3179 14.314 13.8987 13.9884 13.4615C13.6627 13.0243 13.0909 12.8058 12.2729 12.8058H9.48838V16.6328ZM9.48838 10.875H12.0826C12.6903 10.875 13.172 10.7013 13.5279 10.3538C13.8835 10.0064 14.0614 9.59042 14.0614 9.10575C14.0614 8.59042 13.8733 8.16925 13.4971 7.84225C13.1208 7.51542 12.6595 7.352 12.1134 7.352H9.48838V10.875Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>
          </div>
          <div
            role="group"
            dir="ltr"
            data-orientation="horizontal"
            className="_toolbarToggleSingleGroup_uazmk_222"
          >
            <button
              type="button"
              data-state="off"
              role="radio"
              aria-checked="false"
              className="_toolbarToggleItem_uazmk_206"
              data-toolbar-item="true"
              title="Italic"
              tabIndex={-1}
              data-orientation="horizontal"
              data-radix-collection-item=""
              data-disabled=""
              disabled
            >
              <span className="_tooltipTrigger_uazmk_676" data-state="closed">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.39404 18.625V16.8173H9.21129L12.4518 7.18275H8.63454V5.375H17.7883V7.18275H14.2785L11.0383 16.8173H14.5478V18.625H5.39404Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>
          </div>
          <div
            role="group"
            dir="ltr"
            data-orientation="horizontal"
            className="_toolbarToggleSingleGroup_uazmk_222"
          >
            <button
              type="button"
              data-state="off"
              role="radio"
              aria-checked="false"
              className="_toolbarToggleItem_uazmk_206"
              data-toolbar-item="true"
              title="Underline"
              tabIndex={-1}
              data-orientation="horizontal"
              data-radix-collection-item=""
              data-disabled=""
              disabled
            >
              <span className="_tooltipTrigger_uazmk_676" data-state="closed">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.34619 22.125V20.625H18.6537V22.125H5.34619ZM11.9999 18.5287C10.4448 18.5287 9.23102 18.0566 8.35869 17.1125C7.48619 16.1683 7.04994 14.9032 7.04994 13.3172V5.41345H8.90369V13.4095C8.90369 14.4198 9.17228 15.2295 9.70944 15.8385C10.2466 16.4475 11.0101 16.752 11.9999 16.752C12.9898 16.752 13.7533 16.4475 14.2904 15.8385C14.8276 15.2295 15.0962 14.4198 15.0962 13.4095V5.41345H16.9499V13.3172C16.9499 14.9032 16.5137 16.1683 15.6412 17.1125C14.7689 18.0566 13.5551 18.5287 11.9999 18.5287Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="_rootContentEditableWrapper_uazmk_1097 mdxeditor-root-contenteditable">
        <div
          aria-label="editable markdown"
          className="_contentEditable_uazmk_379 prose"
          role="textbox"
          spellCheck
          data-lexical-editor="true"
          style={{
            userSelect: "text",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          <p>Loading editor...</p>
        </div>
        <div className="_contentEditable_uazmk_379 _placeholder_uazmk_1084 prose">
          <p></p>
        </div>
      </div>
    </div>
  ),
})

// This is what is imported by other components. Pre-initialized with plugins, and ready
// to accept other props, including a ref.
export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => <BaseEditor {...props} editorRef={ref} />
)

// TS complains without the following line
ForwardRefEditor.displayName = "ForwardRefEditor"
