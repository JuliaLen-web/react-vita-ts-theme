import _ from "lodash";
import dayjs from "dayjs";
import { User } from "../types/user";

interface Users {
  name: string;
  gender: string;
  email: string;
}

interface Products {
  name: string;
  category: string;
}

interface Categories {
  name: string;
  slug: string;
}

const imageAssets = import.meta.glob<{
  default: string;
}>("/src/assets/images/fakers/*.{jpg,jpeg,png,svg}", { eager: true });

const fakers = {
  fakeUsers() {
    const users: Array<Omit<Users, "email">> = [
      { name: "Johnny Depp", gender: "male" },
      { name: "Al Pacino", gender: "male" },
      { name: "Robert De Niro", gender: "male" },
      { name: "Kevin Spacey", gender: "male" },
      { name: "Angelina Jolie", gender: "female" },
      { name: "Leonardo DiCaprio", gender: "male" },
      { name: "Tom Cruise", gender: "male" },
      { name: "John Travolta", gender: "male" },
      { name: "Arnold Schwarzenegger", gender: "male" },
      { name: "Sylvester Stallone", gender: "male" },
      { name: "Kate Winslet", gender: "female" },
      { name: "Bruce Willis", gender: "male" },
    ];

    return _.sampleSize(users, 3).map((user) => {
      return {
        name: user.name,
        gender: user.gender,
        email: _.toLower(_.replace(user.name, / /g, "") + "@left4code.com"),
      };
    });
  },
  fakePhotos() {
    const photos = [];
    for (let i = 0; i < 15; i++) {
      photos[photos.length] =
        imageAssets[
          "/src/assets/images/fakers/profile-" + _.random(1, 15) + ".jpg"
        ].default;
    }
    return _.sampleSize(photos, 10);
  },
  fakeImages() {
    const images = [];
    for (let i = 0; i < 15; i++) {
      images[images.length] =
        imageAssets[
          "/src/assets/images/fakers/preview-" + _.random(1, 15) + ".jpg"
        ].default;
    }
    return _.sampleSize(images, 10);
  },
  fakeDates() {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      dates[dates.length] = dayjs
        .unix(_.random(1586584776897, 1672333200000) / 1000)
        .format("DD MMMM YYYY");
    }
    return _.sampleSize(dates, 3);
  },
  fakeTimes() {
    const times = [
      "01:10 PM",
      "05:09 AM",
      "06:05 AM",
      "03:20 PM",
      "04:50 AM",
      "07:00 PM",
    ];
    return _.sampleSize(times, 3);
  },
  fakeFormattedTimes() {
    const times = [
      _.random(10, 60) + " seconds ago",
      _.random(10, 60) + " minutes ago",
      _.random(10, 24) + " hours ago",
      _.random(10, 20) + " days ago",
      _.random(10, 12) + " months ago",
    ];
    return _.sampleSize(times, 3);
  },
  fakeTotals() {
    return _.shuffle([_.random(20, 220), _.random(20, 120), _.random(20, 50)]);
  },
  fakeTrueFalse() {
    return _.sampleSize([false, true, true], 1);
  },
  fakeStocks() {
    return _.shuffle([_.random(50, 220), _.random(50, 120), _.random(50, 50)]);
  },
  fakeProducts() {
    const products = [
      { name: "Dell XPS 13", category: "PC & Laptop" },
      { name: "Apple MacBook Pro 13", category: "PC & Laptop" },
      { name: "Oppo Find X2 Pro", category: "Smartphone & Tablet" },
      { name: "Samsung Galaxy S20 Ultra", category: "Smartphone & Tablet" },
      { name: "Sony Master Series A9G", category: "Electronic" },
      { name: "Samsung Q90 QLED TV", category: "Electronic" },
      { name: "Nike Air Max 270", category: "Sport & Outdoor" },
      { name: "Nike Tanjun", category: "Sport & Outdoor" },
      { name: "Nikon Z6", category: "Photography" },
      { name: "Sony A7 III", category: "Photography" },
    ];
    return _.shuffle(products);
  },
  fakeCategories() {
    const categories = [
      { name: "PC & Laptop" },
      { name: "Smartphone & Tablet" },
      { name: "Electronic" },
      { name: "Home Appliance" },
      { name: "Photography" },
      { name: "Fashion & Make Up" },
      { name: "Kids & Baby" },
      { name: "Hobby" },
      { name: "Sport & Outdoor" },
    ];

    return categories.map((category) => {
      return {
        name: category.name,
        slug: _.replace(
          _.replace(_.toLower(category.name), / /g, "-"),
          "&",
          "and"
        ),
      };
    });
  },
  fakeJobs() {
    const jobs = [
      "Frontend Engineer",
      "Software Engineer",
      "Backend Engineer",
      "DevOps Engineer",
    ];
    return _.shuffle(jobs);
  },
  fakeStatusOrder() {
    const statusOrder = [
      "active",
      "inactive",
      "paid",
      "unpaid",
    ];
    return _.shuffle(statusOrder);
  },
  fakeStatusProduct() {
    const statusProduct = [
      "approved",
      "moderation",
      "rejected",
    ];
    return _.shuffle(statusProduct);
  },
  fakeStock() {
    const statusStock = [
      "In Stock",
      "Out of stock",
    ];
    return _.shuffle(statusStock);
  },
  fakeNotificationCount() {
    return _.random(1, 7);
  },
};

const fakerData: Array<{
  users: Users[];
  photos: string[];
  images: string[];
  dates: string[];
  times: string[];
  formattedTimes: string[];
  totals: number[];
  trueFalse: boolean[];
  stocks: number[];
  products: Products[];
  categories: Categories[];
  jobs: string[];
  statusProduct: string[];
  statusOrder: string[];
  statusStock: string[];
  notificationCount: number;
}> = [];
for (let i = 0; i < 20; i++) {
  fakerData[fakerData.length] = {
    users: fakers.fakeUsers(),
    photos: fakers.fakePhotos(),
    images: fakers.fakeImages(),
    dates: fakers.fakeDates(),
    times: fakers.fakeTimes(),
    formattedTimes: fakers.fakeFormattedTimes(),
    totals: fakers.fakeTotals(),
    trueFalse: fakers.fakeTrueFalse(),
    stocks: fakers.fakeStocks(),
    products: fakers.fakeProducts(),
    categories: fakers.fakeCategories(),
    jobs: fakers.fakeJobs(),
    statusProduct: fakers.fakeStatusProduct(),
    statusOrder: fakers.fakeStatusOrder(),
    statusStock: fakers.fakeStock(),
    notificationCount: fakers.fakeNotificationCount(),
  };
}

export default fakerData;
