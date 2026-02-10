import { useEffect, useMemo, useState } from "react";
import type { Note } from "@/lib/store";
import clsx from "clsx";

type NoteEditorProps = {
  mode: "create" | "edit";
  initialNote?: Note;
  onSave: (payload: { title: string; content: string; tags: string[] }) => void;
  onCancel: () => void;
  existingTags: string[];
};

export default function NoteEditor({ mode, initialNote, onSave, onCancel, existingTags }: NoteEditorProps) {
  const [title, setTitle] = useState(initialNote?.title ?? "");
  const [content, setContent] = useState(initialNote?.content ?? "");
  const [tags, setTags] = useState<string[]>(initialNote?.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    setTitle(initialNote?.title ?? "");
    setContent(initialNote?.content ?? "");
    setTags(initialNote?.tags ?? []);
    setTagInput("");
  }, [initialNote]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = { title, content, tags };
    onSave(payload);
    if (mode === "create") {
      setTitle("");
      setContent("");
      setTags([]);
      setTagInput("");
    }
  };

  const commitTag = () => {
    const value = tagInput.trim().toLowerCase();
    if (!value) return;
    if (!tags.includes(value)) {
      setTags((prev) => [...prev, value]);
    }
    setTagInput("");
  };

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commitTag();
    } else if (event.key === "Backspace" && !tagInput && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const filteredSuggestions = useMemo(
    () => existingTags.filter((tag) => !tags.includes(tag) && tag.includes(tagInput.toLowerCase())).slice(0, 6),
    [existingTags, tags, tagInput]
  );

  const canSave = content.trim().length > 0 || title.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            {mode === "create" ? "Quick Capture" : "Edit Note"}
          </h2>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {mode === "create" ? "New" : "Update"}
          </span>
        </div>
        <p className="text-xs text-slate-500">
          {mode === "create"
            ? "Add a note, sprinkle in tags, and it will sync locally to your device."
            : "Update the details, adjust tags, and save to keep everything tidy."}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Title</span>
          <input
            type="text"
            placeholder="Meeting notes, grocery ideas…"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Details</span>
          <textarea
            placeholder="Capture the details here…"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={6}
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tags</span>
          <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setTags((prev) => prev.filter((item) => item !== tag))}
                className="group flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition hover:bg-primary/20"
              >
                #{tag}
                <span className="text-primary/80 group-hover:text-primary">×</span>
              </button>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(event) => setTagInput(event.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder={tags.length === 0 ? "Press enter to add tags" : "Add another tag"}
              className="flex-1 min-w-[6rem] border-none bg-transparent text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={commitTag}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition hover:bg-primary/20"
            >
              Add
            </button>
          </div>
          {filteredSuggestions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-[11px] uppercase tracking-wide text-slate-400">Suggestions:</span>
              {filteredSuggestions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setTags((prev) => [...prev, tag])}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition hover:border-primary hover:text-primary"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        {mode === "edit" && (
          <button
            type="button"
            onClick={() => {
              onCancel();
              setTitle("");
              setContent("");
              setTags([]);
              setTagInput("");
            }}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={!canSave}
          className={clsx(
            "rounded-xl px-5 py-2 text-sm font-semibold text-white transition",
            canSave ? "bg-primary hover:bg-primary-dark" : "bg-slate-300 cursor-not-allowed"
          )}
        >
          {mode === "create" ? "Save Note" : "Update Note"}
        </button>
      </div>
    </form>
  );
}
