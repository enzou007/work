function Paging(docs, page, count) {
  var result = {};

  page = page - 1;

  var len = docs.length;
  if (page > 0) {
    page = page * count;
    count = page + count;
  }

  if (count > len) {
    count = len;
  }

  result.json = docs.slice(page, count);
  result.header = {
    total: len
  }
  return result;
}

module.exports = Paging;
