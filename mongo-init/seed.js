db = db.getSiblingDB("website");

db.users.drop();
db.websites.drop();

// User: admin / password123
// Password hashed with bcrypt
db.users.insertOne({
  _id: ObjectId("693ea6a69f9fc34c997e8e4e"),
  role: "admin",
  login: "admin",
  password: "$2a$10$l36oHPw9epRLh5Qo4RWUSOOQfnWgIEE4BKdAzKyh2KAhfukmkXAqO",
  created_at: new Date("0001-01-01T00:00:00.000Z"),
  deleted_at: new Date("0001-01-01T00:00:00.000Z"),
});

db.websites.insertMany([
  {
    _id: ObjectId("6935afa33a89190c80a56d53"),
    name: "Burger House",
    language: "en",
    content: [
      { type: "text", id: "cmsText1", value: "BurgerHouse", path: "", elements: null },
      { type: "image", id: "cmsImage1", value: "images/hero-bg.jpg", path: "", elements: null },
      {
        type: "list", id: "cmsHeaderNav", value: "", path: "li > a",
        elements: [
          { type: "text", id: "", value: "Home", path: "", elements: null },
          { type: "text", id: "", value: "Menu", path: "", elements: null },
          { type: "text", id: "", value: "About", path: "", elements: null },
          { type: "text", id: "", value: "Book table", path: "", elements: null },
          { type: "text", id: "", value: "Terms", path: "li > a", elements: null },
        ],
      },
      {
        type: "list", id: "cmsFoodList", value: "", path: "div > .box > div",
        elements: [
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "images/f2.png", path: "div > img", elements: null },
              { type: "text", id: "", value: "DELICIOUS BURGER", path: "div > h5", elements: null },
              { type: "text", id: "", value: "Burger jest bardzo pyszny", path: "div > p", elements: null },
              { type: "text", id: "", value: "$22", path: "div > h6", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "images/f1.png", path: "div > img", elements: null },
              { type: "text", id: "", value: "DELICIOUS PIZZA", path: "div > h5", elements: null },
              { type: "text", id: "", value: "Pizza jest bardzo pyszna", path: "div > p", elements: null },
              { type: "text", id: "", value: "$32", path: "div > h6", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "div > .box > div",
            elements: [
              { type: "image", id: "", value: "images/f3.png", path: "div > img", elements: null },
              { type: "text", id: "", value: "foo", path: "div > h5", elements: null },
              { type: "text", id: "", value: "bar", path: "div > p", elements: null },
              { type: "text", id: "", value: "$12", path: "div > h6", elements: null },
            ],
          },
        ],
      },
      {
        type: "container", id: "cmsContactDetails", value: "", path: "",
        elements: [
          { type: "text", id: "", value: "Contact Us Bro", path: "h4", elements: null },
          { type: "text", id: "", value: "Location here", path: "div > a > span", elements: null },
          { type: "text", id: "", value: "Call here +01 1234567890", path: "div > a > span", elements: null },
          { type: "text", id: "", value: "email@gmail.com", path: "div > a > span", elements: null },
        ],
      },
      {
        type: "list", id: "cmsDiscountsList", value: "", path: "div > .box",
        elements: [
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "text", id: "", value: "Tasty Thursdays2", path: "div > h5", elements: null },
              { type: "text", id: "", value: "20% Off", path: "div > h6", elements: null },
              { type: "image", id: "", value: "images/o1.jpg", path: "div > img", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "text", id: "", value: "Pizza Days", path: "div > h5", elements: null },
              { type: "text", id: "", value: "15% Off", path: "div > h6", elements: null },
              { type: "image", id: "", value: "images/o2.jpg", path: "div > img", elements: null },
            ],
          },
        ],
      },
      {
        type: "list", id: "cmsCustomerOpinionsList", value: "", path: ".owl-stage > div",
        elements: [
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "text", id: "", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", path: ".detail-box > p", elements: null },
              { type: "text", id: "", value: "Ola Nowak1", path: ".detail-box > h6", elements: null },
              { type: "image", id: "", value: "images/client1.jpg", path: ".img-box > img", elements: null },
              { type: "text", id: "", value: "bar", path: ".detail-box > p:nth-of-type(2)", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "text", id: "", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", path: ".detail-box > p", elements: null },
              { type: "text", id: "", value: "Ola Nowak2", path: ".detail-box > h6", elements: null },
              { type: "image", id: "", value: "images/client2.jpg", path: ".img-box > img", elements: null },
              { type: "text", id: "", value: "foo", path: ".detail-box > p:nth-of-type(2)", elements: null },
            ],
          },
        ],
      },
    ],
    redactors: ["693ea6a69f9fc34c997e8e4e"],
    created_at: new Date("0001-01-01T00:00:00.000Z"),
    updated_at: new Date("2026-01-24T08:31:32.388Z"),
  },
  {
    _id: ObjectId("6935afa33a89190c80a56d33"),
    name: "Website 2",
    language: "en",
    content: [
      { value: "BurgerHousee", elements: null, path: "", id: "cmsText1", type: "text" },
      { value: "images/hero-bg.jpg", elements: null, path: "", id: "cmsImage1", type: "image" },
      {
        value: "", path: "li > a", id: "cmsHeaderNav", type: "list",
        elements: [
          { path: "", value: "Home", type: "text", id: "", elements: null },
          { path: "", value: "Home", type: "text", id: "", elements: null },
          { path: "", value: "Menu", type: "text", id: "", elements: null },
          { path: "", value: "About", type: "text", id: "", elements: null },
          { path: "", value: "Home Book", type: "text", id: "", elements: null },
          { path: "", value: "Added by cms", type: "text", id: "", elements: null },
        ],
      },
      {
        value: "", path: "div > .box > div", id: "cmsFoodList", type: "list",
        elements: [
          {
            path: "", type: "container", value: "", id: "",
            elements: [
              { value: "images/f2.png", elements: null, path: "div > img", type: "image", id: "" },
              { value: "DELICIOUS PIZZA", elements: null, path: "div > h5", type: "text", id: "" },
              { value: "PYSZNY BURGER", elements: null, path: "div > p", type: "text", id: "" },
              { value: "$2202", elements: null, path: "div > h6", type: "text", id: "" },
            ],
          },
        ],
      },
      {
        path: "", type: "container", value: "", id: "cmsContactDetails",
        elements: [
          { elements: null, type: "text", path: "h4", value: "Contact Us Bro", id: "" },
          { elements: null, type: "text", path: "div > a > span", value: "Location here", id: "" },
          { elements: null, type: "text", path: "div > a > span", value: "Call here +01 1234567890", id: "" },
          { elements: null, type: "text", path: "div > a > span", value: "email@gmail.com", id: "" },
        ],
      },
    ],
    redactors: ["otherUser"],
    created_at: new Date("2025-12-07T16:47:31.248Z"),
    updated_at: new Date("2025-12-07T16:47:31.248Z"),
  },
  {
    _id: ObjectId("6935afa33a89190c80a56dd3"),
    name: "Tech Studio",
    language: "pl",
    content: [
      { type: "text", id: "cmsLogo", value: "PLL", path: "", elements: null },
      {
        type: "list", id: "cmsNavList", value: "", path: "a",
        elements: [
          { type: "text", id: "", value: "Home", path: "", elements: null },
          { type: "text", id: "", value: "Services", path: "", elements: null },
          { type: "text", id: "", value: "Projects", path: "", elements: null },
          { type: "text", id: "", value: "About", path: "", elements: null },
          { type: "text", id: "", value: "Contact", path: "", elements: null },
        ],
      },
      { type: "text", id: "cmsHeroTitle", value: "We Build Digital Experiences", path: "", elements: null },
      { type: "text", id: "cmsHeroSubtitle", value: "Transform your ideas into powerful web solutions with our expert development team.", path: "", elements: null },
      { type: "text", id: "cmsHeroButton", value: "Get Started", path: "", elements: null },
      { type: "image", id: "cmsHeroImage", value: "https://placehold.co/500x400", path: "", elements: null },
      { type: "text", id: "cmsServicesTitle", value: "Our Services", path: "", elements: null },
      {
        type: "list", id: "cmsServicesList", value: "", path: ".service-card",
        elements: [
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/60", path: ".service-icon > img", elements: null },
              { type: "text", id: "", value: "Web Development", path: "h3", elements: null },
              { type: "text", id: "", value: "Custom websites built with modern technologies and best practices.", path: "p", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/60", path: ".service-icon > img", elements: null },
              { type: "text", id: "", value: "UI/UX Design", path: "h3", elements: null },
              { type: "text", id: "", value: "Beautiful and intuitive interfaces that users love.", path: "p", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/60", path: ".service-icon > img", elements: null },
              { type: "text", id: "", value: "Mobile Apps", path: "h3", elements: null },
              { type: "text", id: "", value: "Native and cross-platform mobile applications.", path: "p", elements: null },
            ],
          },
        ],
      },
      { type: "text", id: "cmsProjectsTitle", value: "Recent Projects", path: "", elements: null },
      {
        type: "list", id: "cmsProjectsList", value: "", path: ".project-card",
        elements: [
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/400x300", path: "img", elements: null },
              { type: "text", id: "", value: "E-Commerce Platform", path: ".project-info > h3", elements: null },
              { type: "text", id: "", value: "A complete online shopping solution with payment integration.", path: ".project-info > p", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/400x300", path: "img", elements: null },
              { type: "text", id: "", value: "Portfolio Website", path: ".project-info > h3", elements: null },
              { type: "text", id: "", value: "Modern portfolio for a creative agency.", path: ".project-info > p", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/400x300", path: "img", elements: null },
              { type: "text", id: "", value: "Dashboard App", path: ".project-info > h3", elements: null },
              { type: "text", id: "", value: "Analytics dashboard with real-time data visualization.", path: ".project-info > p", elements: null },
            ],
          },
        ],
      },
      {
        type: "container", id: "cmsAboutContainer", value: "", path: "",
        elements: [
          { type: "image", id: "", value: "https://placehold.co/500x400", path: ".about-image > img", elements: null },
          { type: "text", id: "", value: "About Us", path: ".about-content > h2", elements: null },
          { type: "text", id: "", value: "We are a team of passionate developers and designers dedicated to creating exceptional digital experiences. With years of experience in the industry, we help businesses grow through innovative technology solutions.", path: ".about-content > p", elements: null },
        ],
      },
      { type: "text", id: "cmsTeamTitle", value: "Our Team", path: "", elements: null },
      {
        type: "list", id: "cmsTeamList", value: "", path: ".team-member",
        elements: [
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/200x200", path: "img", elements: null },
              { type: "text", id: "", value: "John Smith Jr", path: "h3", elements: null },
              { type: "text", id: "", value: "CEO & Founder", path: "p", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/200x200", path: "img", elements: null },
              { type: "text", id: "", value: "Sarah Johnson", path: "h3", elements: null },
              { type: "text", id: "", value: "Lead Designer", path: "p", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/200x200", path: "img", elements: null },
              { type: "text", id: "", value: "Mike Davis", path: "h3", elements: null },
              { type: "text", id: "", value: "Senior Developer", path: "p", elements: null },
            ],
          },
        ],
      },
      { type: "text", id: "cmsContactTitle", value: "Get In Touch", path: "", elements: null },
      {
        type: "container", id: "cmsContactInfo", value: "", path: "",
        elements: [
          { type: "text", id: "", value: "hello@techstudio.com", path: ".contact-item:nth-child(1) > .contact-value", elements: null },
          { type: "text", id: "", value: "+1 234 567 890", path: ".contact-item:nth-child(2) > .contact-value", elements: null },
          { type: "text", id: "", value: "123 Tech Street, Digital City", path: ".contact-item:nth-child(3) > .contact-value", elements: null },
        ],
      },
      { type: "text", id: "cmsFooterText", value: "2024 TechStudio. All rights reserved.", path: "", elements: null },
    ],
    redactors: ["693ea6a69f9fc34c997e8e4e"],
    created_at: new Date("0001-01-01T00:00:00.000Z"),
    updated_at: new Date("2026-01-24T08:32:59.340Z"),
  },
  {
    _id: ObjectId("696fab5b9416d2cde1c4d2d4"),
    name: "Burger House",
    language: "en",
    content: [
      { type: "text", id: "cmsText1", value: "BurgerHouse", path: "", elements: null },
      { type: "image", id: "cmsImage1", value: "images/hero-bg.jpg", path: "", elements: null },
      {
        type: "list", id: "cmsHeaderNav", value: "", path: "li > a",
        elements: [
          { type: "text", id: "", value: "Home", path: "", elements: null },
          { type: "text", id: "", value: "Menu", path: "", elements: null },
          { type: "text", id: "", value: "About", path: "", elements: null },
          { type: "text", id: "", value: "Book table", path: "", elements: null },
        ],
      },
      {
        type: "list", id: "cmsFoodList", value: "", path: "div > .box > div",
        elements: [
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "images/f2.png", path: "div > img", elements: null },
              { type: "text", id: "", value: "DELICIOUS BURGER", path: "div > h5", elements: null },
              { type: "text", id: "", value: "Burger jest bardzo pyszny", path: "div > p", elements: null },
              { type: "text", id: "", value: "$22", path: "div > h6", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "images/f1.png", path: "div > img", elements: null },
              { type: "text", id: "", value: "DELICIOUS PIZZA", path: "div > h5", elements: null },
              { type: "text", id: "", value: "Pizza jest bardzo pyszna", path: "div > p", elements: null },
              { type: "text", id: "", value: "$32", path: "div > h6", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "div > .box > div",
            elements: [
              { type: "image", id: "", value: "images/f3.png", path: "div > img", elements: null },
              { type: "text", id: "", value: "foo", path: "div > h5", elements: null },
              { type: "text", id: "", value: "bar", path: "div > p", elements: null },
              { type: "text", id: "", value: "$12", path: "div > h6", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "div > .box > div",
            elements: [
              { type: "image", id: "", value: "images/f4.png", path: "div > img", elements: null },
              { type: "text", id: "", value: "Pierogi", path: "div > h5", elements: null },
              { type: "text", id: "", value: "Pyszne Pierogi", path: "div > p", elements: null },
              { type: "text", id: "", value: "$33", path: "div > h6", elements: null },
            ],
          },
        ],
      },
      {
        type: "container", id: "cmsContactDetails", value: "", path: "",
        elements: [
          { type: "text", id: "", value: "Contact Us Bro", path: "h4", elements: null },
          { type: "text", id: "", value: "Location here", path: "div > a > span", elements: null },
          { type: "text", id: "", value: "Call here +01 1234567890", path: "div > a > span", elements: null },
          { type: "text", id: "", value: "email@gmail.com", path: "div > a > span", elements: null },
        ],
      },
      {
        type: "list", id: "cmsDiscountsList", value: "", path: "div > .box",
        elements: [
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "text", id: "", value: "Tasty Thursdays2", path: "div > h5", elements: null },
              { type: "text", id: "", value: "20% Off", path: "div > h6", elements: null },
              { type: "image", id: "", value: "images/o1.jpg", path: "div > img", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "text", id: "", value: "Pizza Days", path: "div > h5", elements: null },
              { type: "text", id: "", value: "15% Off", path: "div > h6", elements: null },
              { type: "image", id: "", value: "images/o2.jpg", path: "div > img", elements: null },
            ],
          },
        ],
      },
      {
        type: "list", id: "cmsCustomerOpinionsList", value: "", path: ".owl-stage > div",
        elements: [
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "text", id: "", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", path: ".detail-box > p", elements: null },
              { type: "text", id: "", value: "Ola Nowak1", path: ".detail-box > h6", elements: null },
              { type: "image", id: "", value: "images/client1.jpg", path: ".img-box > img", elements: null },
              { type: "text", id: "", value: "bar", path: ".detail-box > p:nth-of-type(2)", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "text", id: "", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", path: ".detail-box > p", elements: null },
              { type: "text", id: "", value: "Ola Nowak2", path: ".detail-box > h6", elements: null },
              { type: "image", id: "", value: "images/client2.jpg", path: ".img-box > img", elements: null },
              { type: "text", id: "", value: "foo", path: ".detail-box > p:nth-of-type(2)", elements: null },
            ],
          },
        ],
      },
    ],
    redactors: ["693ea6a69f9fc34c997e8e4e"],
    created_at: new Date("2026-01-20T16:20:43.175Z"),
    updated_at: new Date("2026-01-20T16:20:43.175Z"),
  },
  {
    _id: ObjectId("697483b1f9339a47b95c1659"),
    name: "Tech Studio",
    language: "pl",
    content: [
      { type: "text", id: "cmsLogo", value: "TechStudio33", path: "", elements: null },
      {
        type: "list", id: "cmsNavList", value: "", path: "a",
        elements: [
          { type: "text", id: "", value: "Home", path: "", elements: null },
          { type: "text", id: "", value: "Services", path: "", elements: null },
          { type: "text", id: "", value: "Projects", path: "", elements: null },
          { type: "text", id: "", value: "About", path: "", elements: null },
          { type: "text", id: "", value: "Contact", path: "", elements: null },
        ],
      },
      { type: "text", id: "cmsHeroTitle", value: "We Build Digital Experiences", path: "", elements: null },
      { type: "text", id: "cmsHeroSubtitle", value: "Transform your ideas into powerful web solutions with our expert development team.", path: "", elements: null },
      { type: "text", id: "cmsHeroButton", value: "Get Started", path: "", elements: null },
      { type: "image", id: "cmsHeroImage", value: "https://placehold.co/500x400", path: "", elements: null },
      { type: "text", id: "cmsServicesTitle", value: "Our Services", path: "", elements: null },
      {
        type: "list", id: "cmsServicesList", value: "", path: ".service-card",
        elements: [
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/60", path: ".service-icon > img", elements: null },
              { type: "text", id: "", value: "Web Development", path: "h3", elements: null },
              { type: "text", id: "", value: "Custom websites built with modern technologies and best practices.", path: "p", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/60", path: ".service-icon > img", elements: null },
              { type: "text", id: "", value: "UI/UX Design", path: "h3", elements: null },
              { type: "text", id: "", value: "Beautiful and intuitive interfaces that users love.", path: "p", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/60", path: ".service-icon > img", elements: null },
              { type: "text", id: "", value: "Mobile Apps", path: "h3", elements: null },
              { type: "text", id: "", value: "Native and cross-platform mobile applications.", path: "p", elements: null },
            ],
          },
        ],
      },
      { type: "text", id: "cmsProjectsTitle", value: "Recent Projects", path: "", elements: null },
      {
        type: "list", id: "cmsProjectsList", value: "", path: ".project-card",
        elements: [
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/400x300", path: "img", elements: null },
              { type: "text", id: "", value: "E-Commerce Platform", path: ".project-info > h3", elements: null },
              { type: "text", id: "", value: "A complete online shopping solution with payment integration.", path: ".project-info > p", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/400x300", path: "img", elements: null },
              { type: "text", id: "", value: "Portfolio Website", path: ".project-info > h3", elements: null },
              { type: "text", id: "", value: "Modern portfolio for a creative agency.", path: ".project-info > p", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/400x300", path: "img", elements: null },
              { type: "text", id: "", value: "Dashboard App", path: ".project-info > h3", elements: null },
              { type: "text", id: "", value: "Analytics dashboard with real-time data visualization.", path: ".project-info > p", elements: null },
            ],
          },
        ],
      },
      {
        type: "container", id: "cmsAboutContainer", value: "", path: "",
        elements: [
          { type: "image", id: "", value: "https://placehold.co/500x400", path: ".about-image > img", elements: null },
          { type: "text", id: "", value: "About Us", path: ".about-content > h2", elements: null },
          { type: "text", id: "", value: "We are a team of passionate developers and designers dedicated to creating exceptional digital experiences. With years of experience in the industry, we help businesses grow through innovative technology solutions.", path: ".about-content > p", elements: null },
        ],
      },
      { type: "text", id: "cmsTeamTitle", value: "Our Team", path: "", elements: null },
      {
        type: "list", id: "cmsTeamList", value: "", path: ".team-member",
        elements: [
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/200x200", path: "img", elements: null },
              { type: "text", id: "", value: "John Smith Jr", path: "h3", elements: null },
              { type: "text", id: "", value: "CEO & Founder", path: "p", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/200x200", path: "img", elements: null },
              { type: "text", id: "", value: "Sarah Johnson", path: "h3", elements: null },
              { type: "text", id: "", value: "Lead Designer", path: "p", elements: null },
            ],
          },
          {
            type: "container", id: "", value: "", path: "",
            elements: [
              { type: "image", id: "", value: "https://placehold.co/200x200", path: "img", elements: null },
              { type: "text", id: "", value: "Mike Davis", path: "h3", elements: null },
              { type: "text", id: "", value: "Senior Developer", path: "p", elements: null },
            ],
          },
        ],
      },
      { type: "text", id: "cmsContactTitle", value: "Get In Touch", path: "", elements: null },
      {
        type: "container", id: "cmsContactInfo", value: "", path: "",
        elements: [
          { type: "text", id: "", value: "hello@techstudio.com", path: ".contact-item:nth-child(1) > .contact-value", elements: null },
          { type: "text", id: "", value: "+1 234 567 890", path: ".contact-item:nth-child(2) > .contact-value", elements: null },
          { type: "text", id: "", value: "123 Tech Street, Digital City", path: ".contact-item:nth-child(3) > .contact-value", elements: null },
        ],
      },
      { type: "text", id: "cmsFooterText", value: "2024 TechStudio. All rights reserved.", path: "", elements: null },
    ],
    redactors: ["693ea6a69f9fc34c997e8e4e"],
    created_at: new Date("2026-01-24T08:32:49.743Z"),
    updated_at: new Date("2026-01-24T08:32:49.743Z"),
  },
]);

print("Seed completed: 1 user, " + db.websites.countDocuments({}) + " websites");
