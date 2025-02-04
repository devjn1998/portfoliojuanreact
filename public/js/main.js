function changeFoto() {
    const image = document.getElementById("imgFoto");

    image.addEventListener("mouseenter", function () {
        image.style.transform = "scale(1.1)";
    });
    image.addEventListener("mouseleave", function () {
        image.style.transform = "scale(1)";
    });

    setTimeout(function () {
        if (image) {
            image.style.transform = "scale(1.1)";
            setTimeout(function () {
                image.style.transform = "scale(1)";
                setTimeout(function () {
                    image.style.transform = "scale(1.1)";
                    setTimeout(function () {
                        image.style.transform = "scale(1)";
                    }, 300);
                }, 300);
            }, 300);
        }
    }, 4500);
}
function changeLogo() {
    const imageLogo = document.getElementById("imgLogo");

    imageLogo.addEventListener("mouseenter", function () {
        imageLogo.style.transform = "scale(1.1)";
    });
    imageLogo.addEventListener("mouseleave", function () {
        imageLogo.style.transform = "scale(1)";
    });
    setTimeout(function () {
        if (imageLogo) {
            imageLogo.style.transform = "scale(1.1)";
            setTimeout(function () {
                imageLogo.style.transform = "scale(1)";
                setTimeout(function () {
                    imageLogo.style.transform = "scale(1.1)";
                    setTimeout(function () {
                        imageLogo.style.transform = "scale(1)";
                    }, 300);
                }, 300);
            }, 300);
        }
    }, 3000);
}

function openProjectModal(projectId) {
    fetch(`/projects/details/${projectId}`)
        .then((response) => response.json())
        .then((project) => {
            document.getElementById("project-modal").style.display = "flex";
            document.getElementById("modal-title").innerText = project.title;
            document.getElementById("modal-description").innerText =
                project.description;
            document.getElementById("modal-gif").src = project.imagegif;
            document.getElementById("modal-link").href = project.urlsite;
            document.getElementById("modal-repo").href = project.urlrepository;
        })
        .catch((error) => {
            alert("Erro ao carregar projeto", error);
            console.log(error);
        });
}

function closeProjectModal() {
    document.getElementById("project-modal").style.display = "none";
}

function deleteProject(id) {
    fetch(`/projects_teste_delete_route/${id}`, {
        method: "DELETE",
        headers: {
            "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')
                .content,
        },
    })
        .then((response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(
                        errorData.message ||
                            `Erro na requisição: ${response.status} ${response.statusText}`
                    );
                });
            }
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                alert("Projeto excluído com sucesso!");
                window.location.href = "/";
            } else {
                alert("Erro ao excluir projeto. Por favor, tente novamente.");
            }
        })
        .catch((error) => {
            alert(`Erro: ${error.message}`);
            console.error(error);
        });
}

document.addEventListener("DOMContentLoaded", function () {
    changeFoto();
    changeLogo();
    AOS.init();

    const message = document.getElementById("message");
    if (message) {
        setTimeout(function () {
            message.classList.add("msg-hidden");
        }, 1500);

        setTimeout(function () {
            message.remove();
        }, 3000);
    }
});
