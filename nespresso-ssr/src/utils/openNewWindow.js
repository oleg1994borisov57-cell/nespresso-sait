function openNewWindow(url) {
  const newWindow = window.open();

  setTimeout(() => {
    newWindow.location = url;
  }, 10);
}

export default openNewWindow;
