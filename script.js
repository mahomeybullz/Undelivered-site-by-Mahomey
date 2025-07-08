// Dummy message data
let confessions = [
  {
    id: "1",
    recipient: "M",
    message: "ikaw na nga hindi crushable, seloso ka pa. i miss u 😤",
    category: "boyfriend",
    time: "2 hours ago",
    likes: 12,
  },
  {
    id: "2",
    recipient: "N",
    message: "stop being so cute. ang hirap tuloy mag move on kahit wala namang tayo 😭",
    category: "friend",
    time: "5 hours ago",
    likes: 33,
  },
  {
    id: "3",
    recipient: "Nov",
    message: "you’re the reason i failed chem. bakit ka kasi ang pogi sa third row 😩💔",
    category: "crush",
    time: "yesterday",
    likes: 61,
  },
  {
    id: "4",
    recipient: "C",
    message: "miss na kita bestie cousin kong marites. lumandi ka muna tapos chika mo agad sakin 🧍‍♀️",
    category: "cousin",
    time: "2 days ago",
    likes: 5,
  },
];

function renderConfessions(targetId, list = confessions) {
  const container = document.getElementById(targetId);
  container.innerHTML = "";

  list.forEach((msg) => {
    const card = document.createElement("div");
    card.className = "confession-card";
    card.dataset.category = msg.category;

    card.innerHTML = `
      <h3>To ${msg.recipient}</h3>
      <p>${msg.message}</p>
      <div class="meta">
        <span class="category">${msg.category}</span> • 
        <span class="time">${msg.time}</span>
        <span class="like-btn" onclick="likeConfession('${msg.id}')">❤️ ${msg.likes}</span>
        ${targetId === "editorConfessions" ? `<button class="delete-btn" onclick="deleteConfession('${msg.id}')">🗑 Delete</button>` : ""}
      </div>
    `;

    container.appendChild(card);
  });
}

// 💖 Likes
function likeConfession(id) {
  const index = confessions.findIndex((msg) => msg.id === id);
  if (index !== -1) {
    confessions[index].likes++;
    renderAll(); // re-render wall + editor
  }
}

// 🗑 Delete
function deleteConfession(id) {
  confessions = confessions.filter((msg) => msg.id !== id);
  renderAll();
}

// 🔍 Search
function searchMessages() {
  const name = document.getElementById("searchInput").value.trim().toLowerCase();
  const results = confessions.filter((msg) => msg.recipient.toLowerCase().includes(name));
  renderConfessions("searchResults", results);
}

// 📂 Filter by Category
function filterCategory(cat) {
  const list = cat === "all" ? confessions : confessions.filter((msg) => msg.category === cat);
  renderConfessions("confession-wall", list);
}

// ✍️ Form Submission (adds to dummy list)
document.addEventListener("DOMContentLoaded", () => {
  // Wall
  if (document.getElementById("confession-wall")) {
    renderConfessions("confession-wall");
  }

  // Editor
  if (document.getElementById("editorConfessions")) {
    renderConfessions("editorConfessions");
  }

  // Form
  const form = document.getElementById("confessionForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const recipient = form.recipient.value || "Someone";
      const category = form.category.value;
      const message = form.message.value;

      confessions.unshift({
        id: Date.now().toString(),
        recipient,
        category,
        message,
        likes: 0,
        time: "just now",
      });

      form.reset();
      alert("📨 Message sent (fake for now)!");
    });
  }
});

// 📢 Re-render wall + editor after actions
function renderAll() {
  if (document.getElementById("confession-wall")) {
    renderConfessions("confession-wall");
  }
  if (document.getElementById("editorConfessions")) {
    renderConfessions("editorConfessions");
  }
}
