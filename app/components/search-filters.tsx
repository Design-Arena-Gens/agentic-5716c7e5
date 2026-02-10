import clsx from "clsx";

type SearchFiltersProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  availableTags: string[];
  activeTags: string[];
  onTagToggle: (tag: string) => void;
  onResetTags: () => void;
};

export default function SearchFilters({
  searchQuery,
  onSearchChange,
  availableTags,
  activeTags,
  onTagToggle,
  onResetTags
}: SearchFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5">
      <div className="flex w-full flex-col gap-3 sm:flex-1">
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 shadow-inner focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          <span className="text-slate-400">🔍</span>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search notes or tags"
            className="w-full border-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {availableTags.map((tag) => {
            const isActive = activeTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => onTagToggle(tag)}
                className={clsx(
                  "rounded-full border px-3 py-1 text-xs font-medium transition",
                  isActive
                    ? "border-primary bg-primary text-white shadow-sm"
                    : "border-slate-200 bg-slate-100 text-slate-600 hover:border-primary/40 hover:text-primary"
                )}
              >
                #{tag}
              </button>
            );
          })}
          {availableTags.length > 0 && activeTags.length > 0 && (
            <button
              type="button"
              onClick={onResetTags}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
            >
              Clear tags
            </button>
          )}
          {availableTags.length === 0 && (
            <span className="text-xs text-slate-400">Add tags to notes to filter them fast.</span>
          )}
        </div>
      </div>
      <div className="hidden h-16 w-px bg-slate-200 sm:block" />
      <div className="flex flex-col gap-1 text-xs text-slate-400 sm:text-right">
        <span className="font-semibold uppercase tracking-wide text-slate-500">Instant Filtering</span>
        <p>Type to search titles, note content, or tags. Tap tags to refine your view.</p>
      </div>
    </div>
  );
}
