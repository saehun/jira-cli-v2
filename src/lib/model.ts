export interface Issue {
  expand: string;
  id: string;
  self: string;
  key: string; // XXX-3000
  fields: {
    summary: string; // Title
    updated: string; // Date
    created: string; // Date
    status: {
      name: string; // TODO, DONE, INPROGRESS,
      statusCategory: {
        key: string; // new, intermidiate, done
      };
    };
  };
}
