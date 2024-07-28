export const TASK_STATUS = {
  todo: "todo",
  in_progress: "in-progress",
  in_review: "in-review",
  completed: "completed",
};

export const GRID_COLUMNS_LIST = [
  "Todo",
  "In-Progress",
  "Under Review",
  "Finished",
];

export const GRID_LABEL_EMOJIS = {
  todo: "📌",
  "in-progress": "🚧",
  "in-review": "🔎",
  completed: "✅",
};

export const GRID_LABELS = [
  {
    label: GRID_COLUMNS_LIST[0],
    emoji: GRID_LABEL_EMOJIS.todo,
    ident: "todo",
  },
  {
    label: GRID_COLUMNS_LIST[1],
    emoji: GRID_LABEL_EMOJIS["in-progress"],
    ident: "in_progress",
  },
  {
    label: GRID_COLUMNS_LIST[2],
    emoji: GRID_LABEL_EMOJIS["in-review"],
    ident: "in_review",
  },
  {
    label: GRID_COLUMNS_LIST[3],
    emoji: GRID_LABEL_EMOJIS.completed,
    ident: "completed",
  },
];

export const ITEM_TYPE = {
  TASK: "task",
  COLUMN: "column",
};
