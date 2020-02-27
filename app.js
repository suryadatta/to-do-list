const todoList = document.querySelector('#to-do-list');
const form = document.querySelector('#add-task');

// create element & render cafe
function renderList(doc) {
  let li = document.createElement('li');
  let task = document.createElement('span');
  // let city = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  task.textContent = doc.data().task;
  //city.textContent = doc.data().city;
  cross.textContent = 'x';

  li.appendChild(task);
  //li.appendChild(city);
  li.appendChild(cross);

  todoList.appendChild(li);

  // deleting data
  cross.addEventListener('click', e => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('list')
      .doc(id)
      .delete();
  });
}

//getting data
// db.collection('list')
//   .orderBy('task')
//   .get()
//   .then(snapshot => {
//     snapshot.docs.forEach(doc => {
//       renderList(doc);
//     });
//   });

// saving data
form.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('list').add({
    task: form.task.value
    // city: form.city.value
  });
  form.task.value = '';
  //form.city.value = "";
});

// real-time listener
db.collection('list')
  .orderBy('task')
  .onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
      console.log(change.doc.data());
      if (change.type == 'added') {
        renderList(change.doc);
      } else if (change.type == 'removed') {
        let li = todoList.querySelector('[data-id=' + change.doc.id + ']');
        todoList.removeChild(li);
      }
    });
  });

// updating records (console demo)
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     task: 'mario world'
// });

// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').update({
//     city: 'hong kong'
// });

// setting data
// db.collection('cafes').doc('DOgwUvtEQbjZohQNIeMr').set({
//     city: 'hong kong'
// });
