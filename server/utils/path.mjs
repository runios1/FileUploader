function getParentPath(childPath) {
  return childPath.substring(0, childPath.lastIndexOf("-"));
}

export { getParentPath };
