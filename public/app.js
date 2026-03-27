async function loadData() {
  const res = await fetch("/api/data");
  const data = await res.json();

  const output = document.getElementById("output");
  output.innerHTML = "";

  data.forEach(b => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${b.name}</strong><br>${b.location}`;
    output.appendChild(div);
  });
}
