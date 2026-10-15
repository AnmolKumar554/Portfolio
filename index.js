const portfolioLinks = {
  email: "anmol52112518@gmail.com",
  linkedin: "https://www.linkedin.com/in/anmol-kumar-010032434",
  github: "https://github.com/AnmolKumar554",

  projects: {
    hotel: {
      demo: "https://hotel-website-six-chi.vercel.app/",
      source: "https://github.com/AnmolKumar554/Hotel-Website"
    },

    restaurant: {
      demo: "https://e-commerce-website-rouge-sigma.vercel.app/",
      source: "https://github.com/AnmolKumar554/E-commerce-website--"
    }
  }
};


const projectData = {
  hotel: {
    number: "PROJECT / 01",
    title: "Hotel booking interface",

    description:
      "A frontend hotel discovery flow built around finding a destination, comparing stays, reviewing property details, and moving through a booking journey. The emphasis is on making the search experience clear across screen sizes.",

    features: [
      "Destination and stay-date search",
      "Property cards and hotel detail views",
      "A clear path from discovery to booking",
      "Responsive layouts for smaller screens"
    ],

    tags: [
      "React",
      "JavaScript",
      "CSS",
      "Responsive UI"
    ]
  },

  restaurant: {
    number: "PROJECT / 02",
    title: "Restaurant discovery UI",

    description:
      "A search-led food interface designed to make browsing easier. It brings together restaurant discovery, category filtering, menu presentation, and the core UI patterns needed for a cart flow.",

    features: [
      "Search and category browsing",
      "Menu cards and product information",
      "Cart-oriented interface states",
      "Reusable UI patterns and responsive styling"
    ],

    tags: [
      "React",
      "JavaScript",
      "CSS",
      "UI state"
    ]
  }
};

const header = document.getElementById("header");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

const projectDialog = document.getElementById("projectDialog");
const dialogClose = document.getElementById("dialogClose");

function setMenu(open) {
  if (!navLinks || !navToggle) return;

  navLinks.classList.toggle("open", open);
  navToggle.classList.toggle("open", open);

  navToggle.setAttribute("aria-expanded", String(open));

  navToggle.setAttribute(
    "aria-label",
    open ? "Close navigation menu" : "Open navigation menu"
  );
}

navToggle?.addEventListener("click", () => {
  setMenu(!navLinks.classList.contains("open"));
});

links.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
  }
});

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 12);
}

window.addEventListener("scroll", updateHeader, {
  passive: true
});

updateHeader();

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    {
      rootMargin: "-42% 0px -48% 0px"
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element, index) => {
    /* Small stagger for items appearing together */
    element.style.setProperty(
      "--reveal-delay",
      `${(index % 3) * 75}ms`
    );

    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


const contactEmailButton = document.getElementById("contactEmailButton");
const contactEmailText = document.getElementById("contactEmailText");
const linkedinLink = document.getElementById("linkedinLink");
const githubLink = document.getElementById("githubLink");

if (contactEmailButton && portfolioLinks.email) {
  contactEmailButton.href = `mailto:${portfolioLinks.email}`;
}

if (contactEmailText && portfolioLinks.email) {
  contactEmailText.href = `mailto:${portfolioLinks.email}`;
  contactEmailText.textContent = portfolioLinks.email;
}

if (linkedinLink && portfolioLinks.linkedin) {
  linkedinLink.href = portfolioLinks.linkedin;
}

if (githubLink && portfolioLinks.github) {
  githubLink.href = portfolioLinks.github;
}


function addListItems(list, items) {
  if (!list) return;

  list.replaceChildren();

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}


function setOptionalLink(anchor, url) {
  if (!anchor) return false;

  const hasUrl =
    typeof url === "string" &&
    /^https?:\/\//i.test(url.trim());

  anchor.hidden = !hasUrl;

  if (hasUrl) {
    anchor.href = url.trim();
  } else {
    anchor.removeAttribute("href");
  }

  return hasUrl;
}


function openProject(projectId) {
  const project = projectData[projectId];

  if (!project || !projectDialog) return;

  document.getElementById("dialogNumber").textContent =
    project.number;

  document.getElementById("dialogTitle").textContent =
    project.title;

  document.getElementById("dialogDescription").textContent =
    project.description;

  addListItems(
    document.getElementById("dialogFeatures"),
    project.features
  );

  addListItems(
    document.getElementById("dialogTags"),
    project.tags
  );

  const urls = portfolioLinks.projects?.[projectId] ?? {};

  const hasDemo = setOptionalLink(
    document.getElementById("dialogDemo"),
    urls.demo
  );

  const hasSource = setOptionalLink(
    document.getElementById("dialogSource"),
    urls.source
  );

  const linkNote = document.getElementById("dialogLinkNote");

  linkNote.hidden = hasDemo && hasSource;

  if (!hasDemo && !hasSource) {
    linkNote.textContent =
      "Add this project's live demo and repository URLs in index.js before publishing.";
  } else if (!hasDemo) {
    linkNote.textContent =
      "Add the live demo URL in index.js when it is ready.";
  } else if (!hasSource) {
    linkNote.textContent =
      "Add the repository URL in index.js when it is ready.";
  }

  if (typeof projectDialog.showModal === "function") {
    projectDialog.showModal();
  } else {
    projectDialog.setAttribute("open", "");
  }

  document.body.classList.add("dialog-open");
  dialogClose?.focus();
}


document.querySelectorAll("[data-project]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openProject(trigger.dataset.project);
  });
});


dialogClose?.addEventListener("click", () => {
  projectDialog?.close();
});


projectDialog?.addEventListener("click", (event) => {
  if (event.target === projectDialog) {
    projectDialog.close();
  }
});


projectDialog?.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
});


const year = document.getElementById("year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}