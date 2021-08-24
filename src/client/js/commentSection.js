const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteCommentBtn = document.querySelectorAll(".deleteCommentBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.classList = "deleteCommentBtn";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};
const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
    }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const deleteCommentContainer = (parentNode) => {
  parentNode.remove();
};

const deleteComment = async (element) => {
  const { parentNode } = element.target;
  const { id } = parentNode.dataset;

  const response = await fetch(`/api/comments/${id}/delete`, {
    method: "DELETE",
  });
  if (response.status === 200) {
    deleteCommentContainer(parentNode);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

for (let i = 0; i < deleteCommentBtn.length; i++) {
  deleteCommentBtn[i].addEventListener("click", deleteComment);
}
