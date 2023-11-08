export function setItemWithEvent(key: string, value: string) {
  localStorage.setItem(key, value);
  const event = new StorageEvent('storageChanged', {
    key: key,
    newValue: value,
  });
  window.dispatchEvent(event);
}
