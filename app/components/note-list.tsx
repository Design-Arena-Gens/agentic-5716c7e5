import { formatDistanceToNow } from "date-fns";
import clsx from "clsx";
import type { Note } from "@/lib/store";

type NoteListProps = {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
};

const formatTimestamp = (timestamp: string) =>
  formatDistanceToNow(new Date(timestamp), {
    addSuffix: true
  });

export default function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4">
      {notes.map((note) => (
        <article
          key={note.id}
          className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-lg sm:p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-slate-900">{note.title}</h3>
              <span className="text-xs text-slate-400">{formatTimestamp(note.updatedAt)}</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(note)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 transition hover:border-primary hover:text-primary"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(note.id)}
                className="rounded-full border border-rose-200 px-3 py-1 text-xs font-medium text-rose-500 transition hover:border-rose-400 hover:text-rose-600"
              >
                Delete
              </button>
            </div>
          </div>

          <p
            className="mt-3 whitespace-pre-wrap text-sm text-slate-600"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {note.content}
          </p>

          {note.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className={clsx(
                    "rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary",
                    "shadow-sm"
                  )}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
