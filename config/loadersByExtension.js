function extsToRegExp(exts) {
  return new RegExp("\\.(" + exts.map(function (ext) {
      return ext.replace(/\./g, "\\.");
    }).join("|") + ")(\\?.*)?$");
}

module.exports = function loadersByExtension(obj) {
  const loaders = [];
  Object.keys(obj).forEach(function (key) {
    const exts = key.split("|");
    const value = obj[key];
    const entry = {
      extensions: exts,
      test: extsToRegExp(exts)
    };

    if (Array.isArray(value)) {
      entry.loaders = value;
    } else if (typeof value === "string") {
      entry.loader = value;
    } else {
      Object.keys(value).forEach(function (valueKey) {
        entry[valueKey] = value[valueKey];
      });
    }
    loaders.push(entry);
  });
  return loaders;
};
