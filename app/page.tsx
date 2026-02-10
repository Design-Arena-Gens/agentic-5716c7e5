"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { useNotesStore, type Note } from "@/lib/store";
import NoteEditor from "./components/note-editor";
import NoteList from "./components/note-list";
import SearchFilters from "./components/search-filters";

export default function HomePage() {
  const notes = useNotesStore((state) => state.notes);
  const createNote = useNotesStore((state) => state.createNote);
  const updateNote = useNotesStore((state) => state.updateNote);
  const deleteNote = useNotesStore((state) => state.deleteNote);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    notes.forEach((note) => note.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return notes.filter((note) => {
      const matchesQuery =
        !query ||
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        note.tags.some((tag) => tag.includes(query));
      const matchesTags = activeTags.length === 0 || activeTags.every((tag) => note.tags.includes(tag));
      return matchesQuery && matchesTags;
    });
  }, [notes, searchQuery, activeTags]);

  const handleSave = (payload: { title: string; content: string; tags: string[] }) => {
    if (editingNote) {
      updateNote(editingNote.id, payload);
      setEditingNote(null);
    } else {
      createNote(payload);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };

  const handleDelete = (id: string) => {
    deleteNote(id);
    if (editingNote?.id === id) {
      setEditingNote(null);
    }
  };

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]));
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-6 pb-24 sm:px-6">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">PocketNotes</h1>
        <p className="text-sm text-slate-500">
          Capture ideas instantly, organize with tags, and find anything with lightning-fast search.
        </p>
      </header>

      <section
        className={clsx(
          "rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition shadow-primary/0",
          "sm:p-6"
        )}
      >
        <NoteEditor
          key={editingNote?.id ?? "new-note"}
          mode={editingNote ? "edit" : "create"}
          initialNote={editingNote ?? undefined}
          onCancel={() => setEditingNote(null)}
          onSave={handleSave}
          existingTags={allTags}
        />
      </section>

      <section className="flex flex-col gap-4">
        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          availableTags={allTags}
          activeTags={activeTags}
          onTagToggle={toggleTag}
          onResetTags={() => setActiveTags([])}
        />
        <NoteList notes={filteredNotes} onEdit={handleEdit} onDelete={handleDelete} />
        {filteredNotes.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-center text-sm text-slate-500">
            {notes.length === 0
              ? "You have no notes yet. Create your first one above!"
              : "No notes match your search filters. Try adjusting your search or tags."}
          </div>
        )}
      </section>
    </main>
  );
}
