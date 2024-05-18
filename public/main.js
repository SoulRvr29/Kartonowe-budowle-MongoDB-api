const fetchBtn = document.querySelector("#fetchBtn");
const dataDiv = document.querySelector("#dataDiv");

fetchBtn.addEventListener("click", () => {
  fetchData();
});

async function fetchData() {
  try {
    const res = await fetch("http://localhost:8000/modele");
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await res.json();
    console.log(data[0].title);
    dataDiv.innerHTML = JSON.stringify(data);
  } catch (error) {
    console.log("Error fetching posts: ", error);
  }
}
