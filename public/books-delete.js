const deleteButtons = document.querySelectorAll('[data-doc]');
deleteButtons.forEach(btn => {
  btn.addEventListener("click", deleteBook);
});
function deleteBook(e) {
  e.preventDefault();
  const idData = e.target.getAttribute('data-doc');
  const endpoint = `/books/${idData}`;
  
  fetch(endpoint, {
    method: "DELETE"
  })
  .then(result => result.json())
  .then(data => document.location.href = data.redirect)
  .catch(err => console.error(err));
}