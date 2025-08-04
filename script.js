// Lưu form ứng cử
document.getElementById("avatar")?.addEventListener("change", function () {
  const file = this.files[0];
  const preview = document.getElementById("preview");
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  }
});

document.getElementById("registerForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll("input, select, textarea");
  const data = {
    id: Date.now(),
    name: inputs[0].value,
    class: inputs[1].value,
    position: inputs[2].value,
    joined: inputs[3].value,
    info: inputs[4].value,
    phone: inputs[5].value,
    role: inputs[6].value
  };
  const list = JSON.parse(localStorage.getItem("candidates") || "[]");
  list.push(data);
  localStorage.setItem("candidates", JSON.stringify(list));
  document.getElementById("successMsg").style.display = "block";
  form.reset();
  document.getElementById("preview").style.display = "none";
});

// Hiển thị danh sách trong admin.html
function renderAdminList() {
  const box = document.getElementById("adminList");
  if (!box) return;
  const list = JSON.parse(localStorage.getItem("candidates") || "[]");
  box.innerHTML = "";
  if (list.length === 0) {
    box.innerHTML = "<p>Chưa có ứng viên nào.</p>";
    return;
  }
  list.forEach(item => {
    const div = document.createElement("div");
    div.className = "candidate-item";
    div.innerHTML = `
      <b>${item.name}</b> – Lớp: ${item.class} – Ứng cử: <b>${item.role}</b><br>
      <small>Chức vụ hiện tại: ${item.position || "Không"} | Đoàn: ${item.joined} | SĐT: ${item.phone}</small><br>
      <em>${item.info}</em><br>
      <button onclick="deleteCandidate(${item.id})">❌ Xoá</button>
      <hr>
    `;
    box.appendChild(div);
  });
}

function deleteCandidate(id) {
  const list = JSON.parse(localStorage.getItem("candidates") || "[]");
  const updated = list.filter(c => c.id !== id);
  localStorage.setItem("candidates", JSON.stringify(updated));
  renderAdminList();
}

renderAdminList();
