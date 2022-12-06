import _ from "lodash";
import dayjs from "dayjs";

interface Users {
  name: string;
  gender: string;
  email: string;
}

interface AuthUser {
  id: number;
  name: string;
  role: string;
}

interface Products {
  name: string;
  category: string;
}

interface Categories {
  name: string;
  tags: string;
  slug: string;
}

interface Files {
  fileName: string;
  type: string;
  size: string;
}

interface Foods {
  name: string;
  image: string;
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
  fakeAuthUser() {
    const authUser: Array<Omit<AuthUser, "email">> = [
      { id: 9, name: "Bruce Willis", role: "seller" },
    ];

    return _.sampleSize(authUser, 3).map((user) => {
      return {
        id: user.id,
        name: user.name,
        role: user.role,
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
      { name: "PC & Laptop", tags: "Apple, Asus, Lenovo, Dell, Acer" },
      {
        name: "Smartphone & Tablet",
        tags: "Samsung, Apple, Huawei, Nokia, Sony",
      },
      { name: "Electronic", tags: "Sony, LG, Toshiba, Hisense, Vizio" },
      {
        name: "Home Appliance",
        tags: "Whirlpool, Amana, LG, Frigidaire, Samsung",
      },
      { name: "Photography", tags: "Canon, Nikon, Sony, Fujifilm, Panasonic" },
      { name: "Fashion & Make Up", tags: "Nike, Adidas, Zara, H&M, Levi’s" },
      {
        name: "Kids & Baby",
        tags: "Mothercare, Gini & Jony, H&M, Babyhug, Liliput",
      },
      { name: "Hobby", tags: "Bandai, Atomik R/C, Atlantis Models, Carisma" },
      {
        name: "Sport & Outdoor",
        tags: "Nike, Adidas, Puma, Rebook, Under Armour",
      },
    ];

    return _.sampleSize(categories, 3).map((category) => {
      return {
        name: category.name,
        tags: category.tags,
        slug: _.replace(
          _.replace(_.toLower(category.name), / /g, "-"),
          "&",
          "and"
        ),
      };
    });
  },
  fakeFiles() {
    const files = [
      { fileName: "Celine Dion - Ashes.mp4", type: "MP4", size: "20 MB" },
      { fileName: "Laravel 7", type: "Empty Folder", size: "120 MB" },
      { fileName: fakers.fakeImages()[0], type: "Image", size: "1.2 MB" },
      { fileName: "Repository", type: "Folder", size: "20 KB" },
      { fileName: "Resources.txt", type: "TXT", size: "2.2 MB" },
      { fileName: "Routes.php", type: "PHP", size: "1 KB" },
      { fileName: "Dota 2", type: "Folder", size: "112 GB" },
      { fileName: "Documentation", type: "Empty Folder", size: "4 MB" },
      { fileName: fakers.fakeImages()[0], type: "Image", size: "1.4 MB" },
      { fileName: fakers.fakeImages()[0], type: "Image", size: "1 MB" },
    ];
    return _.shuffle(files);
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
  fakeFoods() {
    const foods = [
      {
        name: "Vanilla Latte",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-1.jpg"].default,
      },
      {
        name: "Milkshake",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-2.jpg"].default,
      },
      {
        name: "Soft Drink",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-3.jpg"].default,
      },
      {
        name: "Root Beer",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-4.jpg"].default,
      },
      {
        name: "Pocari",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-5.jpg"].default,
      },
      {
        name: "Ultimate Burger",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-6.jpg"].default,
      },
      {
        name: "Hotdog",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-7.jpg"].default,
      },
      {
        name: "Avocado Burger",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-8.jpg"].default,
      },
      {
        name: "Spaghetti Fettucine Aglio with Beef Bacon",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-9.jpg"].default,
      },
      {
        name: "Spaghetti Fettucine Aglio with Smoked Salmon",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-10.jpg"].default,
      },
      {
        name: "Curry Penne and Cheese",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-11.jpg"].default,
      },
      {
        name: "French Fries",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-12.jpg"].default,
      },
      {
        name: "Virginia Cheese Fries",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-13.jpg"].default,
      },
      {
        name: "Virginia Cheese Wedges",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-14.jpg"].default,
      },
      {
        name: "Fried/Grilled Banana",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-15.jpg"].default,
      },
      {
        name: "Crispy Mushroom",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-16.jpg"].default,
      },
      {
        name: "Fried Calamari",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-17.jpg"].default,
      },
      {
        name: "Chicken Wings",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-18.jpg"].default,
      },
      {
        name: "Snack Platter",
        image:
          imageAssets["/src/assets/images/fakers/food-beverage-19.jpg"].default,
      },
    ];
    return _.shuffle(foods);
  },
};

const fakerData: Array<{
  users: Users[];
  authUser: AuthUser[];
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
  files: Files[];
  jobs: string[];
  statusProduct: string[];
  statusOrder: string[];
  statusStock: string[];
  notificationCount: number;
  foods: Foods[];
}> = [];
for (let i = 0; i < 50; i++) {
  fakerData[fakerData.length] = {
    users: fakers.fakeUsers(),
    authUser: fakers.fakeAuthUser(),
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
    files: fakers.fakeFiles(),
    jobs: fakers.fakeJobs(),
    statusProduct: fakers.fakeStatusProduct(),
    statusOrder: fakers.fakeStatusOrder(),
    statusStock: fakers.fakeStock(),
    notificationCount: fakers.fakeNotificationCount(),
    foods: fakers.fakeFoods(),
  };
}

export default fakerData;
