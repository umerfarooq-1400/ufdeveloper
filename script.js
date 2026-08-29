const $ = (selector, parent = document) =>
  parent.querySelector(selector);

const $$ = (selector, parent = document) =>
  [...parent.querySelectorAll(selector)];

/* Contact details */
const contactConfig = {
  phone: "+923402320338",
  displayPhone: "+92 340 2320338",
  email: "umerfarooq3573@gmail.com"
};

/* Email links */
$$('a[href^="mailto:"]').forEach((link) => {
  link.href = `mailto:${contactConfig.email}`;
  link.textContent = `✉  ${contactConfig.email}`;
});

/* WhatsApp links */
$$('a[href*="wa.me"]').forEach((link) => {
  link.href =
    `https://wa.me/${contactConfig.phone}` +
    `?text=Hi%20UF%20Developer%2C%20I%20am%20interested%20in%20getting%20a%20website%20for%20my%20business.`;
});

/* Loader */
window.addEventListener("load", () => {
  const loader = $(".loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("done");
    }, 650);
  }
});

/* Header scroll effect */
const header = $(".site-header");

window.addEventListener(
  "scroll",
  () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }
  },
  { passive: true }
);

/* Mobile menu */
const menuToggle = $(".menu-toggle");

if (menuToggle && header) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });
}

$$("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (header) {
      header.classList.remove("menu-open");
    }
  });
});

/* Theme toggle */
const themeToggle = $(".theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    themeToggle.textContent = document.body.classList.contains("light")
      ? "☾"
      : "☼";
  });
}

/* Scroll reveal animations */
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  $$(".reveal").forEach((element) => observer.observe(element));
} else {
  $$(".reveal").forEach((element) => {
    element.classList.add("visible");
  });
}

/* Portfolio filters */
$$(".filters button").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".filters button").forEach((item) =>
      item.classList.remove("active")
    );

    button.classList.add("active");

    const filter = button.dataset.filter;

    $$(".project").forEach((project) => {
      const categories = project.dataset.category || "";
      const shouldHide =
        filter !== "all" && !categories.includes(filter);

      project.classList.toggle("hidden", shouldHide);
    });
  });
});

/* Case study modal */
const modal = $("#case-study");

const projectCategories = {
  "Bake House Karachi": "Bakery / Food",
  "EstateX Pakistan": "Real Estate",
  "Café 92": "Restaurant",
  FitCore: "Fitness / Business",
  AURA: "Fashion / E-commerce",
  "Personal Brand": "Creator / Professional"
};

$$(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    if (!modal) return;

    const projectName = button.dataset.project;
    const title = $("h2", modal);
    const category = $(".modal-category", modal);

    if (title) title.textContent = projectName;
    if (category) {
      category.textContent =
        projectCategories[projectName] || "Concept Project";
    }

    if (typeof modal.showModal === "function") {
      modal.showModal();
    }
  });
});

const modalClose = $(".modal-close");

if (modal && modalClose) {
  modalClose.addEventListener("click", () => modal.close());

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
}

/* Before / after comparison slider */
const comparison = $("#comparison");
const oldVersion = $(".comparison-old");
const comparisonHandle = $(".compare-handle");

if (comparison && oldVersion && comparisonHandle) {
  const setComparison = (clientX) => {
    const rect = comparison.getBoundingClientRect();

    const percentage = Math.max(
      5,
      Math.min(95, ((clientX - rect.left) / rect.width) * 100)
    );

    oldVersion.style.width = `${percentage}%`;
    comparisonHandle.style.left = `${percentage}%`;
    comparisonHandle.setAttribute(
      "aria-valuenow",
      Math.round(percentage)
    );
  };

  let dragging = false;

  comparisonHandle.addEventListener("pointerdown", (event) => {
    dragging = true;
    comparisonHandle.setPointerCapture(event.pointerId);
  });

  comparison.addEventListener("pointermove", (event) => {
    if (dragging) {
      setComparison(event.clientX);
    }
  });

  window.addEventListener("pointerup", () => {
    dragging = false;
  });

  comparisonHandle.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();

    const rect = comparison.getBoundingClientRect();
    const currentValue =
      Number(comparisonHandle.getAttribute("aria-valuenow")) || 48;

    const change = event.key === "ArrowLeft" ? -5 : 5;
    const nextValue = Math.max(5, Math.min(95, currentValue + change));

    setComparison(rect.left + rect.width * (nextValue / 100));
  });
}

/* Project form */
const projectForm = $("#project-form");

if (projectForm) {
  projectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = $(".form-message");

    if (message) {
      message.textContent =
        "Thanks! Your project request has been received. UF Developer will get back to you soon.";
    }

    projectForm.reset();
  });
}
