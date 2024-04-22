const ESCAPE_MAP = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;",
  "&": "&amp;"
};

const escapeHTML = (html) => {
  return html.replace(/[<>"&]/g, (c) => ESCAPE_MAP[c] || c);
};

let id_count = 0;

const getID = (prefix) => {
  return prefix + id_count++;
};

export default {
  escapeHTML,
  getID
};
